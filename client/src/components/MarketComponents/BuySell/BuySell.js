import React from 'react';
import { Row, Col, Icon, Button } from 'react-materialize';
import styles from './buysell.module.css'
import 'materialize-css';

const BuySell = (props) => {
    let buyBtnStyle = styles.buyBtn;
    let sellBtnStyle = styles.sellBtn;
    if (props.side) {
        if (props.side === 'BUY') {
            buyBtnStyle = styles.buySide
        }
        else if (props.side === 'SELL') {
            sellBtnStyle = styles.sellSide;
        }
    }

    let alert;
    if(props.alert){
        alert=(
            <div className={styles.alertMsg}>You don't own any shares!</div>
        )
    }
    return (
        <React.Fragment>
            <Row>
                <div className={styles.buttons}>
                    <div className={styles.buyOrSell}>Side:</div>
                    <Col s={6}>
                        <div className={`${buyBtnStyle} hoverable`}
                            onClick={props.setSide} >
                            BUY
                        </div>
                    </Col>
                    <Col s={6}>
                        <div className={`${sellBtnStyle} right-align hoverable`}
                            onClick={props.setSide}>
                            SELL
                        </div>
                    </Col>
                    <Col s={12}>
                        <form onSubmit={props.submit} >
                            <label>
                                Shares:
                                <input min={0} max={props.maxShares} onChange={props.change} type="number" value={props.value} />
                            </label>
                            <label>
                                Max Shares: {props.maxShares}
                            </label>
                            <Button
                                className='right'
                                small
                                node="button"
                                type="submit"
                                waves="light"
                            >
                                <Icon center>
                                    send
                                </Icon>
                            </Button>
                        </form>
                        {alert}
                    </Col>
                </div>

            </Row>
        </React.Fragment>
    )
}

export default BuySell