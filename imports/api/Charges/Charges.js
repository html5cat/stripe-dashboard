/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
// import SimpleSchema from 'simpl-schema';

const Charges = new Mongo.Collection('Charges');

Charges.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Charges.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export default Charges;
