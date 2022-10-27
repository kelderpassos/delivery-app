'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.VARCHAR,
      },
      email: {
        allowNull: false,
        type: Sequelize.VARCHAR,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.VARCHAR,
      },
      role: {
        allowNull: false,
        type: Sequelize.VARCHAR,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  }
};
