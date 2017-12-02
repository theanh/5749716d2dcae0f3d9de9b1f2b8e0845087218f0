const {PAID_TABLE} = require('../constants');

function countItemInArray(arr) {
  const counts = {};

  for (var i = 0; i < arr.length; i++) {
    var num = arr[i];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  return counts;
}

function resolvePaidRow({paidTable}, columns) {
  const awardedTable = paidTable || PAID_TABLE;
  let pointAwardedPerRow = 0;

  const countOfItems = countItemInArray(columns);
  Object.keys(countOfItems).forEach((countOfItem, count) => {
    pointAwardedPerRow += awardedTable[countOfItem][`${count}`] || 0;
  });

  return pointAwardedPerRow;
}

function resolvePaidTable(setting, paidTable) {
  const pointAwardedPerRow1 = resolvePaidRow(setting, paidTable['row1']);
  const pointAwardedPerRow2 = resolvePaidRow(setting, paidTable['row2']);
  const pointAwardedPerRow3 = resolvePaidRow(setting, paidTable['row3']);

  return pointAwardedPerRow1 + pointAwardedPerRow2 + pointAwardedPerRow3;
}

module.exports = resolvePaidTable;
