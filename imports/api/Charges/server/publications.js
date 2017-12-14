import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Charges from '../Charges';

Meteor.publish('charges', function charges(item) {
  return Charges.find({});
});
