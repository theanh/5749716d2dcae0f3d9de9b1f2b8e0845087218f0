function calcBonusState(isBonus, isDragonWill, freeSpin) {
  if (isBonus) return 500;

  switch (freeSpin) {
  case 5:
    return 200;
  case 10:
    return 300;
  case 25:
    return 400;
  default:
  }

  if (isDragonWill) return 100;

  return -1;
}

module.exports = calcBonusState;
