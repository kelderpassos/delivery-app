const saleService = require('../services/sale.service');

const create = async (req, res) => {
  const {
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, products,
  } = req.body;

  const status = 'Pendente';

  const newOrderId = await saleService.create(
    { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status, products },
  );

  return res.status(201).json({ newOrderId });
};

const getById = async (req, res) => {
  const { id  } = req.params;

  const specificSale = await saleService.getById(id);

  return res.status(200).json(specificSale);
}

module.exports = { create, getById };
