const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    //id provided by MongoDB
    name: {type: String, required: true},
    //login: {}, // double check the passport project to figure out what goes here
    portfolio: [{
        stockId: {type: String, trim: true}, //maybe add 'uppercase: true
        shares: {type: Number, min: 0},
        initDate: {type: Date, default: Date.now}, //min: Date.now, this may not work correctly for updates
        initPrice: {type: Number, min: 0}, //price at investment
        currPrice: {type: Number, min: 0} //price at most recent update
    }],
    funds: {type: Number, required: true}, //default: 10000
    position: {type: Number} //leaderboard position
});

const User = mongoose.model("User", userSchema);

module.exports = User;