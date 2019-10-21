import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

function sendPress() {
  this.sendAction('press');
}

function sendRelease() {
  this.sendAction('release');
  let spriteling = get(this, 'sprite.spriteling');
  const currentSprite = spriteling.currentSprite();

  if (currentSprite < 7) {
    spriteling.play({
      run: 1,
      script: [
        { sprite: 3 },
        { sprite: 1 }]
    });
    this.set('sprite.action', 'standLeft');
  } else {
    spriteling.play({
      run: 1,
      script: [{ sprite: 12 }]
    });
    this.set('sprite.action', 'standRight');
  }
}

export default Component.extend({
  sprite: service(),
  tagName: 'button',
  classNames: 'key col-3',
  letter: '',
  touchStart: sendPress,
  mouseDown:  sendPress,
  touchEnd:   sendRelease,
  mouseLeave: sendRelease,
  mouseUp:    sendRelease
});