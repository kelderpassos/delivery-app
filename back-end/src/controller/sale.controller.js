const saleService = require('../services/sale.service');

const create = async (req, res) => {
  const {
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, products,
  } = req.body;

  const status = 'Pendente';

  const newId = saleService.create(
    { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status, products },
  );

  res.status(201).json({ newOrderId: newId });
};

module.exports = { create };
