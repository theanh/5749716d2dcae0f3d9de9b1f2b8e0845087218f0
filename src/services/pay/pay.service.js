// Initializes the `pay` service on path `/pay`
const createService = require('./pay.class.js');
const hooks = require('./pay.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    name: 'pay',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/pay', createService(app, options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('pay');

  service.hooks(hooks);
};
