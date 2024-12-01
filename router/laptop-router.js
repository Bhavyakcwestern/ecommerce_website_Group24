const express = require("express");
const router = express.Router();

// Import the controller (ensure this file exists and has methods for your routes)
const laptopController = require("../controller/laptop-controller");

// Define the routes and their respective controller methods
router.get("/list-laptops", laptopController.listLaptops);   // Ensure this function exists in the controller
router.get("/search-and-filters", laptopController.searchAndFilters); // Ensure this function exists in the controller
router.post("/add-to-cart", laptopController.addToCart);    // Ensure this function exists in the controller
router.get("/cart-info", laptopController.cartInfo);         // Ensure this function exists in the controller

module.exports = router;

