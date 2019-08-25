import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | awesome', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:awesome');
    assert.ok(route);
  });
});
