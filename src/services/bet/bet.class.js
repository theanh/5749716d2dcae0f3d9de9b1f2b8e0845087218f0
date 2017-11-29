/* eslint-disable no-unused-vars */
const response = require('../../helpers/response');
const calcBonus = require('../../helpers/calc-bonus');
const weightedRand = require('../../helpers/random');

const rands = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
const weiths = [0.1, 0.3, 0.4, 0.5, 0.6, 0.1, 0.7, 0.9, 0.4, 0.3, 0.2, 0.3];
const rand = {};
rands.map((r, i) => {
  rand[r] = weiths[i];
});

const generate = weightedRand(rand);

class Service {
  constructor (app, options) {
    this.app = app || {};
    this.options = options || {};
  }

  get (uuid, params) {
    const row1 = [generate(), generate(), generate(), generate(), generate()];
    const row2 = [generate(), generate(), generate(), generate(), generate()];
    const row3 = [generate(), generate(), generate(), generate(), generate()];
    const payedTable = { row1, row2, row3 };

    const { query: { totalBet } } = params;
    const sequelizeClient = this.app.get('sequelizeClient');
    const { players } = sequelizeClient.models;

    return players
      .findOne({ where: { uuid }})
      .then(p => {

        if (p) {
          const currentCoin = parseFloat(p.coin) || 0;
          const currentJackPot = parseFloat(p.jackPot) || 0;
          const currentDiamond = parseFloat(p.diamond) || 0;
          const bonus = calcBonus(
            currentCoin,
            currentJackPot,
            currentDiamond,
            totalBet
          );

          return p.update({
            coin: bonus.coin,
            jackPot: bonus.jackPot,
            diamond: bonus.diamond
          })
            .then(() => response.handleSuccess({ player: p, payedTable }));
        }

        return Promise.resolve(response.handleError());
      });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
