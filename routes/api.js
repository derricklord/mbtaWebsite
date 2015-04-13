var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config');
var util = require('../lib/util.js');
var User = require('../models/users');



//Show all Authors
router.get('/me', util.ensureAuthenticated, function(req, res){
  User.findById(req.user, function(err, user) {
    res.send(user);
  });
}).put('/me', util.ensureAuthenticated, function(req, res){
  User.findById(req.user, function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    console.log(user);
    user.displayName = req.body.displayName || user.displayName;
    user.email = req.body.email || user.email;
    user.save(function(err) {
      res.status(200).end();
    });
  });
});


module.exports = router;