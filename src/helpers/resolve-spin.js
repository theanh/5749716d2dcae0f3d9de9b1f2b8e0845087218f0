const {SPIN} = require('../constants');
const {weightedRand} = require('../helpers/random');

const resolveSpin = spin => {
  const random = weightedRand(spin || SPIN);

  return random();
};

module.exports = resolveSpin;
