require('dotenv').config()
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.listen(3000);

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/about', function(req, res){
   res.render('pages/about');
});

app.get('/mission', function(req, res){
  res.render('pages/mission');
});

app.get('/location', function(req, res){
  res.render('pages/location');
});

// Stripe imports & config
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const stripe = require("stripe")(keySecret);
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Stripe GET & POST routes
app.get("/store", (req, res) =>
  res.render("pages/store", {keyPublishable}));

app.post("/charge", (req, res) => {
  let amount = 500;
   console.log(req);

  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken,
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
         currency: "usd",
         customer: customer.id,
         metadata: {'product': req.body['product']}
    }))
  .then(charge => res.render("pages/charge"));
});
