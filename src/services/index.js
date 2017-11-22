const players = require('./players/players.service.js');
const login = require('./login/login.service.js');
module.exports = function (app) {
  app.configure(players);
  app.configure(login);
};
