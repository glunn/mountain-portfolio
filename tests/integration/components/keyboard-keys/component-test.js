import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | keyboard-keys', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{keyboard-keys}}`);

    assert.equal(this.element.textContent.replace(/\s+/g, "").trim(), 'wasd');
  });
});
