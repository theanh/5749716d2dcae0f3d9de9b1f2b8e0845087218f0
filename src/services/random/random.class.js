/* eslint-disable no-unused-vars */
const rands = [10, 12, 15, 20, 25, 50, 75, 100, 120, 150, 250, 500];
const weiths = [0.1, 0.3, 0.4, 0.5, 0.6, 0.1, 0.7, 0.9, 0.4, 0.3, 0.2, 0.3];
const rand = {};
rands.map((r, i) => {
  rand[r] = weiths[i];
});

// Algorithm https://en.wikipedia.org/wiki/Rejection_sampling
function weightedRand(spec) {
  var i, j, table=[];
  for (i in spec) {
    // The constant 10 below should be computed based on the
    // weights in the spec for a correct and optimal table size.
    // E.g. the spec {0:0.999, 1:0.001} will break this impl.
    for (j=0; j<spec[i]*10; j++) {
      table.push(i);
    }
  }
  return function() {
    return table[Math.floor(Math.random() * table.length)];
  };
}

function weightedRand2(spec) {
  var i, sum=0, r=Math.random();
  for (i in spec) {
    sum += spec[i];
    if (r <= sum) return i;
  }
}

class Service {
  constructor (app, options) {
    this.app = app || {};
    this.options = options || {};
  }

  find (params) {
    return Promise.resolve([]);
  }

  get (id, params) {
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    });
  }

  create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current)));
    }

    return Promise.resolve(data);
  }

  update (uuid, data, params) {
    const sequelizeClient = this.app.get('sequelizeClient');
    const { players } = sequelizeClient.models;

    return players
      .findOne({ where: { uuid }})
      .then(p => {

        if (p) {
          const win = parseFloat(weightedRand2(rand));
          const currentCoin = parseFloat(p.coin);
          return p.update({ coin: currentCoin + win })
            .then(p);
        }

        return Promise.resolve('false');
      });
  }

  patch (id, data, params) {
    return Promise.resolve(data);
  }

  remove (id, params) {
    return Promise.resolve({ id });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
