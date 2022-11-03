const express = require("express");

const productDataRouter = express.Router();
const productData = require("../models/productDataModel");
const product = require("../controllers/productDataController");

productDataRouter.route("/product").post(product.postProductData);
productDataRouter.route("/product").get(product.getProductData);

module.exports = productDataRouter;
