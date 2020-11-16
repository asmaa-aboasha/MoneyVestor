const db = require("../server/models")
const axios = require("axios");

// ZUK4OVNSZVCM05PZ --- key 1
// 800OEK7GNJUK8IJL --- key 2

module.exports = {
    getStockInfo: (req, res) => { // get intra-day stock data on one or many stocks
        if (typeof req.query.symbol === 'string') { // find one
            getOne(req, res);
        }
        if (req.query.symbols) { // find many
            getMany(req, res);
        }
    },
    
    getCurrentValues: async (req, res) => { // get current values of user's portfolio objects
        let symbolArray = req.query.symbols//.replace(/\[/g, "").replace(/\]/g, "").replace(/"/g, "").toUpperCase().split(","); // this isn't necessary
        let stocks = await symbolArray.map(async symbol => {
            const request = await axios.get(
                `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=ZUK4OVNSZVCM05PZ`
            );
            const { data } = await request;
            return data;
        })

        Promise.all(stocks)
            .then(values => {
                res.json(values);
            })
            .catch(err => {
                console.log(err);
                res.json({ error: err });
            })
    },

    getSearchEndpoint: (req, res) => { // search for stock symbols matching a user input
        let symbol = req.query.symbol;
        axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${process.env.avKey}`)
            .then(result => {
                res.send(result.data.bestMatches);
            })
            .catch(err => {
                res.json(err);
                console.log(err);
            });
    }
}

const getOne = (req, res) => {
    const symbol = req.query.symbol.toString().toUpperCase();
    let interval = 5;
    if (req.query.interval && (req.query.interval === "1" || req.query.interval === "5" || req.query.interval === "15" || req.query.interval === "30")) {
        interval = parseInt(req.query.interval);
    }
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}min&apikey=${process.env.avKey}`)
        .then(result => {
            res.send(result.data);
        })
        .catch(err => {
            res.json(err);
            console.log(err);
        });
}

// ZUK4OVNSZVCM05PZ --- key 1
// 800OEK7GNJUK8IJL --- key 2

const getMany = async (req, res) => {
    //req.query.symbol is an array of strings
    let symbolArray = req.query.symbols;//.replace(/\[/g, "").replace(/\]/g, "").replace(/"/g, "").split(","); //this isn't necessary
    const symbols = symbolArray.map(symbol => symbol.toString().toUpperCase());
    let interval = 60;
    if (req.query.interval && (req.query.interval === "1" || req.query.interval === "5" || req.query.interval === "15" || req.query.interval === "30")) {
        interval = parseInt(req.query.interval);
    }
    let stocks = await symbols.map(async (symbol,i) => {
        const request = await axios.get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}min&apikey=ZUK4OVNSZVCM05PZ`
        );
        const { data } = await request;
        return data;
    })

    Promise.all(stocks)
        .then(values => {
            res.json(values);
        })
        .catch(err => {
            console.log(err);
            res.json({ error: err });
        })
}