const { Sale, User, Product, salesProduct, sequelize } = require('../database/models');
const CustomError = require('../helpers/CustomError');
const saleProductsService = require('./saleProducts.service');
const userService = require('./user.service');

const create = async ({
  name, sellerId, totalPrice, deliveryAddress, deliveryNumber, products,
}) => {
  const newSale = await sequelize.transaction(async (transaction) => {
    const { id: userId } = await userService.findByName({ name });

    const status = 'Pendente';

    const created = await Sale.create(
      { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status },
      { transaction },
    );

    const { id } = created;
    const saleProducts = products.map((product) => ({
      ...product,
      saleId: id,
    }));

    await saleProductsService.bulkCreate(saleProducts);

    return id;
  });

  return newSale;
};

const getSalesBySeller = async (sellerId) => {
  const sales = Sale.findAll({ where: { sellerId } });
  return sales;
};

const getByConsumer = async (userId) => {
  const sales = await Sale.findAll({ where: { userId } });
  return sales;
};

const getById = async (id) => {
  const specificSale = await Sale.findByPk(id, {
    include: [
      { model: User, as: 'seller' },
      { model: User, as: 'users' },
      { model: Product,
        as: 'products',
        through: { attributes: [] },
        include: [
          { model: salesProduct, as: 'saleProducts' },
        ],
      },
    ],
  });

  if (!specificSale) throw new CustomError(404, 'sale not found');

  return specificSale;
};

const updateStatus = async ({ id, status }) => {
  const updated = await Sale.update(
    { status },
    { where: { id } },
  );

  return updated;
};

module.exports = { create, getById, getByConsumer, getSalesBySeller, updateStatus };
