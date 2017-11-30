const players = require('./players/players.service.js');
const login = require('./login/login.service.js');
const spin = require('./spin/spin.service.js');
const bet = require('./bet/bet.service.js');
const users = require('./users/users.service.js');
const settings = require('./settings/settings.service.js');

module.exports = function (app) {
  app.configure(players);
  app.configure(login);
  app.configure(spin);
  app.configure(bet);
  app.configure(users);
  app.configure(settings);
};
