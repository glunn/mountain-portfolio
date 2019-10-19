import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  classNames: ['keyboard-keys-component'],
  alpacaSprite: undefined,
  top: 0,
  left: 100,
  forward: false,
  spriteScript: undefined,
  sprite: undefined,
  forward: true,
  onClickLeft: task(function * (inc) {
    const sprite = this.sprite;
    const spriteScript = this.spriteScript;
    let forward = this.forward;
    let left = this.left;

    sprite.play('runLeft', {
      run: -1,
      delay: 150
    });
    this.set('spriteScript', 'runLeft');
    this.set('forward', true);

    while (true) {
      this.decrementProperty('left', inc);
      yield timeout(8);
      left = this.left;
      this.set('left', left);
      document.getElementById("move-sprite").style.left = left + "px";
    }
  }),
  onClickRight: task(function * (inc) {
    const sprite = this.sprite;
    const spriteScript = this.spriteScript;
    let forward = this.forward;
    let left = this.left;

    sprite.play('runRight', {
      run: -1,
      delay: 150
    });
    this.set('spriteScript', 'runRight');
    this.set('forward', false);

    while (true) {
      this.incrementProperty('left', inc);
      yield timeout(8);
      left = this.left;
      this.set('left', left);
      document.getElementById("move-sprite").style.left = left + "px";
    }
  }),
  onClickDown: task(function * (inc) {
    let top = this.top;
    while (true) {
      this.incrementProperty('top', inc);
      yield timeout(8);
      top = this.top;
      this.set('top', top);
      document.getElementById("move-sprite").style.top = top + "px";
    }
  }),
  onClickUp: task(function * (inc) {
    const sprite = this.sprite;
    let forward = this.forward;
    let top = this.top;
    sprite.next();

    if (forward) {
      sprite.showSprite(2);
      this.set('spriteScript', 'jumpLeft');
    } else {
      sprite.showSprite(11);
      this.set('spriteScript', 'jumpRight');
    }
    while (true) {
      this.decrementProperty('top', inc);
      yield timeout(8);
      top = this.top;
      this.set('top', top);
      document.getElementById("move-sprite").style.top = top + "px";
    }
  }),
  onMoveUp() {},
  onMoveDown() {},
  onMoveLeft() {},
  onMoveRight() {}
});
