function isLevelUp({diamondEachLevel, difficultyIncrease}, player, diamond) {
  const diamondMin = parseFloat(diamondEachLevel);
  const requireDiamond = diamondMin + (diamondMin * parseInt(player.level, 10) * parseFloat(difficultyIncrease) / 100);

  return requireDiamond <= diamond;
}

module.exports = isLevelUp;
