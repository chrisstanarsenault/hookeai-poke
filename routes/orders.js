"use strict";
const HTTP    = require('http')
const express = require('express');
const router  = express.Router();

const accountSid = 'ACca11b83c4d9f2a84ea589e3cabd69c68';
const authToken = 'd9895972a326d1a84c4422af1c7d3fd8';

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

module.exports = (knex) => {
  //past orders



// select menu.name, order_items.quantity, menu.price from "order"
// join users on users.id = "order".user_id
// join order_items on "order".id = order_items.order_id
// join menu on menu.id = order_items.menu_id
// where users.id = 1;

  router.get("/checkout", (req, res) => {
    const templateVars = {user: req.session.user_id}
    res.render('checkout', templateVars);
  });

  router.get("/confirmation", (req, res) => {
    client.messages.create({
        //Send to resturant owner
        body: 'So and so just ordered some food from you!  Get it ready!!',
        to: '+16479200506', // Text this number
        from: '+16474933577' // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));

    const templateVars = {user: req.session.user_id}
    res.render('confirmation', templateVars);
  });

  //name, phone number, cardinfo (# & ccv), userid, order items, order quantity
  // router.post("/checkout", (req, res) => {

  // });

  router.get("/:id", (req, res) => {
    knex
      .select('menu.name', 'order_items.quantity', 'menu.price')
      .from('order')
      .join('users', 'users.id', '=', 'order.user_id')
      .join('order_items', 'order.id', '=', 'order_items.order_id')
      .join('menu', 'menu.id', '=', 'order_items.menu_id')
      .where('users.id', '=', req.params.id)
      .then((result) => {
        const templateVars = {order: result, user: req.session.user_id}
        console.log(templateVars);
        res.render('pastOrders', templateVars);
    });
  });

  return router;
};
