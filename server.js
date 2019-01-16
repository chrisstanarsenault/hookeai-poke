"use strict";

require('dotenv').config();

const PORT              = process.env.PORT || 8080;
const ENV               = process.env.ENV || "development";
const HTTP              = require('http');
const express           = require("express");
const bodyParser        = require("body-parser");
const sass              = require("node-sass-middleware");
const cookieSession     = require("cookie-session");

const app               = express();

const knexConfig        = require("./knexfile");
const knex              = require("knex")(knexConfig[ENV]);
const morgan            = require('morgan');
const knexLogger        = require('knex-logger');

// Seperated Routes for each Resource
const menuRoutes = require("./routes/menu");
const ordersRoutes = require("./routes/orders");
const usersRoutes = require("./routes/users");
const smsRoutes = require("./routes/sms");


app.use(bodyParser.urlencoded({
  extended: true
}));

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
app.use("/sms", smsRoutes(knex));

// Home page
app.get("/", (req, res) => {
  const templateVars = {user: req.session.user_id};
  res.render("main", templateVars);
});

HTTP.createServer(app).listen(PORT, () => {
  console.log('Express server listening on port 8080');
});

// app.listen(PORT, () => {
//   console.log("Example app listening on port " + PORT);
// });
