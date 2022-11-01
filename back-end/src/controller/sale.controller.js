const saleService = require('../services/sale.service');

const create = async (req, res) => {
  const {
    name, sellerId, totalPrice, deliveryAddress, deliveryNumber, products,
  } = req.body;

  const status = 'Pendente';

  const newOrderId = await saleService.create(
    { name, sellerId, totalPrice, deliveryAddress, deliveryNumber, status, products },
  );

  res.status(201).json({ newOrderId });
};

module.exports = { create };
