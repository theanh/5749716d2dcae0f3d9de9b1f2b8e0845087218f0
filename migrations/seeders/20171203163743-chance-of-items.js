'use strict';
/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('settings', null, {})
      .then(() => {
        return queryInterface.bulkInsert('settings', [{
          spin: '{"10":0.15,"12":0.15,"15":0.1,"20":0.05,"25":0.05,"50":0.2,"75":0.1,"100":0.05,"120":0.05,"150":0.05,"250":0.025,"500":0.025}',
          rule: '{"0":0.6,"1":0.1,"2":0.1,"3":0.2}',
          paidTable: '{"0":{"1":0,"2":5,"3":50,"4":250,"5":1000},"1":{"1":0,"2":4,"3":40,"4":200,"5":500},"2":{"1":0,"2":3,"3":30,"4":150,"5":300},"3":{"1":0,"2":0,"3":25,"4":100,"5":200},"4":{"1":0,"2":0,"3":20,"4":75,"5":150},"5":{"1":0,"2":0,"3":15,"4":50,"5":100},"6":{"1":0,"2":0,"3":10,"4":30,"5":80},"7":{"1":0,"2":0,"3":5,"4":20,"5":60},"8":{"1":0,"2":0,"3":4,"4":15,"5":50},"9":{},"10":{},"11":{}}',
          chanceOfDisplayingItem: '{"0":0.05,"1":0.05,"2":0.05,"3":0.05,"4":0.05,"5":0.05,"6":0.05,"7":0.05,"8":0.1,"9":0.2,"10":0.2,"11":0.1}',
          createdAt: '2017-11-30 10:03:55.058+00',
          updatedAt: '2017-11-30 10:03:55.058+00',
        }], {});
      });
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
