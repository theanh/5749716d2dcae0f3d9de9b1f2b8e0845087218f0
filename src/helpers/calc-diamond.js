const {PERCENTAGE_FOR_DIAMOND} = require('../constants');

function calcDiamond({percentageForDiamond}, totalBonus) {
  return Math.floor((parseFloat(totalBonus) || 0)
    * (percentageForDiamond || PERCENTAGE_FOR_DIAMOND));
}

module.exports = calcDiamond;
