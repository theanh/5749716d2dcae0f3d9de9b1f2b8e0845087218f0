/* eslint-disable no-unused-vars */
const response = require('../../helpers/response');
const resolveSpin = require('../../helpers/resolve-spin');

class Service {
  constructor (app, options) {
    this.app = app || {};
    this.options = options || {};
  }

  get (uuid, params) {
    const sequelizeClient = this.app.get('sequelizeClient');
    const { players } = sequelizeClient.models;

    return players
      .findOne({ where: { uuid }})
      .then(p => {

        if (p) {
          const spun = parseFloat(resolveSpin()) * 1000;
          const currentCoin = parseFloat(p.coin) || 0;
          return p.update({ coin: currentCoin + spun })
            .then(() => response.handleSuccess({ player: p, spun }));
        }

        return Promise.resolve(response.handleError());
      });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
