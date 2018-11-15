"use strict";

const express = require('./express');
const router = express.Router();
const helperFunc = require('../util/helper-functions');

module.exports = knex => {
  router.post('/', (req, res) => {
    if(!req.body.text){
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }


      .then((results)=> {
        res.json(results);
      })
  });
  return router;
};

//name, phone number, credit card # and ccv (& possibly email)
