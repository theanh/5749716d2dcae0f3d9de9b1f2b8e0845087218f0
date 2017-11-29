// Initializes the `bet` service on path `/bet`
const createService = require('./bet.class.js');
const hooks = require('./bet.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    name: 'bet',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/bet', createService(app, options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('bet');

  service.hooks(hooks);
};
