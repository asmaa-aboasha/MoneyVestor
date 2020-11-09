import React from 'react';
import 'materialize-css';
import { Row, Col, Button } from 'react-materialize';


const PortfolioItem = (props) => {
    return (
        <Row className='portfolio-item'>
            <Col s={12} className='ticker'>
                <h6>{ props.stockId}</h6>
            </Col>
        </Row>
    )
}

export default PortfolioItem;