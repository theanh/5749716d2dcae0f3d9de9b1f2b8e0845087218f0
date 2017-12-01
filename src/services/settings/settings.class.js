/* eslint-disable no-unused-vars */
const response = require('../../helpers/response');
const calcBonus = require('../../helpers/calc-bonus');
const resolveBet = require('../../helpers/bet');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  find(params) {
    const { Model } = this.options;
    return Model
      .findOne()
      .then(p => {
        return response.handleSuccess(p);
      });
  }

  update(id, params) {
    const paidTable = resolveBet();

    const { Model } = this.options;

    return Model
      .findOne({ where: { id }})
      .then(setting => {
        if (setting) {
          const { spin, rule } = params;

          if (spin) {
            return setting.update({ spin })
              .then(res =>
                response.handleSuccess(res)
              );
          }

          if (rule) {
            return setting.update({ rule })
              .then(res =>
                response.handleSuccess(res)
              );
          }
        }

        return Promise.resolve(response.handleError());
      });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
