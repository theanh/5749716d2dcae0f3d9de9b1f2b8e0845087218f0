const isWin = require('./is-win');
const randomChance = require('./random-chance');
const {weightedRand} = require('./random');

const rands = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
const weiths = [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1, 0.2, 0.2, 0.1];
const rand = {};
rands.map((r, i) => {
  rand[r] = weiths[i];
});
const generate = weightedRand(rand);

// Funcs
function generatePaidTable() {
  const row1 = [generate(), generate(), generate(), generate(), generate()];
  const row2 = [generate(), generate(), generate(), generate(), generate()];
  const row3 = [generate(), generate(), generate(), generate(), generate()];

  return { row1, row2, row3 };
}

function generateBetResult(winningRule = 0) {
  let paidTable = {};
  let highlight = [];
  const pingoItem = generate();
  const pingoRow = [pingoItem, pingoItem, pingoItem, pingoItem, pingoItem];
  const row1 = [generate(), generate(), generate(), generate(), generate()];
  const row2 = [generate(), generate(), generate(), generate(), generate()];

  switch (`${winningRule}`) {
  case '0':
    highlight = [ '00', '01', '02', '03', '04' ];
    paidTable = { row1: pingoRow, row2: row1, row3: row2 };
    break;
  case '1':
    highlight = [ '10', '11', '12', '13', '14' ];
    paidTable = { row1, row2: pingoRow, row3: row2 };
    break;
  case '2':
    highlight = [ '20', '21', '22', '23', '24' ];
    paidTable = { row1, row2, row3: pingoRow };
    break;
  case '3':
    highlight = [ '20', '11', '02', '13', '24' ];
    paidTable = {
      row1: [generate(), generate(), pingoItem, generate(), generate()],
      row2: [generate(), pingoItem, generate(), pingoItem, generate()],
      row3: [pingoItem, generate(), generate(), generate(), pingoItem]
    };
    break;
  default:
    highlight = [ '00', '01', '02', '03', '04' ];
    paidTable = { row1: pingoRow, row2: row1, row3: row2 };
  }

  return {
    winningRule,
    highlight,
    paidTable
  };
}

function resolveBet(setting) {
  const { rule, chanceOfWinning } = setting;

  if ('0' === isWin(parseFloat(chanceOfWinning)))
    return {
      winningRule: -1,
      paidTable: generatePaidTable(),
      highlight: []
    };

  const winningRule = randomChance(rule);

  return generateBetResult(winningRule);
}

module.exports = resolveBet;
