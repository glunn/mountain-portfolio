import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  poll: service(),

  // model() {
  //   return this.store.find('post');
  // },

  actions: {
    didTransition() {
      let pollFunction = () => Ember.$.ajax('/api/ping');
      let pollId = this.get('poll').addPoll({
        interval: 1000, // one second
        callback: pollFunction
      });

      this.set('pollId', pollId);
    },

    willTransition() {
      let pollId = this.get('pollId');
      this.get('poll').stopPoll(pollId);
    },

    onKeydown(e) {
      if (e.keyCode >= 37 && e.keyCode <= 40)
          keysPressed[e.keyCode - 37] = true;
      if (e.keyCode == 32)
          spacePressed = true;
    },
    onKeyup(e) {
      if (e.keyCode >= 37 && e.keyCode <= 40)
          keysPressed[e.keyCode - 37] = false;
      if (e.keyCode == 32)
          spacePressed = false;
    },
    updateKeys(e) {
      if (keysPressed[0])
          left -= speed;
      if (keysPressed[2])
          left += speed;
      if (keysPressed[1])
          top -= speed;
      if (keysPressed[3])
          top += speed;

      document.getElementById("moveDiv").style.left = left + "px";
      document.getElementById("moveDiv").style.top = top + "px";
      if (spacePressed)
        document.getElementById("show").style.display = "block";
      else
        document.getElementById("show").style.display = "none";
    }

  }
});
