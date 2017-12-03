/* eslint-disable no-unused-vars */
const response = require('../../helpers/response');
const calcBonus = require('../../helpers/calc-bonus');
const resolveBet = require('../../helpers/bet');

class Service {
  constructor (app, options) {
    this.app = app || {};
    this.options = options || {};
  }

  get (uuid, params) {
    const { query: { totalBet } } = params;
    const sequelizeClient = this.app.get('sequelizeClient');
    const { settings, players } = sequelizeClient.models;

    return settings.findOne()
      .then(setting => {
        if (!setting) return Promise.resolve(response.handleError());

        const {winningRule, paidTable, highlight} = resolveBet(setting.dataValues);

        return players
          .findOne({ where: { uuid }})
          .then(p => {

            if (p) {
              const currentCoin = parseFloat(p.coin) || 0;
              const currentJackPot = parseFloat(p.jackPot) || 0;
              const currentDiamond = parseFloat(p.diamond) || 0;
              const currentFlame = parseFloat(p.flame) || 0;
              const bonus = calcBonus(
                setting.dataValues,
                currentCoin,
                currentJackPot,
                currentDiamond,
                currentFlame,
                paidTable,
                totalBet
              );

              return p.update({
                coin: bonus.coin,
                jackPot: bonus.jackPot,
                diamond: bonus.diamond,
                flame: bonus.flame
              })
                .then(() =>
                  response.handleSuccess(
                    {
                      player: p,
                      bonus,
                      paidTable,
                      highlight,
                      winningRule
                    }
                  )
                );
            }

            return Promise.resolve(response.handleError());
          });
      });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
