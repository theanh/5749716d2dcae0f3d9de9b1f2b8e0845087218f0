const calcJackPot = require('./calc-jackpot');
const {MAXIMUM_OF_JACKPOT} = require('../constants');

/**
 * Calculate bonuses of user.
 *
 * @param float currentCoin
 * @param float currentJackPot
 * @param float currentDiamond
 * @param float|0 bet
 *
 * @return Object
 */
function calcBonus(
  currentCoin,
  currentJackPot,
  currentDiamond,
  bet = 0
) {
  let jackPot, coin, diamond = currentDiamond;

  const totalBonus = (parseFloat(bet) || 0) + 100;
  const receivedJackPot = calcJackPot(totalBonus);

  const remainedBonus = totalBonus - receivedJackPot;

  coin = currentCoin + remainedBonus;
  jackPot = currentJackPot + receivedJackPot;
  if (MAXIMUM_OF_JACKPOT <= jackPot) {
    jackPot = 0;
    diamond ++;
  }

  return { coin, jackPot, diamond };
}

module.exports = calcBonus;
