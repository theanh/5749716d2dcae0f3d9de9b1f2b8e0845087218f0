const {weightedRand} = require('./random');
const {RULES} = require('../constants');

function randomChance() {
  const generate = weightedRand(RULES);

  return generate();
}

module.exports = randomChance;
