class Service {
  constructor (app, options) {
    this.app = app || {};
    this.options = options || {};
  }

  find (params) {
    const { query: { deviceId, facebookId } } = params;
    const sequelizeClient = this.app.get('sequelizeClient');
    const { players } = sequelizeClient.models;

    if (facebookId) {
      return players
        .findOne({ where: { facebookId }})
        .then(p => {
          if (!p) {
            return players
              .findOne({ where: { deviceId }})
              .then(p => {
                if (!p) return players.create({ deviceId, facebookId });

                return p.update({ facebookId })
                  .then(p);
              });
          }

          return p;
        });
    }

    return players
      .findOne({ where: { deviceId }})
      .then(p => {
        if (!p) return players.create({ deviceId });

        return p;
      });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
