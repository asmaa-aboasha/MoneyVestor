import React from 'react';
import { Row, Col, Icon } from 'react-materialize';
import styles from './searchresult.module.css';
import 'materialize-css';

const SearchResult = (props) => {
    let rendered;
    if (props.result) {
        let fontColor;
        if(props.change >= 0){
            fontColor = styles.pos
        }
        else{
            fontColor = styles.neg
        }
        console.log(props.name)
        rendered = (
            <Row className={styles.res}>
                <div className={styles.symbol}> {props.symbol} </div>
                <div className={styles.companyName}> {props.name} </div>
                <div className={`${styles.currPrice} ${fontColor}`}> {props.price} </div>
                <div className={`${styles.delta} ${fontColor}`}>{props.change}<span className={styles.pct}>{props.delta}%</span></div>
            </Row>
        )
    }
    else{
        rendered= (
            <Row className={styles.res}>
                <h6>Search for a stock!</h6>
            </Row>
        )
    }
    return (
        <React.Fragment>
            {rendered}
        </React.Fragment>
    )
}

export default SearchResult