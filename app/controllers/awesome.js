import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  typedStrings: Object.freeze(["Ember apps.", "RESTful APIs.", "React components.", "SQL queries.", "automated tests with Selenium."])
});
