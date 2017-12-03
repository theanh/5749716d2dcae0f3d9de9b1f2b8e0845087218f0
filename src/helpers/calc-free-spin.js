const {FREE_SPIN} = require('../constants');

function calcFreeSpin(scatter) {
  return FREE_SPIN[scatter] || 0;
}

module.exports = calcFreeSpin;
