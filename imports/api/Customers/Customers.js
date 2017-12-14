/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
// import SimpleSchema from 'simpl-schema';

const Customers = new Mongo.Collection('Customers');

Customers.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Customers.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export default Customers;
