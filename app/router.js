import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('awesome', {path:'/'});
  this.route('awesome');
  this.route('alpaca');
});

export default Router;
