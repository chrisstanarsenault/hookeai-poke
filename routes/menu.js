"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("menu")
      .then((results) => {
        let templateVars = {menu: results}
        console.log(templateVars);
        res.render("menu",templateVars);
    });
  });
  return router;
};
