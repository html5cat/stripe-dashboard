import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Customers from '../Customers';
import Charges from '../../Charges/Charges';

Meteor.publish('customers', function customers() {
  return Customers.find({}); //
});

Meteor.publish('customers.byTotalCharges', function customers() {
  return Customers.find({}, {sort: {totalCharges: -1}});
});
