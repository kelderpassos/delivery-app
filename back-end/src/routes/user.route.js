const express = require('express');
const rescue = require('express-rescue');
const userController = require('../controller/user.controller');

const userRoute = express.Router();

userRoute.get('/login', rescue((req, res, _next) =>
  userController(req, res)));

module.exports = userRoute;