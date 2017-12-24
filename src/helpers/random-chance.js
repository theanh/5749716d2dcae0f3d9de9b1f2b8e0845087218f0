const {weightedRand} = require('./random');

function randomChance(rule) {
  const g = weightedRand(rule);

  return g();
}

module.exports = randomChance;
