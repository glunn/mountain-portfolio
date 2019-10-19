import Component from '@ember/component';
import Spriteling from 'spriteling';
import $ from 'jquery';

export default Component.extend({
  alpacaSprite: undefined,
  spriteScript: '',
  forward: false,
  left: 100,
  top: 0,
  direction: undefined,

  didInsertElement() {
    this._super(...arguments);

    const sprite = new Spriteling({
       url: '/img/alpaca_spritesheet.png',
       cols: 12,
       rows: 1,
       startSprite: 12,
       tempo: .5,
     }, '#sprite');
    sprite.addScript('runLeft', [
       { sprite: 3 },
       { sprite: 4 },
       { sprite: 5 },
       { sprite: 6 }
    ]);
    sprite.addScript('runRight', [
      { sprite: 7 },
      { sprite: 8 },
      { sprite: 9 },
      { sprite: 10 }
    ]);
    this.set('alpacaSprite', sprite);
  },
  didRender() {
    // Only focus if game key pressed, then turn off listener
    $(document).on('keydown', function (event) {
      if (event.keyCode == 68 || event.keyCode == 65 || event.keyCode == 87 || event.keyCode == 83) {
        $('#move-sprite').attr({ tabindex: 1 });
        $('#move-sprite').focus();
        //$(this).off(event);
      }
    });
  },

  keyDown(event) {
    const sprite = this.alpacaSprite;
    const spriteScript = this.spriteScript;
    let forward = this.forward;
    let left = this.left;
    let top = this.top;
    const currentSprite = sprite.currentSprite();

    if (event.keyCode == 68) { // right
      left = left + 10;
      this.set('left', left);

      if (spriteScript !== 'runRight' || currentSprite === 11) {
        sprite.play('runRight', {
          run: -1,
          delay: 150,
        });
      }

      document.getElementById("move-sprite").style.left = left + "px";
      this.set('spriteScript', 'runRight');
      this.set('forward', false);
    }
    if (event.keyCode == 65) { // left
      left = left - 10;
      this.set('left', left);

      if (spriteScript !== 'runLeft') {
        sprite.play('runLeft', {
          run: -1,
          delay: 150
        });
      }
      document.getElementById("move-sprite").style.left = left + "px";
      this.set('spriteScript', 'runLeft');
      this.set('forward', true);
    }
    if (event.keyCode == 87) { // up
      top = top - 10;
      this.set('top', top);
      sprite.next();

      if (forward) {
        sprite.showSprite(2);
        this.set('spriteScript', 'jumpLeft');
      } else {
        sprite.showSprite(11);
        this.set('spriteScript', 'jumpRight');
      }

      document.getElementById("move-sprite").style.top = top + "px";
    }
    if (event.keyCode == 83) { // down
      top = top + 10;
      this.set('top', top);

      document.getElementById("move-sprite").style.top = top + "px";
    }
  },
  keyUp() {
    const sprite = this.alpacaSprite;
    const currentSprite = sprite.currentSprite();

    if (currentSprite < 7) {
      sprite.play({
        run: 1,
        script: [
          { sprite: 3 },
          { sprite: 1 }]
      });
      this.set('spriteScript', 'standLeft');
    } else {
      sprite.play({
        run: 1,
        script: [{ sprite: 12 }]
      });
      this.set('spriteScript', 'standRight');
    }
    this.set('alpacaSprite', sprite);
  }
});
