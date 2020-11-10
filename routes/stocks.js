const router = require("express").Router();
const stockController = require("../controllers/stockController");


router.route("/") //matches '/api/stock'
  //get stock values
  .get(stockController.findOne);

module.exports = router;