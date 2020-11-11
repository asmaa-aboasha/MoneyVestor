import React, { useState, useEffect } from 'react';
// import Portfolio from '../../components/MarketComponents/Portfolio/Portfolio';
import PortfolioItem from '../../components/MarketComponents/Portfolio/PortfolioItem/PortfolioItem'
import Chart from '../../components/MarketComponents/Chart/Chart';
import BottomBar from '../../components/MarketComponents/BottomBar/BottomBar'
import API from '../../utils/StockAPI/API';
import { Row, Col, Button } from 'react-materialize';
import 'materialize-css';
import './virtualmarket.css';

const VirtualMarket = () => {
    const [userObj, setUser] = useState({
        name: '',
        portfolio: [],
        funds: 0,
        position: 0
    })

    useEffect(() => {
        //this is some rough code here for now
        //eventually, we will need to retreive user data and then update it with the latest prices from API
        getUserData();
    }, []);

    const getUserData = () => {
        const res = API.getUser()
        setUser({
            name: res.name,
            portfolio: res.portfolio,
            funds: res.funds,
            position: res.position
        });
    }

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
                        click={()=>populateChart(item.stockId)}
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
    
    let chartData = [];
    const populateChart = (id) => {
        console.log(id); 
        API.getStockData(id,'60')
            .then(res => {
                console.log(res.data);
            })
    }

    return (
        <React.Fragment>
            <Row className='help'>
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
                <Col s={9} className='stats-container'>
                    <Chart />
                    <BottomBar
                        funds={userObj.funds}
                        pos={userObj.position}
                    />
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default VirtualMarket;