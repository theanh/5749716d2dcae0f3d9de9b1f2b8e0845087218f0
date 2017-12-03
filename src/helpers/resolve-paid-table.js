const {
  PAID_TABLE,
  MIN_REQUIRED_TO_GET_BONUS,
  MIN_REQUIRED_TO_GET_DRAGON_WILL
} = require('../constants');
const calcFreeSpin = require('./calc-free-spin');

function countItemInArray(arr) {
  const countOfItem = {};

  for (var i = 0; i < arr.length; i++) {
    var num = arr[i];
    countOfItem[num] = countOfItem[num] ? countOfItem[num] + 1 : 1;
  }

  return countOfItem;
}

function resolvePaidRow({paidTable}, columns) {
  const awardedTable = paidTable || PAID_TABLE;
  let pointAwardedPerRow = 0;
  let isBonus = 0;
  let isDragonWill = 0;
  let scatter = 0;

  const countOfItems = countItemInArray(columns);
  Object.keys(countOfItems).forEach(item => {
    switch (`${item}`) {
    case '9':
      isBonus = (countOfItems[item] >= MIN_REQUIRED_TO_GET_BONUS) || 0;
      break;
    case '10':
      scatter += countOfItems[item] || 0;
      break;
    case '11':
      isDragonWill = (countOfItems[item] >= MIN_REQUIRED_TO_GET_DRAGON_WILL) || 0;
      break;
    default:
      pointAwardedPerRow += awardedTable[item][countOfItems[item]] || 0;
    }
  });

  return {pointAwardedPerRow, isBonus, isDragonWill, scatter};
}

function resolvePaidTable(setting, paidTable) {
  const awardedPerRow1 = resolvePaidRow(setting, paidTable['row1']);
  const awardedPerRow2 = resolvePaidRow(setting, paidTable['row2']);
  const awardedPerRow3 = resolvePaidRow(setting, paidTable['row3']);

  return {
    isBonus: awardedPerRow1.isBonus
      || awardedPerRow2.isBonus
      || awardedPerRow3.isBonus,
    isDragonWill: awardedPerRow1.isDragonWill
      || awardedPerRow2.isDragonWill
      || awardedPerRow3.isDragonWill,
    freeSpin: calcFreeSpin(awardedPerRow1.scatter
      + awardedPerRow2.scatter
      + awardedPerRow3.scatter),
    paidAmount: awardedPerRow1.pointAwardedPerRow
      + awardedPerRow2.pointAwardedPerRow
      + awardedPerRow3.pointAwardedPerRow
  };
}

module.exports = resolvePaidTable;
