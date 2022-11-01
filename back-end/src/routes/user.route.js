const express = require('express');
const rescue = require('express-rescue');
const userController = require('../controller/user.controller');

const userRoute = express.Router();

userRoute.post('/login', rescue((req, res, _next) =>
  userController.login(req, res)));

userRoute.post('/register', rescue((req, res, _next) =>
  userController.customerRegister(req, res)));

userRoute.get('/sellers', rescue((req, res, _next) => 
  userController.findSellersNames(req, res)));

module.exports = userRoute;