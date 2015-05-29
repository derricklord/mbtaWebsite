var express = require('express');
var mongoose = require('mongoose');

var config = require('../config');
var util = require('../lib/util.js');

var User = require('../models/users');
var Page = require('../models/pages');

var router = express.Router();

//Show all Authors
router.get('/test', util.ensureAuthenticated, function(req, res){
  var students = [
    {
     name: 'John Doe',
     age: 5,
     grade: 'K',
     url: 'http://www.google.com'
    },
    {
     name: 'Jane Doe',
     age: 5,
     grade: 'K',
     url: 'http://www.yahoo.com'
    },
    {
     name: 'Mark Twain',
     age: 6,
     grade: '1',
     url: 'http://www.dogpile.com'
    }    
  ];
  res.send({students:students});
});

router.get('/users',  function(req, res){
    User.find({}, function(err, users){
      res.send(users);
    });
});


module.exports = router;