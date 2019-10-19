import DS from 'ember-data';
const { Model } = DS;
import attr from 'ember-data/attr';

export default Model.extend({
  forward: attr('boolean', { defaultValue: false }),
  left: attr('number'),
  top: attr('number')
});
