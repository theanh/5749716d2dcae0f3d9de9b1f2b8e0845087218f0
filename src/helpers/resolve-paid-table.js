const {PAYED_TABLE} = require('../constants');

function countItemInArray(arr) {
  const counts = {};

  for (var i = 0; i < arr.length; i++) {
    var num = arr[i];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  return counts;
}

function resolvePaidRow(columns) {
  let pointAwardedPerRow = 0;
  const countOfItems = countItemInArray(columns);
  Object.keys(countOfItems).forEach((countOfItem, count) => {
    pointAwardedPerRow += PAYED_TABLE[countOfItem][`${count}`] || 0;
  });

  return pointAwardedPerRow;
}

function resolvePaidTable(paidTable) {
  const pointAwardedPerRow1 = resolvePaidRow(paidTable['row1']);
  const pointAwardedPerRow2 = resolvePaidRow(paidTable['row2']);
  const pointAwardedPerRow3 = resolvePaidRow(paidTable['row3']);

  return pointAwardedPerRow1 + pointAwardedPerRow2 + pointAwardedPerRow3;
}

module.exports = resolvePaidTable;
