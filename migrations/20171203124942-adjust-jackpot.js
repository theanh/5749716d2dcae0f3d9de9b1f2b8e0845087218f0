'use strict';
/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('settings', 'percentageForJackpot')
      .then(() => {
        return queryInterface.addColumn('settings', 'percentageForJackpot', {
          type: Sequelize.FLOAT,
          defaultValue: 0.01
        })
          .then(() => {
            return queryInterface.removeColumn('settings', 'percentageForDiamond')
              .then(() => {
                return queryInterface.addColumn('settings', 'percentageForDiamond', {
                  type: Sequelize.FLOAT,
                  defaultValue: 0.2
                });
              });
          })
        ;
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
