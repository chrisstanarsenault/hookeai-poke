"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {
  //past orders

  router.post("/checkout", (req, res) => {

    // *** After Merged ***
    // Cart = req.body.cart;

    // test obj
    let Cart = [{
      quantity: 2,
      menu_id: 1
    }, {
      quantity: 1,
      menu_id: 2
    }, {
      quantity: 5,
      menu_id: 3
    }];

    knex.insert([{
          name: req.body["email"],
          phone: req.body["phone-number"]
        }], "id").into('users')
        .then((results) => {
          return results[0];
        })
        .then((user_id) => 
          knex.insert([{
            card: req.body["card-num"],
            expiry: req.body["ex-month"]+"/"+req.body["ex-year"],
            ccv: req.body["cvv"],
            user_id: user_id
          }], "user_id").into('payment')
          .then((results) => {
            return results[0];
          })
          .then((user_id) =>
            knex.insert([{
              user_id: user_id,
            }], "id").into('order')
          )
          .then((results) => {
            return results[0];
          })
          .then((order_id) => {  
            Promise.all(Cart.map((item) => {
              return knex.insert([{
                order_id: order_id,
                menu_id: item.menu_id,
                quantity: item.quantity,
        
              }]).into('order_items')
            }))
          })
        )

      res.redirect('/orders/confirmation');
  });


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
  
  router.get("/:id", (req, res) => {
    knex
      .select('menu.name', 'order_items.quantity', 'menu.price')
      .from('order')
      .join('users', 'users.id', '=', 'order.user_id')
      .join('order_items', 'order.id', '=', 'order_items.order_id')
      .join('menu', 'menu.id', '=', 'order_items.menu_id')
      .where('users.id', '=', req.params.id)
      .then((result) => {

        const templateVars = {
          order: result
        }
        console.log(templateVars);
        res.render('pastOrders', templateVars);
      });

  });

  return router;
};
