"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/login", (req, res) => {
    res.render("login");
  });
};

