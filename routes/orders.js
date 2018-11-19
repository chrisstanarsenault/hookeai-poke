"use strict";
const express = require('express');
const router = express.Router();

const accountSid = 'ACca11b83c4d9f2a84ea589e3cabd69c68';
const authToken = 'd9895972a326d1a84c4422af1c7d3fd8';

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

module.exports = (knex) => {

  router.post("/getItemInformation", (req, res) => {
    console.log(req.body);
    var fullItem = JSON.parse(req.body.itemIds)
    var itemIds = Object.keys(fullItem)

    knex
      .select('id', 'name', 'price')
      .from('menu')
      .then((results) => {
        var filteredResults = results.filter((item) => {
          return itemIds.indexOf(item.id.toString()) > -1;
        })
        console.log(results);

        res.json(filteredResults);
      })
  });

  function getCartItems(items) {
    let cart = [];

    for (let key in items) {
      if (key.match(/menu_id/)) {
        let menu_id = key.replace(/menu_id/, "");
        let tmp = {
          menu_id: menu_id,
          quantity: items[key]
        };
        cart.push(tmp);
      }
    }
    return cart;
  }

  router.post("/checkout", (req, res) => {

    console.log(req.body);
    let cart = getCartItems(req.body);

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
            Promise.all(cart.map((item) => {
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

  router.get("/confirmation", (req, res) => {
    client.messages.create({
        //Send to resturant owner
        body: 'Poke bowls have been ordered!  Get it ready!!',
        to: '+16479200506', // Text this number
        from: '+16474933577' // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));

    const templateVars = {
      user: req.session.user_id,
      phone: req.body["phone-number"]
    }
    res.render('confirmation', templateVars);
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

        const templateVars = {order: result, user: req.session.user_id}

        console.log(templateVars);
        res.render('pastOrders', templateVars);
      });

  });
  return router;
};
