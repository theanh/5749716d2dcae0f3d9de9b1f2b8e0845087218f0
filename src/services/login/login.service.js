// Initializes the `login` service on path `/login`
const createService = require('./login.class.js');
const hooks = require('./login.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    name: 'login',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/login', createService(app, options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('login');

  service.hooks(hooks);
};
