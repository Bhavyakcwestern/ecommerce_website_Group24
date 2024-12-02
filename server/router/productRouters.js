const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/middleware");

const productController = require("../controllers/user/productsController");

router.get("/", middleware.jwtValidator, middleware.checkIfUser, productController.listProducts);

module.exports = router;

