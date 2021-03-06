'use strict';
/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.describeTable('players').then(attributes => {
      return queryInterface.addColumn('players', 'coin', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1000
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
