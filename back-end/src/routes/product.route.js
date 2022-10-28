const { Router } = require('express');
const rescue = require('express-rescue');
const productController = require('../controller/product.controller');

const productRoute = Router();

productRoute.get('/customer/products', rescue((req, res, next) => 
  productController.getAllProducts(req, res)));

module.exports = productRoute;