const {PERCENTAGE_FOR_DIAMOND} = require('../constants');

function calcDiamond({percentageForJackpot}, totalBonus) {
  return (parseFloat(totalBonus) || 0)
    * (percentageForJackpot || PERCENTAGE_FOR_DIAMOND);
}

module.exports = calcDiamond;
