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

        const {
          winningRule,
          winningItem,
          paidTable,
          highlight
        } = resolveBet(setting.dataValues);

        return players
          .findOne({ where: { uuid }})
          .then(p => {

            if (p) {
              const bonus = calcBonus(
                setting.dataValues,
                p,
                paidTable,
                totalBet
              );

              return p.update({
                coin: bonus.coin,
                jackPot: bonus.jackPot,
                diamond: bonus.diamond,
                flame: bonus.flame,
                freeSpin: bonus.freeSpin
              })
                .then(() =>
                  response.handleSuccess(
                    {
                      player: p,
                      bonus,
                      paidTable,
                      highlight,
                      winningRule,
                      winningItem
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
