const assert = require('assert');
const app = require('../../src/app');

describe('\'random\' service', () => {
  it('registered the service', () => {
    const service = app.service('random');

    assert.ok(service, 'Registered the service');
  });
});
