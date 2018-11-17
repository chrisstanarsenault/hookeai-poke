"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {
  router.post("/login", (req, res) => {
    req.session.user_id = req.body.email;
    res.redirect('/');
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect('/');
  });
  return router;
};

