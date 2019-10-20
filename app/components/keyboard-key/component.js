import Component from '@ember/component';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

function sendPress() {
  console.log('send press');
  this.sendAction('press');
}

function sendRelease() {
  this.sendAction('release');
  let spriteling = get(this, 'sprite.spriteling');
  const currentSprite = spriteling.currentSprite();
  console.log(currentSprite);

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
  letter: '',
  touchStart: sendPress,
  mouseDown:  sendPress,
  touchEnd:   sendRelease,
  mouseLeave: sendRelease,
  mouseUp:    sendRelease
});