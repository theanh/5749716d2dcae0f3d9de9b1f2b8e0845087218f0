const PERCENTAGE_FOR_JACKPOT = (7 / 100);
const PERCENTAGE_FOR_DIAMOND = (25 / 100);
const MAXIMUM_OF_FLAME = 20;

const SPIN = {
  10: 0.15,
  12: 0.15,
  15: 0.1,
  20: 0.05,
  25: 0.05,
  50: 0.2,
  75: 0.1,
  100: 0.05,
  120: 0.05,
  150: 0.05,
  250: 0.025,
  500: 0.025
};

const CHANCE_TABLE = {
  '-1': 0.6, // No win
  '0': 0.1,
  '1': 0.1,
  '2': 0.1,
  '3': 0.2,
  '100': 0.2,
  '200': 0.2,
  '300': 0.1,
  '400': 0.1,
  '500': 0.2
};

const PAID_TABLE = {
  0: {
    1: 0,
    2: 5,
    3: 50,
    4: 250,
    5: 1000
  },
  1: {
    1: 0,
    2: 4,
    3: 40,
    4: 200,
    5: 500
  },
  2: {
    1: 0,
    2: 3,
    3: 30,
    4: 150,
    5: 300
  },
  3: {
    1: 0,
    2: 0,
    3: 25,
    4: 100,
    5: 200
  },
  4: {
    1: 0,
    2: 0,
    3: 20,
    4: 75,
    5: 150
  },
  5: {
    1: 0,
    2: 0,
    3: 15,
    4: 50,
    5: 100
  },
  6: {
    1: 0,
    2: 0,
    3: 10,
    4: 30,
    5: 80
  },
  7: {
    1: 0,
    2: 0,
    3: 5,
    4: 20,
    5: 60
  },
  8: {
    1: 0,
    2: 0,
    3: 4,
    4: 15,
    5: 50
  },
  9: {
    1: 0,
    2: 0,
    3: 1,
    4: 1,
    5: 1
  },
  10: {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5
  },
  11: {
    1: 0,
    2: 0,
    3: 1,
    4: 1,
    5: 1
  }
};

const FREE_SPIN = {
  3: 5,
  4: 10,
  5: 25
};

const MIN_REQUIRED_TO_GET_BONUS = 3;
const MIN_REQUIRED_TO_GET_DRAGON_WILL = 1;

module.exports = {
  PERCENTAGE_FOR_JACKPOT,
  PERCENTAGE_FOR_DIAMOND,
  MAXIMUM_OF_FLAME,
  SPIN,
  CHANCE_TABLE,
  PAID_TABLE,
  FREE_SPIN,
  MIN_REQUIRED_TO_GET_BONUS,
  MIN_REQUIRED_TO_GET_DRAGON_WILL
};
