const models = require('../database/models');

const { Sale, sequelize } = models;

// const create = async (
//   { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status, products },
// ) => {
//   const newSale = await sequelize.transaction(async (transaction) => {
//     const created = await Sale.create(
//      { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status },
//      { transaction },
//     );
    
//     console.log(created.id);
//     return created.id;
//   });

//   return newSale;
// };

module.exports = { };