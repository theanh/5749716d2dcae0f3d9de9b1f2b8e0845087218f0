// Initializes the `settings` service on path `/settings`
// const createService = require('feathers-sequelize');

const createService = require('./settings.class');
const createModel = require('../../models/settings.model');
const hooks = require('./settings.hooks');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'settings',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/settings', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('settings');

  service.hooks(hooks);
};
