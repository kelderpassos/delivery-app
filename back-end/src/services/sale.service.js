const models = require('../database/models');
const CustomError = require('../helpers/CustomError');
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

const getById = async (id) => {
  const specificSale = await Sale.findByPk(id);

  if (!specificSale) throw new CustomError(404, 'sale not found');

  return specificSale;
}


module.exports = { create, getById };