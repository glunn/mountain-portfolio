import Component from '@ember/component';

export default Component.extend({
  keysPressed: [false,false,false,false],
  left: 50,
  top: 0,
  typedStrings: ["Ember apps.", "RESTful APIs.", "React components.", "SQL queries.", "automated tests with Selenium."],

  didRender: function() {
    this.$().attr({ tabindex: 1 });
    this.$().focus();
  },

  keyDown(event) {
    let left = this.get('left');
    let top = this.top;

    if (event.keyCode == 68) { // right
      left = left + 10;
      this.set('left', left);
      document.getElementById("moveDiv").style.left = left + "px";
    }
    if (event.keyCode == 65) { // left
      left = left - 10;
      this.set('left', left);
      document.getElementById("moveDiv").style.left = left + "px";
    }
    if (event.keyCode == 87) { // up
      top = top - 10;
      this.set('top', top);
      document.getElementById("moveDiv").style.top = top + "px";
    }
    if (event.keyCode == 83) { // down
      top = top + 10;
      this.set('top', top);
      document.getElementById("moveDiv").style.top = top + "px";
    }
  }
});
