import React, { useState, useEffect } from 'react';
import Portfolio from '../../components/MarketComponents/Portfolio/Portfolio';
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
        })
    }

    return (
        <React.Fragment>
            <Row className='help'>
                <Portfolio portfolio={userObj.portfolio} />
                <Col s={9} className='stats-container'>
                    <Chart/>
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