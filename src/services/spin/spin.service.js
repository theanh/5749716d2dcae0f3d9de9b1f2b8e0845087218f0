// Initializes the `spin` service on path `/spin`
const createService = require('./spin.class.js');
const hooks = require('./spin.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    name: 'spin',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/spin', createService(app, options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('spin');

  service.hooks(hooks);
};
