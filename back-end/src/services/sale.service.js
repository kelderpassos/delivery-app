const models = require('../database/models');
const saleProductsService = require('./saleProducts.service');

const { Sale, sequelize } = models;

const create = async (
  { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status, products },
) => {
  const newSale = await sequelize.transaction(async (transaction) => {
    const created = await Sale.create(
     { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status },
     { transaction },
    );

    const { id } = created;
    const saleProducts = products.map((product) => ({ ...product, saleId: id }));
    
    await saleProductsService.bulkCreate(saleProducts);
    
    return id;
  });

  return newSale;
};

module.exports = { create };