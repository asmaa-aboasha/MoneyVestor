import axios from "axios";


const API = {
    //setting up dummy API to build virtual market
    getUser: function () {
        const d = new Date("2020-11-08")
        const dummyUser = {
            name: 'Logan Walker',
            portfolio: [
                {
                    stockId: 'IBM',
                    shares: 5,
                    initDate: d,
                    initPrice: 129.40,
                    currPrice: 114.44
                },
                {
                    stockId: 'AAPL',
                    shares: 5,
                    initDate: d,
                    initPrice: 117.40,
                    currPrice: 118.97
                },
                {
                    stockId: 'GOOG',
                    shares: 5,
                    initDate: d,
                    initPrice: 1777.44,
                    currPrice: 1777.44
                },
                {
                    stockId: 'TSLA',
                    shares: 5,
                    initDate: d,
                    initPrice: 400.44,
                    currPrice: 400.44
                }
            ],
            funds: 1000,
            position: 1
        }

        return dummyUser;
    },

    // let portfolioSymbols = ["PG", "MSFT"];
    // console.log(API.getCurrentValues(portfolioSymbols))
    // returns an array of objects of the form 
    // [ {
    //     symbol: "PG", 
    //     price: 144.280
    // } , {
    //     symbol: "MSFT", 
    //     price: 216.5100
    // } ]
    getCurrentValues: async (symbols) => {
        const response = await axios.get("/api/stock/currentValues", { params: { symbols: symbols } });
        let currentValues = [];
        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].hasOwnProperty("Global Quote")) { // response has one of these for each stock, with we haven't exceeded the api limit
                const globalQuote = response.data[i]["Global Quote"];
                currentValues.push({
                    symbol: globalQuote["01. symbol"],
                    price: parseFloat(globalQuote["05. price"])
                })
            }
        }
        
        return currentValues;
    },


    // use like this : console.log(API.searchForStocks("BIG")); - also works on corp names!
    // console.log(API.searchForStocks("microsoft"));
    // returns an array of objects of the form 
    // [  {
    //     symbol: "BIG", 
    //     name: "Big Lots Inc."
    // }, {
    //     symbol: "BIIG", 
    //     name: "Somebody else"
    // }]
    searchForStocks: async (userInput) => {
        const response = await axios.get("/api/stock/search", { params: { symbol: userInput } });
        let searchMatches = [];
        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].hasOwnProperty("1. symbol")) {
                searchMatches.push({
                    symbol: response.data[i]["1. symbol"],
                    name: response.data[i]["2. name"]
                })
            }
        }
        return searchMatches[0];
    },
    getStockData: (symbol, interval) => { //symbol is like "IBM", interval is '1', '5', '15?
        return axios.get("/api/stock", { params: { symbol: symbol, interval: interval } });
    }
};

export default API;