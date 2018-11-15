"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  //past orders



// select menu.name, order_items.quantity, menu.price from "order"
// join users on users.id = "order".user_id
// join order_items on "order".id = order_items.order_id
// join menu on menu.id = order_items.menu_id
// where users.id = 1;

  router.get("/checkout", (req, res) => {
    res.render('checkout');
  });

  router.get("/confirmation", (req, res) => {
    res.render('confirmation');
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
        const templateVars = {order: result}
        console.log(templateVars);
        res.render('pastOrders', templateVars);
    });
  });

  return router;
};
