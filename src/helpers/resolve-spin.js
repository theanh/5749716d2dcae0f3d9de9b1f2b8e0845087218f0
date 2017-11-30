const {SPIN} = require('../constants');
const {weightedRand} = require('../helpers/random');

const resolveSpin = weightedRand(SPIN);

module.exports = resolveSpin;
