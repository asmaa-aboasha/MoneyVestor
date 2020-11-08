import React from 'react';
import API from '../../utils/StockAPI/API';
import { Button } from 'react-materialize';
import 'materialize-css';

const VirtualMarket = () => {
    const testEndpoint = () => {
        API.getStocks().then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }
    return (
        <div>
            <Button
                onClick={() => testEndpoint()}>
                    Test
            </Button>
        </div>
    )
}

export default VirtualMarket;