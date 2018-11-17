"use strict";

require('dotenv').config();

const PORT              = process.env.PORT || 8080;
const ENV               = process.env.ENV || "development";
const HTTP              = require('http');
const express           = require("express");
const bodyParser        = require("body-parser");
const sass              = require("node-sass-middleware");
const cookieSession     = require("cookie-session");

const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app               = express();

const knexConfig        = require("./knexfile");
const knex              = require("knex")(knexConfig[ENV]);
const morgan            = require('morgan');
const knexLogger        = require('knex-logger');

// Seperated Routes for each Resource
const menuRoutes = require("./routes/menu");
const ordersRoutes = require("./routes/orders");
const usersRoutes = require("./routes/users");


// Setup for Trillio
const accountSid = 'ACca11b83c4d9f2a84ea589e3cabd69c68';
const authToken = 'd9895972a326d1a84c4422af1c7d3fd8';

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

let sendTexts = () => {
  client.messages.create({
      //Send to resturant owner
      body: 'So and so just ordered some food from you!  Get it ready!!',
      to: '+16479200506', // Text this number
      from: '+16474933577' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
}

//+16479193668;

app.use(bodyParser.urlencoded({
  extended: true
}));

//Webhooks - Restaurant responds with either Ready or Confirmed, and correct response message
app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

 if (req.body.Body == 'Ready') {
  //  twiml.redirect('http://3318f854.ngrok.io/sms/customer/ready');
   client.messages.create({
     body: 'Your order from Hookeai Poke is ready for pickup!  Go to location: 416 Leslie St to pick up and enjoy.',
     to: '+16479200506', // Text this number
     from: '+16474933577' // From a valid Twilio number
   })
     .then((message) => console.log(message.sid));
 } else if (req.body.Body == 'Confirmed') {
  //  twiml.redirect('http://3318f854.ngrok.io/sms/customer/confirmed');
   client.messages.create({
     body: 'Your order from Hookeai Poke has been recieved and being prepared!  You will be notified when ready.',
     to: '+16479200506', // Text this number
     from: '+16474933577' // From a valid Twilio number
   })
     .then((message) => console.log(message.sid));
 } else {
   twiml.message(
     'Derp, I dont understand what you said.  Please say either Confirmed or Ready.'
   );
 }

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

//if restaurant owner responds 'Confirmed', will sent this text to customer
app.post('/sms/customer/confirmed', (req, res) => {
  client.messages.create({
      body: 'Your order from Hookeai Poke has been recieved and being prepared!  You will be notified when ready.',
      to: '+16479200506', // Text this number
      from: '+16474933577' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
})

// if restaurant owner responds 'Ready', will send this text to customer
app.post('/sms/customer/ready', (req, res) => {
  client.messages.create({
      body: 'Your order from Hookeai Poke is ready for pickup!  Go to location: 416 Leslie St to pick up and enjoy.',
      to: '+16479200506', // Text this number
      from: '+16474933577' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
})


//function to send texts with trillio <---- comment out when not in use
// sendTexts()

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

//To set cookies
app.use(cookieSession({
  name: 'session',
  secret: 'keypass'
}));

app.set("view engine", "ejs");
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static("public"));

// Mount all resource routes
app.use("/menu", menuRoutes(knex));
app.use("/orders", ordersRoutes(knex));
app.use("/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  const templateVars = {user: req.session.user_id};
  res.render("main", templateVars);
});

HTTP.createServer(app).listen(8080, () => {
  console.log('Express server listening on port 8080');
});

// app.listen(PORT, () => {
//   console.log("Example app listening on port " + PORT);
// });
