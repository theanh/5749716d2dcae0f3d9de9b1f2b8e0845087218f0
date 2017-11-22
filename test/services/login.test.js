const assert = require('assert');
const app = require('../../src/app');

describe('\'login\' service', () => {
  it('registered the service', () => {
    const service = app.service('login');

    assert.ok(service, 'Registered the service');
  });
});
