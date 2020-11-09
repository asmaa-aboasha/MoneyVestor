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
                        stockId={item.stockId}/>
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
        <Col s={3} className={styles.portfolio}>
            {portfolio}
        </Col>
    )
}

export default Portfolio;