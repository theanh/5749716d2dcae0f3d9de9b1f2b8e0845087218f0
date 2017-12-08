const resolvePaidTable = require('./resolve-paid-table');
const calcJackPot = require('./calc-jackpot');
const calcDiamond = require('./calc-diamond');
const calcBonusState = require('./calc-bonus-state');
const isLevelUp = require('./is-level-up');
const {MAXIMUM_OF_FLAME} = require('../constants');

/**
 * Calculate bonuses of user.
 *
 * @param Object setting
 * @param Object player
 * @param array paidTable
 * @param float|0 totalBet
 *
 * @return Object
 */
function calcBonus(
  setting,
  player,
  paidTable,
  totalBet = 0
) {
  const currentCoin = parseFloat(player.coin) || 0;
  const currentJackPot = parseFloat(player.jackPot) || 0;
  const currentDiamond = parseFloat(player.diamond) || 0;
  const currentFlame = parseFloat(player.flame) || 0;
  const currentFreeSpin = parseInt(player.freeSpin, 10) || 0;

  let coin,
    jackPot,
    diamond,
    flame = currentFlame,
    bonusState = -1,
    remainedFreeSpin = currentFreeSpin,
    wonJackPot = {
      status: false,
      value: 0
    },
    levelUp = false;
  const bet = parseFloat(totalBet) || 0;

  const paidTableAfterResolved = resolvePaidTable(setting, paidTable);
  const { paidAmount } = paidTableAfterResolved;
  const totalBonus = Math.floor(bet + (bet * 0.15) * paidAmount);

  const receivedJackPot = calcJackPot(setting, totalBonus);
  const receivedDiamond = calcDiamond(setting, totalBonus);

  let coinPlus = totalBonus - (receivedDiamond + receivedJackPot);

  if (currentFreeSpin > 0) {
    remainedFreeSpin --;
  } else {
    coinPlus -= bet;
    const { isBonus, isDragonWill, freeSpin } = paidTableAfterResolved;
    remainedFreeSpin = freeSpin;

    if (isDragonWill) flame = currentFlame + 1;

    bonusState = calcBonusState(isBonus, isDragonWill, freeSpin);
  }

  coin = currentCoin + coinPlus;
  diamond = currentDiamond + receivedDiamond;
  jackPot = currentJackPot + receivedJackPot;

  if ((setting.maximumOfFlame || MAXIMUM_OF_FLAME) === flame) {
    wonJackPot = {
      status: true,
      value: jackPot
    };
    coin += jackPot;
    jackPot = 0;
    flame = 0;
  }

  levelUp = isLevelUp(setting.levelSetting, player, diamond);

  return {
    coin,
    coinPlus,
    jackPot,
    diamond: levelUp ? 0 : diamond,
    flame,
    freeSpin: remainedFreeSpin,
    state: bonusState,
    wonJackPot,
    levelUp
  };
}

module.exports = calcBonus;
