"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sales_products", {
      sale_id: {
        allowNull: false,
        type: Sequelize.STRING,
        onDelete: 'CASCADE'
      },
      product_id: {
        allowNull: false,
        type: Sequelize.STRING,
        onDelete: 'CASCADE'
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sales_products");
  },
};
