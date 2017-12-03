'use strict';
/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'players',
      'diamond',
      {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0
      }
    )
      .then(() => {
        return queryInterface.addColumn(
          'players',
          'level',
          {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
          }
        );
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
