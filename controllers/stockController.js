const db = require("../server/models")
const axios = require("axios");

module.exports = {
    getStockInfo: (req, res) => {
        if (typeof req.query.symbol === 'string') { // find one
            getOne(req, res);
        }
        if (req.query.symbols) { // find many
            getMany(req, res);
        }
    },
    getCurrentValues: async (req,res) => {
        let symbolArray = req.query.symbols.replace(/\[/g, "").replace(/\]/g, "").replace(/"/g, "").toUpperCase().split(",");
        console.log(symbolArray);
        let stocks = await symbolArray.map(async symbol => {
            const request = await axios.get(
                `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.avKey}`
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
}

const getOne = (req, res) => {
    const symbol = req.query.symbol.toString().toUpperCase();
    let interval = 60;
    if (req.query.interval && (req.query.interval === "1" || req.query.interval === "5" || req.query.interval === "15" || req.query.interval === "30")) {
        interval = parseInt(req.query.interval);
    }
    //add code to check if the local database has recent information
    db.Stock.findOne({ symbol: symbol })
        .then(dbStock => {
            const oldEntryTime = new Date(Date.now() - (30 * 60 * 1000)); // returns ISO date of 30 minutes ago
            if (dbStock.updatedAt >= oldEntryTime) { // if database stock info was updated within the last 30 min
                console.log("sending db info");
                res.json(dbStock.data);
            } else {
                getStockInfo(res, symbol, interval);
            }
        })
        .catch(err => { // if symbol not found in database
            getStockInfo(res, symbol, interval);
        })
}

const getMany = async (req, res) => {
    //req.query.symbol is an array of strings
    let symbolArray = req.query.symbols.replace(/\[/g, "").replace(/\]/g, "").replace(/"/g, "").split(",");
    console.log(symbolArray);
    const symbols = symbolArray.map(symbol => symbol.toString().toUpperCase());
    let interval = 60;
    if (req.query.interval && (req.query.interval === "1" || req.query.interval === "5" || req.query.interval === "15" || req.query.interval === "30")) {
        interval = parseInt(req.query.interval);
    }
    let stocks = await symbols.map(async symbol => {
        const request = await axios.get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}min&apikey=${process.env.avKey}`
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

//helper function
const getStockInfo = (res, symbol, interval) => {
    //if not, make a new request
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}min&outputsize=full&apikey=${process.env.avKey}`)
        .then(result => {
            //store data in database
            res.send(result.data);
            // const returnedSymbol = result.data["Meta Data"]["2. Symbol"];
            // db.Stock.findOneAndUpdate(
            //     { symbol: returnedSymbol }, //filter
            //     {
            //         symbol: returnedSymbol, //update info
            //         data: result.data
            //     },
            //     { upsert: true, new: true, setDefaultsOnInsert: true } // options to create new entry if none found
            // )
            //     .then(result => {
            //         console.log("sending new API info");
            //         res.send(result.data)
            //     }) // send data to client
            //     .catch(err => { // catch any errors that occur
            //         res.json(err);
            //         console.log(err);
            //     })
        })
        .catch(err => {
            res.json(err);
            console.log(err);
        });
}