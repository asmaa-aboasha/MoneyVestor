import React, { useState, useEffect } from 'react';
// import Portfolio from '../../components/MarketComponents/Portfolio/Portfolio';
import PortfolioItem from '../../components/MarketComponents/Portfolio/PortfolioItem/PortfolioItem'
import Chart from '../../components/MarketComponents/Chart/Chart';
import BuySell from '../../components/MarketComponents/BuySell/BuySell';
import SearchResult from '../../components/MarketComponents/SearchResult/SearchResult';
import BottomBar from '../../components/MarketComponents/BottomBar/BottomBar'
import API from '../../utils/StockAPI/API';
import { Row, Col} from 'react-materialize';
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

    const getUserData = () => {
        const res = API.getUser()
        setUser({
            name: res.name,
            portfolio: res.portfolio,
            funds: res.funds,
            position: res.position,
            dataDisplay: []
        });
        
    }

    const updateUserData = () => {
        let stocks = [];
        userObj.portfolio.forEach(stock => {
            stocks.push(stock.stockId)
        })
        API.getCurrentValues(stocks)
            .then(res => {
                let portfolio = userObj.portfolio;
                portfolio.forEach((item,i) =>{
                    item.currPrice = res[i].price;
                });

                setUser({
                    name: userObj.name,
                    portfolio: portfolio,
                    funds: userObj.funds,
                    position: userObj.position,
                    dataDisplay: []
                });

            })
    }

    useEffect(() => {
        //this is some rough code here for now
        //eventually, we will need to retreive user data and then update it with the latest prices from API
        getUserData();

        let stocks = [];
        userObj.portfolio.forEach(stock => {
            stocks.push(stock.stockId)
        })
        API.getCurrentValues(stocks)
            .then(res => {
                let portfolio = userObj.portfolio;
                portfolio.forEach((item,i) =>{
                    item.currPrice = res[i].price;
                });

                setUser({
                    name: userObj.name,
                    portfolio: portfolio,
                    funds: userObj.funds,
                    position: userObj.position,
                    dataDisplay: []
                });

            })
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
                        <SearchResult />
                        <BuySell />
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default VirtualMarket;