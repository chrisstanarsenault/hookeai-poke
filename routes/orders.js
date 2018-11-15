"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("order")
      .join('order_items', 'order.id', '=', 'order_items.order_id')
      .join('menu', 'menu.id', '=', 'order_items.menu_id')
      .then((results) => {
        console.log(results);
        res.json(results);
    });
  });
  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("order")
      .join('order_items', 'order.id', '=', req.params.id)
      .join('menu', 'menu.id', '=', 'order_items.menu_id')
      .then((results) => {
        console.log(results);
        res.json(results);
    });
  });
  router.get("/checkout", (req, res) => {
    knex
      .select("*")
      .from("order")
      .join('order_items', 'order.id', '=', 'order_items.order_id')
      .join('menu', 'menu.id', '=', 'order_items.menu_id')
      .then((results) => {
        console.log(results);
        res.json(results);
    });
  });
  router.get("/confirmation", (req, res) => {
    knex
      .select("*")
      .from("order")
      .join('order_items', 'order.id', '=', 'order_items.order_id')
      .join('menu', 'menu.id', '=', 'order_items.menu_id')
      .then((results) => {
        console.log(results);
        res.json(results);
    });
  });
  return router;
};
