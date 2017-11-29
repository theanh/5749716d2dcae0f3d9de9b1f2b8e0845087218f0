function filterPlayer(player) {
  delete player.id;
  delete player.deviceId;
  delete player.facebookId;
  delete player.createdAt;
  delete player.updatedAt;

  return player;
}

module.exports = filterPlayer;
