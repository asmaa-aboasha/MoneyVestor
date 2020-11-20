import React from 'react';
import { Button, Col, TextInput, Icon } from 'react-materialize';
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
            <Col l={4} className='search-bar'>
                <TextInput
                    l={12}
                    icon={<Icon>search</Icon>}
                    id="stock-search"
                    label="Search for stocks..."
                    onChange={props.change}
                    value={props.value}
                />


            </Col>
            <Col className='search-btn'>
                <Button 
                    onClick={props.click}
                    small>
                    <Icon center>send</Icon>
                </Button>
            </Col>
        </Col>
    )
}

export default BottomBar;