https://stripe.com/docs/checkout/tutorial

Embedding Checkout in your site looks like this (don't include it yet):
_______________________________________________________

<form action="/your-server-side-code" method="POST">
  <script
    src="https://checkout.stripe.com/checkout.js" class="stripe-button"
    data-key="pk_test_yyEx3ZL7QcdWSh4jLOpWSQi2"
    data-amount="999"
    data-name="BeanDust Espresso"
    data-description="Widget"
    data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
    data-locale="auto">
  </script>
</form>
_______________________________________________________

https://stripe.com/docs/checkout/express

Using Checkout and Express:

Step 1: Install and configure dependencies_______________________________________________________

$ npm install stripe express

$ npm install dotenv --save

$ npm install body-parser

>>>>>>>>>>>>>>>>>>>app.js<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


require('dotenv').config()

// Stripe imports & config
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const stripe = require("stripe")(keySecret);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



Step 2: Create Express routes______________________________________

>>>>>>>>>>>>>>>>>>>>>>>app.js<<<<<<<<<<<<<<<<<<<<<<<<


// Stripe GET & POST routes
app.get("/store", (req, res) =>
  res.render("pages/store", {keyPublishable}));

app.post("/charge", (req, res) => {
  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken,
  })
  .then(customer =>
    stripe.charges.create({
      amount: parseInt(req.body['amount']),
      description: req.body['product'],
         currency: "usd",
         customer: customer.id,
         metadata: {'product': req.body['product']}
    }))
  .then(charge => res.render("pages/charge"));
});



Step 3: Create the view templates____________________________________

>>>>>>>>>>>>>>>>index.ejs<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Store</title>
    <script src="https://js.stripe.com/v3/"></script>
  </head>
  <body>
    <div>
      <form action="/charge" method="POST">
        <input type='hidden' name='product' value='1 lb. Coffee Beans' />
        <input type='hidden' name='amount' value='2500' />
        <label>Amount: $25.00</label><br>
        <script
        src="https://checkout.stripe.com/v2/checkout.js" class="stripe-button"
        data-key="pk_test_yyEx3ZL7QcdWSh4jLOpWSQi2"
        data-key=keyPublishable,
        data-amount="2500"
        data-name="BeanDust"
        data-description="1 lb. Coffee Beans"
        data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
        data-locale="auto"
        data-zip-code="true">
        </script>
      </form>
    </div>
  </body>
</html>

>>>>>>>>>>>>>>>>charge.ejs<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

<h1>Your payment has been accepted! Thank you for your BeanDusty business!<h1>

Step 4: Set up .env___________________________________________

>>>>>>>>>>>>>>>>>>>>>>>>.gitignore<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

.env

>>>>>>>>>>>>>>>>>>>>>.env<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

PUBLISHABLE_KEY = pk_test_yyEx3ZL7QcdWSh4jLOpWSQi2
SECRET_KEY = sk_test_x9YhZOtAQh4j3QmXlHOyYjR2

Step 5: Include packages_____________________________________
>>>>>>>>>>>>>>>>>>>>>>>>>>package.json<<<<<<<<<<<<<<<<<<<<

"main": "server.js",
"dependencies": {
  "express":"",
  "stripe":"",
  "body-parser":"",
  "pug":""
}
