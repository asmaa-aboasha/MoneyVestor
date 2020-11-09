import React from 'react';
import { Row, Col, TextInput, Icon } from 'react-materialize';
import './bottombar.css'
import 'materialize-css';

const BottomBar = (props) => {
    return (
        <Col className='bottom-bar valign-wrapper' s={12}>
            <Col l={2} className='left-align'>
                <div>FUNDS: ${props.funds}</div>
            </Col>
            <Col className='center-align'>
                <div>POSITION: {props.pos}/100</div>
            </Col>
            <Col l={3} className='search-bar'>
                <TextInput
                    l={12}
                    icon={<Icon>search</Icon>}
                    id="TextInput-4"
                    label="Search for stocks..."
                />
            </Col>
        </Col>
    )
}

export default BottomBar;