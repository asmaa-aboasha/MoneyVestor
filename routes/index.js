const path = require("path");
const router = require("express").Router();
// const apiRoutes = require("./api");
const stockRoutes = require("./stocks");
const db = require("../server/models");

//API routes
router.route("/api/users")
  //create user
  .post((req, res, next) => {
    db.User.create(req.body.data)
      .then(dbUser => {
        //delete dbUser.login  //do not send back the user's password
        res.json(dbUser)
      })
      .catch(err => {
        console.log(err);
        res.status(422).json(err)});
  })

router.route("/api/users")
  //get user info by id
  .get((req, res, next) => {//add authentication here! or around here somewhere
    if(req.query.id){
    db.User.findById(req.query.id)
      .then(dbUser => {
        res.json(dbUser)
      })
      .catch(err => res.status(404).json(err));
    } else {
      if(req.query.name){
        db.User.findOne({name: req.query.name})
        .then(dbUser => {
          res.json(dbUser);
        })
        .catch(err => res.status(404).json(err));
      }
      else {
        res.status(422).send("Please GET either an id or a name");
      }
    }
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
    db.User.findOneAndUpdate({ _id: req.body.params.id }, req.body.data)
      .then(dbUser => {
        //delete dbUser.login  //do not send back the user's password
        res.json(dbUser)
      })
      .catch(err => {
        console.log(err);
        res.status(404).json(err)});
  })
  //delete user
  .delete((req, res, next) => {
    db.User.findByIdAndDelete({ _id: req.query.id })
      .then(dbUser => res.json(dbUser))

  })

router.route("/api/leaderboard")
  //get leader board
  .get((req, res, next) => {

  })

// stock api routes
router.use("/api/stock", stockRoutes);
//get single stock values (5 min intervals for a day)


// If no API routes are hit, send the React app
router.use((req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

module.exports = router;
