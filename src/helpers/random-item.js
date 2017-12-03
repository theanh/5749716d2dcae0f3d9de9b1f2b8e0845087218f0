const {weightedRand} = require('./random');

const rands = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
const weiths = [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1, 0.2, 0.2, 0.1];
const rand = {};
rands.map((r, i) => {
  rand[r] = weiths[i];
});

function randomItem(chanceOfDisplayingItem) {
  return weightedRand(chanceOfDisplayingItem || rand);
}

module.exports = randomItem;
