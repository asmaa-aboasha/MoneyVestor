import React from 'react';
import 'materialize-css';
import { Row, Col, Button } from 'react-materialize';
import styles from './portfolioitem.module.css';

const PortfolioItem = (props) => {
    let fontColor;
    let dollarDiff = Math.round(100*(props.cPrice - props.iPrice))/100;
    let perDiff = Math.round(100*((dollarDiff / props.iPrice) * 100))/100;

    if (props.cPrice >= props.iPrice) {
        fontColor = styles.green;
    }
    else {
        fontColor = styles.red;
    }
    return (
        <Row 
            className='portfolio-item hoverable'
            onClick={props.click}>
            <Col s={6} m={8} className='ticker'>
                <h6>{props.stockId}</h6>
            </Col>
            <Col className='price'>
                <p className={fontColor}>{props.cPrice}</p>
            </Col>
            <Col className='price-change'>
                <div className={fontColor}>{dollarDiff}</div>
                <div className={fontColor}>{ perDiff }%</div>
            </Col>
        </Row>
    )
}

export default PortfolioItem;