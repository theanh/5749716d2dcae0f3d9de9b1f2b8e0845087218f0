const resolvePaidTable = require('./resolve-paid-table');
const calcJackPot = require('./calc-jackpot');
const calcDiamond = require('./calc-diamond');
const {MAXIMUM_OF_FLAME} = require('../constants');

/**
 * Calculate bonuses of user.
 *
 * @param float currentCoin
 * @param float currentJackPot
 * @param float currentDiamond
 * @param array paidTable
 * @param float|0 totalBet
 *
 * @return Object
 */
function calcBonus(
  currentCoin,
  currentJackPot,
  currentDiamond,
  currentFlame,
  paidTable,
  totalBet = 0
) {
  let coin, jackPot, diamond, flame;
  const bet = parseFloat(totalBet) || 0;

  // @TODO: need to find the rule of calculate bonus on bet amount.
  const paidAmount = resolvePaidTable(paidTable);
  const totalBonus = bet + paidAmount;

  const receivedJackPot = calcJackPot(totalBonus);
  const receivedDiamond = calcDiamond(totalBonus);

  const remainedBonus = totalBonus - (receivedDiamond + receivedJackPot);

  coin = currentCoin + remainedBonus - bet;
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
