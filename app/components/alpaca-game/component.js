import Component from '@ember/component';
import { get, set } from '@ember/object';
import $ from 'jquery';
import { inject as service } from '@ember/service';

export default Component.extend({
  sprite: service(),
  keyClass: '',

  didInsertElement() {
    this._super(...arguments);
    let spriteling = get(this, 'sprite.spriteling');
    set(this, 'sprite.spriteling', spriteling);
  },

  didRender() {
    this._super(...arguments);
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
    let top = get(this, 'sprite.top');
    let spriteling = get(this, 'sprite.spriteling');
    let action = get(this, 'sprite.action');
    let forward = get(this, 'sprite.forward');
    let left = get(this, 'sprite.left');
    let currentSprite = spriteling.currentSprite();

    if (event.keyCode == 68) { // right
      left = left + 10;
      set(this, 'sprite.left', left);

      if (action !== 'runRight' || currentSprite === 11) {
        spriteling.play('runRight', {
          run: -1,
          delay: 150,
        });
      }
      document.getElementById("move-sprite").style.left = left + "px";
      this.set('sprite.action', 'runRight');
      this.set('sprite.forward', true);
      this.set('keyClass', 'right');
    }

    if (event.keyCode == 65) { // left
      left = left - 10;
      set(this, 'sprite.left', left);

      if (action !== 'runLeft') {
        spriteling.play('runLeft', {
          run: -1,
          delay: 150
        });
      }
      document.getElementById("move-sprite").style.left = left + "px";
      this.set('sprite.action', 'runLeft');
      this.set('sprite.forward', false);
      this.set('keyClass', 'left');
    }

    if (event.keyCode == 87) { // up
      top = top - 10;
      // set(this, 'sprite.top', top);
      spriteling.next();

      if (!forward) {
        spriteling.showSprite(2);
        this.set('sprite.action', 'jumpLeft');
      } else {
        spriteling.showSprite(11);
        this.set('sprite.action', 'jumpRight');
      }
      document.getElementById("move-sprite").style.top = top + "px";
      this.set('sprite.top', top);
      this.set('keyClass', 'up');
    }

    if (event.keyCode == 83) { // down
      top = top + 10;
      set(this, 'sprite.top', top);
      this.set('keyClass', 'down');
      document.getElementById("move-sprite").style.top = top + "px";
    }
  },
  keyUp() {
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
    this.set('keyClass', '');
  }
});
