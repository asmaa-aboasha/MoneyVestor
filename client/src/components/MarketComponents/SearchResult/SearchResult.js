import React from 'react';
import { Row, Col, Icon } from 'react-materialize';
import styles from './searchresult.module.css';
import 'materialize-css';

const SearchResult = (props) => {
    return(
        <React.Fragment>
            <Row className={styles.res}>
                <div className={styles.symbol}>AAPL <span className={styles.mrkt}>NASDAQ</span></div>
                <div className={styles.companyName}>Apple</div>
                <div className={styles.currPrice}>118.97</div>
                <div className={styles.delta}>+1.57 <span>+1.34%</span></div>
            </Row>
        </React.Fragment>
    )
}

export default SearchResult