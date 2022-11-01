const models = require('../database/models');

const { salesProduct } = models;

const bulkCreate = async (products) => {
  const result = await salesProduct.bulkCreate([...products]);
  return result;
};

module.exports = { bulkCreate };
