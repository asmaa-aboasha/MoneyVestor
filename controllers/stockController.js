const db = require("../server/models")
const axios = require("axios");
const Stock = require("../server/models/stock")

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
    },

    getCurrentValues: async (req, res) => { // get current values of user's portfolio objects
        try {
            if(req.query.symbols){
                let rollingIndex = -1;
                const searches = req.query.symbols.map(async (x, i) => { // create array of data to return
                    const dbStock = await db.models.Stock.find({ symbol: x })
                    const oldEntryTime = new Date(Date.now() - (30 * 60 * 1000)); // returns ISO date of 30 minutes ago
                    if (dbStock.length === 0 || (dbStock.hasOwnProperty("updatedAt") && (dbStock.updatedAt >= oldEntryTime))) {
                        rollingIndex++;
                        return searchStockDelay(x, rollingIndex);
                    }
                    return dbStock[0].data;
                })
                const results = await Promise.all(searches);
                return res.send(results);
            } else {
                return [];
            }
            
        } catch (e) {
            console.error(e); // log internal error
            return next(new Error('Internal Server Error')); // return public error to client
        }
    }
}




function searchStockDelay(symbol, index) {
    return new Promise((resolve, reject) => {
        // use async / await here too :)
        setTimeout(async () => {
            try {
                const result = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=ZUK4OVNSZVCM05PZ`);
                await db.models.Stock.findOneAndUpdate({ symbol: symbol }, { data: result.data }, { upsert: true });
                resolve(result.data);
            } catch (e) {
                return reject(e);
            }
        }, (12100 * index));
    })
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
    let stocks = await symbols.map(async (symbol) => {
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