const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    //id provided by MongoDB
    symbol: {type: String, required: true},
    name: {type: String},
    data: {} // raw data returned by alphavantage API
}, {timestamps: true});

//const Stock = mongoose.model("Stock", stockSchema);

//module.exports = Stock;
module.exports = StockSchema;