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
    //move to create controller after this is working
    db.User.create(req.body)
    .then(dbUser => res.json(dbUser)) //remove this after testing - this could return hashed user password - change to user id
    .catch(err => res.status(422).json(err));
  })

router.route("/api/users/:id")
  //get user info
  .get((req, res, next) => {

  })
  //update user
  .put((req, res, next) => {

  })
  //delete user (?)
  .delete((req, res, next) => {

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
