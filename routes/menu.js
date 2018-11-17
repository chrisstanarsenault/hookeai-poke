"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("menu")
      .then((results) => {
        let templateVars = {menu: results, user: req.session.user_id}
        console.log(templateVars);
        res.render("menu",templateVars);
    });
  });


  router.get("/:id", (req, res) => {
    knex
      .select('menu.name', 'order_items.quantity', 'menu.price')
      .from('order')
      .then((result) => {
        const templateVars = {order: result, user: req.session.user_id}
        console.log(templateVars);
        res.render('pastOrders', templateVars);
    });
  });

  return router;
};
