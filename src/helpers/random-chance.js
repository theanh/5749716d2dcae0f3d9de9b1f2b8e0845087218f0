const {weightedRand} = require('./random');
const {CHANCE_TABLE} = require('../constants');

function randomChance(rule) {
  const g = weightedRand(rule || CHANCE_TABLE);

  return g();
}

module.exports = randomChance;
