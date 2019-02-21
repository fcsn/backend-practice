'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      userId: 'eddie_S',
      name: '신승헌',
      engName: 'Eddie',
      createdAt: '2019-02-18',
      updatedAt: '2019-02-18',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
