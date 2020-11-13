const router = require("express").Router();
const stockController = require("../controllers/stockController");


router.route("/") //matches '/api/stock'
  //get graphable stock values
  .get(stockController.getStockInfo);

router.route("/currentValues")
  //get current stock values
  .get(stockController.getCurrentValues);

router.route("/search")
  //get stock symbols matching user input
  .get(stockController.getSearchEndpoint);

module.exports = router;