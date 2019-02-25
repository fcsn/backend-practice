'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Comments', {
        id: { 
          allowNull: false,
          autoIncreament: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        content: {
          allowNull: true,
          type: Sequelize.STRING
        },
        createAt: {
          allowNull: false,
          type: Sequelize.DATE
        }, 
        updateAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Comments');
  }
};
