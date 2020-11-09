const path = require("path");
const router = require("express").Router();
// const apiRoutes = require("./api");
const db = require("../models");
const axios = require("axios");


//API routes
router.route("/api/users")
  //create user
  .post((req, res, next) => {
    db.User.create(req.body)
      .then(dbUser => {
        //delete dbUser.login  //do not send back the user's password
        res.json(dbUser)
      })
      .catch(err => res.status(422).json(err));
  })

router.route("/api/users/:id")
  //get user info by id
  .get((req, res, next) => {//add authentication here! or around here somewhere
    db.User.findById(req.params.id)
      .then(dbUser => {
        //delete dbUser.login  //do not send back the user's password
        res.json(dbUser)
      })
      .catch(err => res.status(422).json(err));
  })
  //update user
  //req.body should look like
  //   {
  //     "name": "New User",
  //     "portfolio": [{
  //       stockId: "AAPL",
  //       shares: 1,
  //       initDate: 1604777640851, // this is the raw output of Date.now(), feel free to implement this differently
  //       initPrice: 100, // dollars
  //       currPrice: 101 // dollars
  //     }],
  //     "funds": 7500,
  //     "position": 10 
  // }
  .put((req, res, next) => {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbUser => {
        //delete dbUser.login  //do not send back the user's password
        res.json(dbUser)
      })
      .catch(err => res.status(404).json(err));
  })
  //delete user
  .delete((req, res, next) => {
    db.User.findByIdAndDelete({ _id: req.params.id })
      .then(dbUser => res.json(dbUser))

  })

router.route("/api/leaderboard")
  //get leader board
  .get((req, res, next) => {

  })

// stock api routes
//get single stock values (5 min intervals for a day)
router.route("/stock")
  //get stock values
  .get((req, res, next) => {
    const symbol = req.body.symbol.toString().toUpperCase();
    let interval = 60;
    if (req.body.interval && (req.body.interval === "1" || req.body.interval === "5" || req.body.interval === "15" || req.body.interval === "30")) {
      interval = parseInt(req.body.interval); // replace this with more robust code limited to 1min, 5min, 15min, 30min, and 60min options
    }

    //add code to check if the local database has recent information
db.Stock.findOne({symbol: symbol})
.then(dbStock => {
  //figure out how to compare these two
  console.log(dbStock.updatedAt)
  console.log(Date.now())
})
    //if not, make a new request

    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}min&outputsize=full&apikey=FGZLKPQ4EWD0K8DO`)
      .then(result => {
        //store data in database
        const returnedSymbol = result.data["Meta Data"]["2. Symbol"];
        db.Stock.findOneAndUpdate(
          { symbol: returnedSymbol }, //filter
          {
            symbol: returnedSymbol, //update info
            data: result.data
          }, 
          {upsert: true, new: true, setDefaultsOnInsert: true} // options to create new entry if none found
          )
          .then(result => {
            res.send(result.data)
          }) // send data to client
          .catch(err => { // catch any errors that occur
            res.json(err);
            console.log(err);
          })
      })
      .catch(err => {
        res.json(err);
        console.log(err);
      });
  })


// If no API routes are hit, send the React app
router.use((req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

module.exports = router;
