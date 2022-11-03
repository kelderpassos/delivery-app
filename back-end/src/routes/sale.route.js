const { Router } = require('express');
const rescue = require('express-rescue');
const saleController = require('../controller/sale.controller');

const saleRoute = Router();

saleRoute.post('/sales', rescue((req, res, _next) => 
  saleController.create(req, res)));

saleRoute.get('/seller/orders', rescue((req, res, _next) =>
  saleController.findSalesBySeller(req, res)));

module.exports = saleRoute;