const express = require('express');
const userRoute = require('../routes/user.route');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(userRoute);

module.exports = app;
