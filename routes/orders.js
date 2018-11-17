"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/checkout", (req, res) => {
    const templateVars = {user: req.session.user_id}
    res.render('checkout', templateVars);
  });

  router.get("/confirmation", (req, res) => {
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
