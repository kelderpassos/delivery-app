"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sales", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.VARCHAR,
        references: { model: "users", key: "id" },
        onDelete: 'CASCADE'
      },
      seller_id: {
        allowNull: false,
        type: Sequelize.VARCHAR,
        unique: true,
        references: { model: "users", key: "id" },
        onDelete: 'CASCADE'
      },
      total_price: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      delivery_address: {
        allowNull: false,
        type: Sequelize.VARCHAR,
      },
      delivery_number: {
        allowNull: false,
        type: Sequelize.VARCHAR,
      },
      sale_date: {
        allowNull: false,
        type: Sequelize.DATETIME,
      },
      status: {
        allowNull: false,
        type: Sequelize.VARCHAR,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sales");
  },
};
