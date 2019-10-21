import Component from '@ember/component';
import { get, set } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['keyboard-keys-component'],
  sprite: service(),

  onClickLeft: task(function * (inc) {
    let spriteling = get(this, 'sprite.spriteling');
    let left = get(this, 'sprite.left');

    spriteling.play('runLeft', {
      run: -1,
      delay: 150
    });
    this.set('sprite.action', 'runLeft');
    this.set('sprite.forward', false);

    while (true) {
      this.decrementProperty('sprite.left', inc);
      yield timeout(8);
      left = get(this, 'sprite.left');
      set(this, 'sprite.left', left);
      document.getElementById("move-sprite").style.left = left + "px";
    }
  }),
  onClickRight: task(function * (inc) {
    let spriteling = get(this, 'sprite.spriteling');
    let left = get(this, 'sprite.left');

    spriteling.play('runRight', {
      run: -1,
      delay: 150
    });
    this.set('sprite.action', 'runRight');
    this.set('sprite.forward', true);

    while (true) {
      this.incrementProperty('sprite.left', inc);
      yield timeout(8);
      left = get(this, 'sprite.left');
      set(this, 'sprite.left', left);
      document.getElementById("move-sprite").style.left = left + "px";
    }
  }),
  onClickDown: task(function * (inc) {
    let top = get(this, 'sprite.top');
    while (true) {
      this.incrementProperty('sprite.top', inc);
      yield timeout(8);
      top = get(this, 'sprite.top');
      set(this, 'sprite.top', top);
      document.getElementById("move-sprite").style.top = top + "px";
    }
  }),
  onClickUp: task(function * (inc) {
    let top = get(this, 'sprite.top');
    let spriteling = get(this, 'sprite.spriteling');
    let forward = get(this, 'sprite.forward');
    spriteling.next();

    if (!forward) {
      spriteling.showSprite(2);
      this.set('sprite.action', 'jumpLeft');
    } else {
      spriteling.showSprite(11);
      this.set('sprite.action', 'jumpRight');
    }
    while (true) {
      this.decrementProperty('sprite.top', inc);
      yield timeout(8);
      top = get(this, 'sprite.top');
      set(this, 'sprite.top', top);
      document.getElementById("move-sprite").style.top = top + "px";
    }
  }),
  onMoveUp() {},
  onMoveDown() {},
  onMoveLeft() {},
  onMoveRight() {}
});
