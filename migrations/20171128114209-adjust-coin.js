'use strict';
/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.describeTable('players').then(attributes => {
      if ( attributes.coin ) {
        return queryInterface.removeColumn('players', 'coin')
          .then(() => {
            return queryInterface.addColumn('players', 'coin', {
              type: Sequelize.FLOAT,
              allowNull: true,
              defaultValue: 10
            });
          });
      }
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
