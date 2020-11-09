import React, { useState, useEffect } from 'react';
import Portfolio from '../../components/MarketComponents/Portfolio/Portfolio';
import Chart from '../../components/MarketComponents/Chart/Chart';
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
            <Row>
                <Portfolio portfolio={userObj.portfolio} />
            </Row>



        </React.Fragment>
    )
}

export default VirtualMarket;