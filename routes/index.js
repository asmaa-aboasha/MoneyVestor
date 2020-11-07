const path = require("path");
const router = require("express").Router();
// const apiRoutes = require("./api");
const db = require("../models");


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
router.route("/stocks")
  //get stock values
  .get((req, res, next) => {

  })



// If no API routes are hit, send the React app
router.use((req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

module.exports = router;
