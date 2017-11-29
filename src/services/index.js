const players = require('./players/players.service.js');
const login = require('./login/login.service.js');
const spin = require('./spin/spin.service.js');
const pay = require('./pay/pay.service.js');
module.exports = function (app) {
  app.configure(players);
  app.configure(login);
  app.configure(spin);
  app.configure(pay);
};
