import React from 'react';
import PortfolioItem from './PortfolioItem/PortfolioItem';
import 'materialize-css';
import { Row, Col, Button } from 'react-materialize';
import styles from './portfolio.module.css';

const Portfolio = (props) =>{
    let portfolio;
    if(props.portfolio.length){
        portfolio = (
            props.portfolio.map( item => {
                return(
                    <PortfolioItem
                        key={item.stockId}
                        stockId={item.stockId}
                        cPrice={item.currPrice}
                        iPrice = {item.initPrice}
                        />
                )
            })
        )
    }
    else{
        portfolio = (
            <div>Buy some stocks to get started!</div>
        )
    }
    return(
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
            <div className='portfolio-body'>{portfolio}</div>
            
        </Col>
    )
}

export default Portfolio;