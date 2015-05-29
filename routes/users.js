var express = require('express');
var mongoose = require('mongoose');

var User = require('../models/users');

var router = express.Router();

//Show all Authors
router.get('/', function(req, res){
	User.find(function(err, author){
		res.send(author);
	});
});

router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, author) {
    res.send({ book: book });
  });
});
    
router.post('/', function(req, res) {
  var author = new Author(req.body);
  User.save(function(err) {
    res.send({ author: author });
  });

});
    
router.put('/:id', function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, function(err, author) {
    res.send({ author: req.body });
  });
});

router.delete('/:id', function(req, res) {
  User.findById(req.params.id).remove(function(err) {
    res.sendStatus(200);
  });
});



module.exports = router;