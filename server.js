const keyPublishable = 'pk_test_m78JBijSO9D9GjZiyPhwbkNR003MoahjvF';
const keySecret = 'sk_test_OYl37K5absZ5b5TH4jfbo6kH00DbbiNr4q';
const express = require ('express');
const bodyParser = require ('body-parser');
const cookieParser = require('cookie-parser');
const stripe = require("stripe")(keySecret);
const pug = require('pug');
const path = require('path');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())

app.set('view engine','pug');
app.use(express.static('public'));

app.post('/address', (req, res) => res.status(204).send());

app.post('/charge', function(req, res) {
    var stripeToken = req.body.stripeToken;
      var charge = stripe.charges.create({
      amount: req.body.finalPrice, // amount in cents, again
      currency: "usd",
      source: stripeToken,
      description: req.body.name+req.body.phone+req.body.order+req.body.address+req.body.city+req.body.state+req.body.zipcode
    }, function(err, charge) {
      if (err && err.type === 'StripeCardError') {
             }
                });
  charge.then(function(result) {
          res.render('ordersuccess')
    })
 });

app.listen(3000,()=>{console.log("The application is running on port 3000");
}); 