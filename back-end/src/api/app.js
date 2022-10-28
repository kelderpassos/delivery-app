const express = require('express');
const cors = require('cors');
const userRoute = require('../routes/user.route');
const errorMiddleware = require('../middlewares/error');

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoute);

app.use(errorMiddleware);

module.exports = app;
