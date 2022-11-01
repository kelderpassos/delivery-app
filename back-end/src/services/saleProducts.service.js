const models = require('../database/models');

const { salesProduct } = models;

const bulkCreate = async (products) => {
  const result = await salesProduct.bulkCreate([...products]);
  console.log(result);
};

module.exports = { bulkCreate };
