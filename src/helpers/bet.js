const randomChance = require('./random-chance');
const randomItem = require('./random-item');

// Funcs
function generatePaidTable(chanceOfDisplayingItem) {
  const generate = randomItem(chanceOfDisplayingItem);
  const row1 = [generate(), generate(), generate(), generate(), generate()];
  const row2 = [generate(), generate(), generate(), generate(), generate()];
  const row3 = [generate(), generate(), generate(), generate(), generate()];

  return { row1, row2, row3 };
}

function generateBetResult(chanceOfDisplayingItem, winningRule = -1) {
  let paidTable = {}, highlight = [];
  const generate = randomItem(chanceOfDisplayingItem);
  let pingoItem = generate();
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

  // Bonus DRAGON_WILD
  case '100':
    highlight = ['00', '00', '00', '00', '00'];
    paidTable = {
      row1: [5, generate(), generate(), generate(), 9],
      row2: [5, generate(), 9, generate(), pingoItem],
      row3: [5, generate(), generate(), generate(), generate()]
    };
    break;

  // Bonus FREE_SPINS_5
  case '200':
    highlight = [];
    paidTable = {
      row1: [10, generate(), generate(), generate(), generate()],
      row2: [generate(), generate(), 10, generate(), generate()],
      row3: [generate(), generate(), generate(), 10, generate()]
    };
    break;

  // Bonus FREE_SPINS_10
  case '300':
    highlight = [];
    paidTable = {
      row1: [10, generate(), generate(), generate(), generate()],
      row2: [generate(), generate(), 10, generate(), generate()],
      row3: [generate(), generate(), generate(), 10, generate()]
    };
    break;

  // Bonus FREE_SPINS_25
  case '400':
    highlight = [];
    paidTable = {
      row1: [10, generate(), generate(), generate(), generate()],
      row2: [generate(), generate(), 10, generate(), generate()],
      row3: [generate(), generate(), generate(), 10, generate()]
    };
    break;

  // Bonus BONUS_SCATTER
  case '500':
    highlight = [];
    paidTable = {
      row1: [generate(), 11, 11, 11, generate()],
      row2: [generate(), 11, 11, 11, 11],
      row3: [generate(), 11, 11, generate(), 11]
    };
    break;

  // No win
  default:
    highlight = [];
    paidTable = generatePaidTable();
    pingoItem = -1;
  }

  return {
    winningRule,
    winningItem: pingoItem,
    highlight,
    paidTable
  };
}

function resolveBet(setting) {
  const { rule, chanceOfDisplayingItem } = setting;
  const winningRule = randomChance(rule);

  return generateBetResult(chanceOfDisplayingItem, winningRule);
}

module.exports = resolveBet;
