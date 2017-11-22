class Service {
  constructor (app, options) {
    this.app = app || {};
    this.options = options || {};
  }

  find (params) {
    const { query: { deviceId } } = params;

    return this.app.service('players').find({
      query: {
        deviceId
      }
    })
      .then(players => {
        if (players.total === 0)
          return this.app.service('players').create({
            deviceId
          });

        return players.data[0];
      });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
