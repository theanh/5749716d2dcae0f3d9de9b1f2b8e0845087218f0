'use strict';
/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: 'admin@slotgame.vn',
      password: '$2a$12$6P3TCCMFZ8hvucjcD67sLOu.4ZOGpWGXcGSd3Rwjc6jlLQA2InJFm',
      createdAt: '2017-11-30 09:03:55.058+00',
      updatedAt: '2017-11-30 09:03:55.058+00'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
