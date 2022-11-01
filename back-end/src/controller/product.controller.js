const productService = require('../services/product.service');

const getAllProducts = async (_req, res) => {
  const allProducts = await productService.getAllProducts();

  return res.status(200).json(allProducts);
};

module.exports = { getAllProducts };
