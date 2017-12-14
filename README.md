# Stripe account dashboard

## Run locally
1. Install Meteor https://www.meteor.com/install
2. `npm install`
3. `npm start`
4. Visit http://localhost:3000/

## Notes

I started with the idea of making a simple client-side only create-react-app but quickly realized that publishable key only gets us the payment functionality.

Best developer experience for building, and more importantly sharing, client-side app and server-side app is still Meteor. Curious if next.js would work – at a glance it didn't seem so.

It took quite a bit to catchup on the latest state of Meteor and how it plays with React, finding best boilerplate starter kit. On the bright side – there's a ton of extra features already built in now.

## How it works

1. On server startup query Stripe API to get the latest list of charges and customers and put them in Mongo (in production, this would need to be done either regularly or via webhooks for new charges)
2. Calculate total charges per customer and update Customers collection
3. Dashboard has two pages:
  * Key stats and Top 10 Customers
  * List of all charges for reference
4. Viewing dashboard requires an account (you can sign-up with any valid email)

My assumptions were:
* Make as few API requests as possible
* Have login system to protect private info

For Key commerce metrics I chose total charges and best referral channel.

More interesting code files:
* [./imports/startup/server/stripe.js]()
* [./imports/ui/pages/Customers/Customers.js]()
* [./imports/ui/pages/Charges/Charges.js]()

Cheers!

## Credits
Uses Meteor 1.5, [Pup](http://cleverbeagle.com/pup) boilerplate and several community packages.
