const models = require('../database/models');
const saleProductsService = require('./saleProducts.service');
const userService = require('./user.service');

const { Sale, sequelize } = models;

const create = async (
  { name, sellerId, totalPrice, deliveryAddress, deliveryNumber, products },
) => {
  const newSale = await sequelize.transaction(async (transaction) => {
    const { id: userId } = await userService.findByName({ name });

    const status = 'Pendente';

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