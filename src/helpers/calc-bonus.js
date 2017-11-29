const calcJackPot = require('./calc-jackpot');
const calcDiamond = require('./calc-diamond');
const {MAXIMUM_OF_FLAME} = require('../constants');

/**
 * Calculate bonuses of user.
 *
 * @param float currentCoin
 * @param float currentJackPot
 * @param float currentDiamond
 * @param array payedTable
 * @param float|0 bet
 *
 * @return Object
 */
function calcBonus(
  currentCoin,
  currentJackPot,
  currentDiamond,
  currentFlame,
  payedTable,
  bet = 0
) {
  let coin, jackPot, diamond, flame;

  // @TODO: need to find the rule of calculating bet result.
  const totalBonus = (parseFloat(bet) || 0) + 100;

  const receivedJackPot = calcJackPot(totalBonus);
  const receivedDiamond = calcDiamond(totalBonus);

  const remainedBonus = totalBonus - (receivedDiamond + receivedJackPot);

  coin = currentCoin + remainedBonus;
  diamond = currentDiamond + receivedDiamond;
  jackPot = currentJackPot + receivedJackPot;

  // @TODO: need to find the rule of adding flame.
  flame = currentFlame + 1;

  if (MAXIMUM_OF_FLAME === flame) {
    coin += jackPot;
    jackPot = 0;
    flame = 0;
  }

  return { coin, jackPot, diamond, flame };
}

module.exports = calcBonus;
