"use strict";

const express = require('express');
const router  = express.Router();
var bodyParser = require('body-parser');


module.exports = (knex) => {
  router.post("/login", (req, res) => {
    console.log(req.body.email);
    res.redirect('/');
  });
  return router;
};

