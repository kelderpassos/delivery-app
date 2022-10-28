const express = require('express');
const rescue = require('express-rescue');
const userController = require('../controller/user.controller');

const userRoute = express.Router();

userRoute.get('/login', rescue((req, res, _next) =>
  userController.login(req, res)));

module.exports = userRoute;