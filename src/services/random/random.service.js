// Initializes the `random` service on path `/random`
const createService = require('./random.class.js');
const hooks = require('./random.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    name: 'random',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/random', createService(app, options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('random');

  service.hooks(hooks);
};
