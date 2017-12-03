const resolvePaidTable = require('./resolve-paid-table');
const calcJackPot = require('./calc-jackpot');
const calcDiamond = require('./calc-diamond');
const calcBonusState = require('./calc-bonus-state');
const {MAXIMUM_OF_FLAME} = require('../constants');

/**
 * Calculate bonuses of user.
 *
 * @param Object setting
 * @param float currentCoin
 * @param float currentJackPot
 * @param float currentDiamond
 * @param array paidTable
 * @param float|0 totalBet
 *
 * @return Object
 */
function calcBonus(
  setting,
  currentCoin,
  currentJackPot,
  currentDiamond,
  currentFlame,
  paidTable,
  totalBet = 0
) {
  let coin, jackPot, diamond, flame;
  const bet = parseFloat(totalBet) || 0;

  const {
    paidAmount,
    isBonus,
    isDragonWill,
    freeSpin
  } = resolvePaidTable(setting, paidTable);
  const totalBonus = bet + paidAmount;

  const receivedJackPot = calcJackPot(setting, totalBonus);
  const receivedDiamond = calcDiamond(setting, totalBonus);

  const remainedBonus = totalBonus - (receivedDiamond + receivedJackPot);

  coin = currentCoin + remainedBonus - bet;
  diamond = currentDiamond + receivedDiamond;
  jackPot = currentJackPot + receivedJackPot;

  // @TODO: need to find the rule of adding flame.
  flame = currentFlame + 1;

  if ((setting.maximumOfFlame || MAXIMUM_OF_FLAME) === flame) {
    coin += jackPot;
    jackPot = 0;
    flame = 0;
  }

  return {
    coin,
    jackPot,
    diamond,
    flame,
    state: calcBonusState(isBonus, isDragonWill, freeSpin)
  };
}

module.exports = calcBonus;
