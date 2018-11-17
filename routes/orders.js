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

  router.post("/getItemInformation", (req, res) => {
    console.log(req.body);
    var fullItem = JSON.parse(req.body.itemIds)
    var itemIds = Object.keys(fullItem)

    knex
      .select('id', 'name', 'price')
      .from('menu')
      // .where('menu.id', '=', req.query.itemIds)
      .then((results) => {
        var filteredResults = results.filter((item) => {
          return itemIds.indexOf(item.id.toString()) > -1;
        })
        console.log(results);

        res.json(filteredResults);
      })


  });

  router.get("/checkout", (req, res) => {
     knex
      .select('id', 'name', 'price')
      .from('menu')
      .then((results) => {
        console.log(results);
        const templateVars = {user: req.session.user_id,
                              menuNames: results}
        res.render('checkout', templateVars)
      });



  });

  router.post("/checkout", (req, res) => {
    console.log(req.body);

     knex
      .select('name')
      .from('menu')
      .where('menu.id', '=', itemId)
      .then((results) => {

        console.log(results);
          const templateVars = {user: req.session.user_id,
                                items: results}
          res.render('checkout', templateVars);
          })

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
