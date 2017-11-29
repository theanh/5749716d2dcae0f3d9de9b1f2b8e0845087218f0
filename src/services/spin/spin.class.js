/* eslint-disable no-unused-vars */
const response = require('../../helpers/response');
const weightedRand = require('../../helpers/random');

const rands = [10, 12, 15, 20, 25, 50, 75, 100, 120, 150, 250, 500];
const weiths = [0.1, 0.3, 0.4, 0.5, 0.6, 0.1, 0.7, 0.9, 0.4, 0.3, 0.2, 0.3];
const rand = {};
rands.map((r, i) => {
  rand[r] = weiths[i];
});

const generateLottle = weightedRand(rand);

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
          const win = parseFloat(generateLottle()) * 1000;
          const currentCoin = parseFloat(p.coin) || 0;
          return p.update({ coin: currentCoin + win })
            .then(() => response.handleSuccess(p));
        }

        return Promise.resolve(response.handleError());
      });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
