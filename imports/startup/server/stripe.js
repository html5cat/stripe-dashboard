import { Meteor } from 'meteor/meteor';
import stripePackage from 'stripe';

import Charges from '../../api/Charges/Charges';
import Customers from '../../api/Customers/Customers';

const stripe = stripePackage(Meteor.settings.private. stripe.secret);

if(Charges.find({}).count() === 0) {
  paginateItems(null, Charges, 'charges');
}
if(Customers.find({}).count() === 0) {
  paginateItems(null, Customers, 'customers');
}


console.log(`Charges in the DB: ${Charges.find({}).count()}`);
console.log(`Customers in the DB: ${Customers.find({}).count()}`);


function paginateItems(lastId, collection, key) {
  var params = { limit: 100 };
  if (lastId !== null) { params['starting_after'] = lastId; }

  stripe[key].list(
    params,
    Meteor.bindEnvironment(
      function(err, results) {
        console.log(`*** Fetched ${results.data.length} ${key}.`);
        for (i = 0; i < results.data.length; i++){
          collection.insert(results.data[i]);
          console.log(`${key}:${results.data[i].id}`);
        }

        if (results.has_more) {
          paginateItems(results["data"][results["data"].length - 1].id, collection, key);
        } else {
          console.log(`*** Fetched all the ${key}.`);
          calculateTotalCharges();
        }
      }
    )
  )
}

function calculateTotalCharges() {
  const totalCharges = [];
  Charges.find({}).fetch().forEach((charge) => {
    if(totalCharges[charge.customer]) {
      totalCharges[charge.customer] += charge.amount;
    } else {
      totalCharges[charge.customer] = charge.amount;
    }
  });

  const customerList = Customers.find({}).fetch();

  customerList.forEach((customer) => {
    Customers.update({id: customer.id}, {$set: {
      'totalCharges': totalCharges[customer.id]
    }});
  })
}
