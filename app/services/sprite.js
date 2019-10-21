import Service from '@ember/service';
import Spriteling from 'spriteling';

export default Service.extend({
  spriteling: undefined,
  top: 0,
  left: 100,
  forward: true,
  action: 'standRight',

  init() {
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
    this.set('spriteling', sprite);
  }
});
