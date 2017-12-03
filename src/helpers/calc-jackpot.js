const {PERCENTAGE_FOR_JACKPOT} = require('../constants');

function calcJackPot({percentageForJackpot}, totalBonus) {
  return Math.floor((parseFloat(totalBonus) || 0)
    * (percentageForJackpot || PERCENTAGE_FOR_JACKPOT));
}

module.exports = calcJackPot;
