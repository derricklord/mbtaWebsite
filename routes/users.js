var express = require('express');
var mongoose = require('mongoose');

var User = require('../models/users');

var router = express.Router();

//Show all Authors
router.get('/', function(req, res){
	Author.find(function(err, author){
		res.send(author);
	});
}).get('/:id', function(req, res) {
  Author.findById(req.params.id, function(err, author) {
    res.send({ book: book });
  });
}).post('/', function(req, res) {
  var author = new Author(req.body);
  author.save(function(err) {
    res.send({ author: author });
  });

}).put('/:id', function(req, res) {
  Author.findByIdAndUpdate(req.params.id, req.body, function(err, author) {
    res.send({ author: req.body });
  });
}).delete('/:id', function(req, res) {
  Author.findById(req.params.id).remove(function(err) {
    res.sendStatus(200);
  });
});



module.exports = router;