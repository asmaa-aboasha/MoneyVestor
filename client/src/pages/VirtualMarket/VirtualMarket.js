import React, { useState, useEffect } from 'react';
// import Portfolio from '../../components/MarketComponents/Portfolio/Portfolio';
import PortfolioItem from '../../components/MarketComponents/Portfolio/PortfolioItem/PortfolioItem'
import Chart from '../../components/MarketComponents/Chart/Chart';
import BuySell from '../../components/MarketComponents/BuySell/BuySell';
import SearchResult from '../../components/MarketComponents/SearchResult/SearchResult';
import BottomBar from '../../components/MarketComponents/BottomBar/BottomBar'
import API from '../../utils/StockAPI/API';
import { Row, Col } from 'react-materialize';
import 'materialize-css';
import './virtualmarket.css';
// import { set } from 'mongoose';

const VirtualMarket = () => {
    const [userObj, setUser] = useState({
        name: '',
        portfolio: [],
        funds: 0,
        position: 0,
        dataDisplay: []
    });

    const [searchObj, setSearch] = useState({
        res: null,
        q: ''
    })

    const [transaction, setTransaction] = useState({
        symbol: null,
        side: null,
        shares: 0,
        sharePrice: 0,
        maxShares: 0,
        _alert: false
    })

    const getUserData = () => {
        const user = API.getUser()
        setUser({
            name: user.name,
            portfolio: user.portfolio,
            funds: user.funds,
            position: user.position,
            dataDisplay: []
        });

        let stocks = [];
        user.portfolio.forEach(stock => {
            stocks.push(stock.stockId)
        })
        let portfolio = user.portfolio
        API.getCurrentValues(stocks)
            .then(res => {
                if (res.length === stocks.length) {
                    portfolio.forEach((item, i) => {
                        item.currPrice = res[i].price;
                    });

                    setUser({
                        name: user.name,
                        portfolio: portfolio,
                        funds: user.funds,
                        position: user.position,
                        dataDisplay: []
                    });
                }
            })
    }

    useEffect(() => {
        getUserData();
    }, []);

    //loading user info and rendering portfolio


    let portfolio;
    if (userObj.portfolio.length) {
        portfolio = (
            userObj.portfolio.map(item => {
                return (
                    <PortfolioItem
                        key={item.stockId}
                        stockId={item.stockId}
                        cPrice={item.currPrice}
                        iPrice={item.initPrice}
                        click={() => populateChart(item.stockId)}
                    />
                )
            })
        )
    }
    else {
        portfolio = (
            <div>Buy some stocks to get started!</div>
        )
    }


    // loading stock data and rendering chart
    let chart;
    let chartData = []
    const populateChart = (id) => {
        setUser({
            name: userObj.name,
            portfolio: userObj.portfolio,
            funds: userObj.funds,
            position: userObj.position,
            dataDisplay: []
        })
        API.getStockData(id)
            .then(res => {
                formatData(res.data);
            })
    }

    const formatData = (raw) => {
        chartData = [];
        let id = raw["Meta Data"]["2. Symbol"];
        let rawData = raw["Time Series (5min)"];


        let data = Object.keys(rawData).map(key => {
            let dateTime = key.split(" ");
            let x = dateTime[1];
            let y = rawData[key]["4. close"];
            return (
                {
                    "x": x,
                    "y": y
                }
            )
        })

        data.reverse();

        let mid = Math.ceil(data.length / 2)
        let obj = {
            left: data.slice(0, mid),
            right: data.slice(mid)
        };

        let formattedData = {
            "id": id,
            "color": "#000000",
            "data": obj.right
        };

        chartData.push(formattedData)
        setUser({
            name: userObj.name,
            portfolio: userObj.portfolio,
            funds: userObj.funds,
            position: userObj.position,
            dataDisplay: chartData
        })
    }

    if (userObj.dataDisplay.length) {
        chart = (
            <Chart axis={userObj.xaxis} data={userObj.dataDisplay} />
        )
    }
    else {
        chart = 'Click on a stock to view price chart';
    }


    //loading search results and rendering info
    const handleSearch = (event) => {
        setSearch({
            res: searchObj.res,
            q: event.target.value
        })
    }

    const handleSubmit = () => {
        setSearch({
            res: null,
            q: searchObj.q
        })
        API.searchForStocks(searchObj.q.trim())
            .then(response => {

                let searchRes = {
                    symbol: response.symbol,
                    name: response.name
                }
                setSearch({
                    res: searchRes,
                    q: searchObj.q
                })
                displaySearch(searchRes)
            })
    }

    const displaySearch = (res) => {

        const stockName = res.name;
        if (res) {
            API.getCurrentValues([res.symbol])
                .then(response => {

                    let searchRes = {
                        symbol: response[0].symbol,
                        name: stockName,
                        price: response[0].price,
                        change: response[0].change,
                        delta: response[0].delta
                    };

                    setSearch({
                        res: searchRes,
                        q: searchObj.q,
                        searched: true
                    })

                    setTransaction({
                        symbol: response[0].symbol,
                        side: null,
                        shares: 0,
                        sharePrice: response[0].price,
                        maxShares: 0,
                        _alert: false
                    })
                    console.log(transaction)

                })
            populateChart(res.symbol)
        }
        else {
            setSearch({
                res: searchObj.res,
                q: searchObj.q,
                searched: false
            })
        }
    }

    let searchResult;
    if (searchObj.searched) {
        searchResult = (
            <SearchResult
                symbol={searchObj.res.symbol}
                name={searchObj.res.name}
                price={searchObj.res.price}
                change={searchObj.res.change}
                delta={searchObj.res.delta}
                result={true} />
        )
    }
    else {
        searchResult = (
            <SearchResult
                result={false} />
        )
    }

    // functions for handling the buy/sell feature
    const setSide = (e) => {
        let side = e.target.childNodes['0'].data;
        let maxShares;
        let alert = false;
        if (side === 'BUY') {
            maxShares = Math.floor(userObj.funds / transaction.sharePrice);
        }
        else if (side === 'SELL') {
            let stocks = userObj.portfolio.map(item => {
                return item.stockId;
            })

            if (stocks.includes(transaction.symbol)) {
                let i = stocks.indexOf(transaction.symbol);
                maxShares = userObj.portfolio[i].shares;
            }
            else {
                maxShares = 0;
                alert = true;
            }
        }
        setTransaction({
            symbol: transaction.symbol,
            side: side,
            shares: transaction.shares,
            sharePrice: transaction.sharePrice,
            maxShares: maxShares,
            _alert: alert
        })
        console.log(transaction)
    }

    const saveTransactionAmount = (e) => {
        setTransaction({
            symbol: transaction.symbol,
            side: transaction.side,
            shares: e.target.value,
            sharePrice: transaction.sharePrice,
            maxShares: transaction.maxShares,
            _alert: transaction._alert
        })
    }

    const handleTransaction = (e) => {
        e.preventDefault()
        if (transaction.side) {
            console.log(`${transaction.side} ${transaction.shares} ${transaction.symbol}`);
            let transactionAmount;
            if (transaction.side === 'BUY') {
                transactionAmount = (transaction.shares * transaction.sharePrice);
                let newFunds = userObj.funds - transactionAmount;
                let stocks = userObj.portfolio.map(item => {
                    return item.stockId;
                })
                if (stocks.includes(transaction.symbol)) {
                    let i = stocks.indexOf(transaction.symbol);
                    let newShares = parseInt(userObj.portfolio[i].shares) + parseInt(transaction.shares);
                    let portfolio = userObj.portfolio;
                    portfolio[i].shares = newShares
                    setUser({
                        name: userObj.name,
                        portfolio: portfolio,
                        funds: newFunds,
                        position: userObj.position,
                        dataDisplay: userObj.dataDisplay
                    })
                }
                else {
                    let portfolio = userObj.portfolio;
                    let newStock = {
                        stockId: transaction.symbol,
                        shares: transaction.shares,
                        initDate: new Date(),
                        initPrice: transaction.sharePrice,
                        currPrice: transaction.sharePrice
                    }
                    portfolio.push(newStock);
                    setUser({
                        name: userObj.name,
                        portfolio: portfolio,
                        funds: newFunds,
                        position: userObj.position,
                        dataDisplay: userObj.dataDisplay
                    })
                }
            }
            else if (transaction.side === 'SELL') {

            }
        }
        else {
            console.log('indicate buy or sell!')
        }
    }
    return (
        <React.Fragment>
            <Row>
                <Col s={3} className='portfolio'>
                    <div className='portfolio-head'>
                        <h5 className='center-align'>My Portfolio</h5>
                    </div>
                    <div className='portfolio-label'>
                        <Col className='left-align' s={6}>
                            <p>Name</p>
                        </Col>
                        <Col className='right-align' s={6}>
                            <p>Price/Change</p>
                        </Col>
                    </div>
                    {portfolio}
                </Col>
                <Col s={6} className='stats-container'>
                    {chart}
                    <BottomBar
                        funds={userObj.funds}
                        pos={userObj.position}
                        change={(e) => handleSearch(e)}
                        click={() => handleSubmit()}
                    />
                </Col>
                <Col s={3}>
                    <div className='info'>
                        {searchResult}
                        <BuySell
                            alert={transaction._alert}
                            side={transaction.side}
                            setSide={(e) => setSide(e)}
                            maxShares={transaction.maxShares}
                            change={(e) => saveTransactionAmount(e)}
                            submit={(e) => handleTransaction(e)} />
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default VirtualMarket;