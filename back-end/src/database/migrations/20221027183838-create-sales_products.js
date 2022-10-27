"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("c", {
      sale_id: {
        allowNull: false,
        type: Sequelize.VARCHAR,
        references: { model: "sales", key: "id" },
        onDelete: 'CASCADE'
      },
      product_id: {
        allowNull: false,
        type: Sequelize.VARCHAR,
        references: { model: "products", key: "id" },
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
