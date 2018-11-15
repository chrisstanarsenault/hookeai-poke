"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  // router.get("/", (req, res) => {
  //   knex
  //     .select("*")
  //     .from("order")
  //     .join('order_items', 'order.id', '=', 'order_items.order_id')
  //     .join('menu', 'menu.id', '=', 'order_items.menu_id')
  //     .then((results) => {
  //       console.log(results);
  //       res.json(results);
  //   });
  // });

  //past orders
  // router.get("/:id", (req, res) => {
  //   knex
  //     .select("*")
  //     .from("order")
  //     .join('order_items', 'order.id', '=', 'order_items.order_id')
  //     .join('users', 'users.id', '=', req.params.id)
  //     .join('menu', 'menu.id', '=', 'order_items.menu_id')
  //     .then((results) => {
  //       console.log(results);
  //       res.json(results);
  //   });
  // });

  //name, phone number, cardinfo (# & ccv), userid, order items, order quantity
  router.get("/checkout", (req, res) => {
    res.render('checkout');
  });

  router.get("/confirmation", (req, res) => {
  res.render('confirmation');
  });
  return router;
};
