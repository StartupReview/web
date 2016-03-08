'use strict';

const express = require('express');

const router = express.Router();

const mailchimpApi = require('./mailchimpApi');

router.post('/subscribe/:listId', (req, res, next) => {
  let listId = req.params.listId;

  mailchimpApi.subscribeToList(listId, {
    email: req.body.email
  }, function(err, response) {
    if (err) return next(err);

    return res.status(200).json(response);
  });
});

module.exports = router;
