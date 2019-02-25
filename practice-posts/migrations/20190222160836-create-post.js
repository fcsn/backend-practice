'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Posts', {
        id: { 
          allowNull: false,
          autoIncreament: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        title: {
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
      return queryInterface.dropTable('Posts');
  }
};
