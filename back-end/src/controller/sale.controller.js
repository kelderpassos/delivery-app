const saleService = require('../services/sale.service');
const jwt = require('../auth/JWT');

const create = async (req, res) => {
  const {
    name, sellerId, totalPrice, deliveryAddress, deliveryNumber, products,
  } = req.body;

  const token = req.headers.authorization;

  jwt.validate(token);

  const newOrderId = await saleService.create(
    { name, sellerId, totalPrice, deliveryAddress, deliveryNumber, products },
  );

  return res.status(201).json({ newOrderId });
};

const getSalesBySeller = async (req, res) => {
  const token = req.headers.authorization;
  const { id } = jwt.validate(token);

  const sales = await saleService.getSalesBySeller(id);

  res.status(200).json(sales);
};

const getByConsumer = async (req, res) => {
  const { id } = req.query;
  const result = await saleService.getByConsumer(id);

  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const specificSale = await saleService.getById(id);

  return res.status(200).json(specificSale);
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await saleService.updateStatus({ id, status });

  res.status(202).json({ status });
};

module.exports = { create, getById, getByConsumer, getSalesBySeller, updateStatus };
