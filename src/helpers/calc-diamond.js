const {PERCENTAGE_FOR_DIAMOND} = require('../constants');

function calcDiamond(totalBonus) {
  return (parseFloat(totalBonus) || 0) * PERCENTAGE_FOR_DIAMOND;
}

module.exports = calcDiamond;
