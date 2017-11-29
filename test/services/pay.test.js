const assert = require('assert');
const app = require('../../src/app');

describe('\'pay\' service', () => {
  it('registered the service', () => {
    const service = app.service('pay');

    assert.ok(service, 'Registered the service');
  });
});
