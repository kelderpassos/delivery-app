const express = require('express');
const userRoute = require('../routes/user.route');
const errorMiddleware = require('../middlewares/error');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(userRoute);

app.use(errorMiddleware);

module.exports = app;
