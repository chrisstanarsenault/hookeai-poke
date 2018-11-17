"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("menu")
      .then((results) => {
        const templateVars = {menu: results, user: req.session.user_id};
        console.log(templateVars.price);
        res.render("menu",templateVars);
    });
  });
  return router;
};
