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
                }
            ],
            funds: 1000,
            position: 1
        }

        return dummyUser;
    },

    //some testing scripts
    // API.createUser("John Edwards", 10000);
    // API.getUserById("5fa9f9a9f368650950b68be8").then(result => console.log(result.data));
    // API.getUserByName("John Edwards").then(({ data }) => {
    //   const portfolioAdd = {stockId: "AAPL", shares: 1, initDate: new Date(Date.now()), initPrice: 100, currPrice: 101}
    //   const newFunds = 7500;
    //   API.updateUser(data, portfolioAdd, newFunds)
    //   .then(res => console.log(res));
    // });
    //   API.getUserByName("Dummy User").then(({ data }) => {
    //   if(data !== null){
    //     API.deleteUser(data._id);
    //   }
    // });
    // API.getStockData("MSFT", 60).then(res => console.log(res));
    getUserById: (id) => {
        return axios.get("/api/users", { params: { id: id } });
    },
    getUserByName: (name) => {
        return axios.get("/api/users", { params: { name: name } });
    },
    createUser: (name, funds) => {
        return axios.post("/api/users", { data: { name: name, funds: funds } });
    },
    updateUser: (userObj, portfolioAdd, funds) => { // userObj is results.data from getUserById
        return axios.put("/api/users", {
            params: { id: userObj._id },
            data: { name: userObj.name, portfolio: [...userObj.portfolio, portfolioAdd], funds: funds }
        })
    },
    deleteUser: (id) => {
        return axios.delete("/api/users", { params: { id: id } });
    },
    getStockData: (symbol, interval) => { //symbol is like "IBM", interval is '1', '5', '15', '30', or '60' for those number of minutes
        return axios.get("/api/stock", { params: { symbol: symbol, interval: interval } });
    }
};

export default API;