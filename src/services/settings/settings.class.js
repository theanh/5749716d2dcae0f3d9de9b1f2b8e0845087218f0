/* eslint-disable no-unused-vars */
const response = require('../../helpers/response');

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
    const { Model } = this.options;

    return Model
      .findOne({ where: { id }})
      .then(setting => {
        if (setting) {
          const {
            spin,
            rule,
            chanceOfWinning,
            chanceOfDisplayingItem
          } = params;

          if (spin) {
            return setting.update({ spin })
              .then(res =>
                response.handleSuccess(res)
              );
          }

          if (chanceOfWinning) {
            return setting.update({
              chanceOfWinning: chanceOfWinning.chance
            })
              .then(res =>
                response.handleSuccess(res)
              );
          }

          if (chanceOfDisplayingItem) {
            return setting.update({ chanceOfDisplayingItem })
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
