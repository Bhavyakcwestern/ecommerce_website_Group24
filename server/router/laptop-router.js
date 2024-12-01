const express = require("express");
const router = express.Router();
const laptopController = require("../controller/laptop-controller");

// Route to fetch all laptops
router.route("/list-laptops").get(laptopController.listLaptops);

// Route to search and filter laptops
router.route("/search-and-filters").get(laptopController.searchAndFilterLaptops);

// Route to get cart info (as an example, assuming userId is passed)
router.route("/cart-info").get(laptopController.cartInfo);

// Route to add laptops to the user's cart
router.route("/add-to-cart").post(laptopController.addToCart);

module.exports = router;
