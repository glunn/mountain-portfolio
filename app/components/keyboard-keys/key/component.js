import Component from '@ember/component';

function sendPress() {
  console.log('send press');
  this.sendAction('press');
}

function sendRelease() {
  console.log('send release');
  this.sendAction('release');
  const sprite = this.sprite;
  const currentSprite = sprite.currentSprite();

  if (currentSprite < 7) {
    sprite.play({
      run: 1,
      script: [
        { sprite: 3 },
        { sprite: 1 }]
    });
    this.set('spriteScript', 'standLeft');
    this.set('sprite', sprite);
  } else {
    sprite.play({
      run: 1,
      script: [{ sprite: 12 }]
    });
    this.set('spriteScript', 'standRight');
    this.set('sprite', sprite);
  }
}

export default Component.extend({
  tagName: 'button',
  letter: '',
  sprite: undefined,
  spriteScript: undefined,
  touchStart: sendPress,
  mouseDown:  sendPress,
  touchEnd:   sendRelease,
  mouseLeave: sendRelease,
  mouseUp:    sendRelease
});
