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

function generatePaidTableByRule(ruleNumber = 1) {
  const pingoItem = generate();
  const pingoRow = [pingoItem, pingoItem, pingoItem, pingoItem, pingoItem];
  const row1 = [generate(), generate(), generate(), generate(), generate()];
  const row2 = [generate(), generate(), generate(), generate(), generate()];

  switch (ruleNumber) {
  case 2:
    return { row1, row2: pingoRow, row3: row2 };
  case 3:
    return { row1, row2, row3: pingoRow };
  default:
    return { row1: pingoRow, row2: row1, row3: row2 };
  }
}

function resolveBet(setting) {
  let paidTable = {};
  const { rule, chanceOfWinning } = setting;
  let chanceTable = rule;
  chanceTable[0] = 1 - parseFloat(chanceOfWinning);

  const betResult = randomChance(chanceTable);

  switch (`${betResult}`) {
  case '1':
    paidTable = generatePaidTableByRule(1);
    break;
  case '2':
    paidTable = generatePaidTableByRule(2);
    break;
  case '3':
    paidTable = generatePaidTableByRule(3);
    break;
  default:
    paidTable = generatePaidTable();
  }

  return paidTable;
}

module.exports = resolveBet;
