const path = require("path");
const router = require("express").Router();
// const apiRoutes = require("./api");
const db = require("../models");

// API Routes
// router.use("/api", apiRoutes);
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
