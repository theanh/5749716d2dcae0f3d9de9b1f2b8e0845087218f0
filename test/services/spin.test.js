const assert = require('assert');
const app = require('../../src/app');

describe('\'spin\' service', () => {
  it('registered the service', () => {
    const service = app.service('spin');

    assert.ok(service, 'Registered the service');
  });
});
