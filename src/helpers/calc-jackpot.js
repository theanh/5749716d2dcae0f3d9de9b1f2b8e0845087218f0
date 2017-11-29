const {PERCENTAGE_FOR_JACKPOT} = require('../constants');

function calcJackPot(totalBonus) {
  return (parseFloat(totalBonus) || 0) * PERCENTAGE_FOR_JACKPOT;
}

module.exports = calcJackPot;
