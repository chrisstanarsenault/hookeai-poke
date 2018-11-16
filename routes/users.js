"use strict";

const express = require('express');
const router  = express.Router();
var bodyParser = require('body-parser');


module.exports = (knex) => {
  router.post("/login", (req, res) => {
    // console.log(req.body.email);
    req.session.user_id = 'email@email.com';
    res.redirect('/');
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect('/');
  });
  return router;
};

