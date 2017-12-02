const {weightedRand} = require('./random');
const {CHANCE_TABLE} = require('../constants');

function randomChance({rule}) {
  const generate = weightedRand(rule || CHANCE_TABLE);

  return generate();
}

module.exports = randomChance;
