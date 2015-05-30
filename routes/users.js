var express = require('express');
var mongoose = require('mongoose');

var User = require('../models/users');

var router = express.Router();


router.get('/', function(req, res){
	User.find(function(err, user){
		res.send(user);
	});
});

router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    res.send({ user: onmouseover });
  });
});
    
router.post('/', function(req, res) {
  var user = new User(req.body);
  User.save(function(err) {
    res.send({ user: user });
  });

});
    
router.put('/:id', function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
    res.send({ user: req.body });
  });
});

router.delete('/:id', function(req, res) {
  User.findById(req.params.id).remove(function(err) {
    res.sendStatus(200);
  });
});



module.exports = router;