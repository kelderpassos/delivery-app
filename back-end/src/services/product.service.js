const models = require('../database/models');

const { Product } = models;

const getAllProducts = async () => Product.findAll();

module.exports = { getAllProducts };