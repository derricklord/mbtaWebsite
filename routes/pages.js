var express = require('express');
var mongoose = require('mongoose');
var config = require('../config');
var util = require('../lib/util.js');
var Page = require('../models/pages');

var router = express.Router();

//Show all Pages
router.get('/', function(req, res){
    
    Page.find({})
        .populate('created_by', 'displayName _id')
        .exec(function(err, pages){
		res.send({pages:pages});
    });
});



router.get('/:slug',  function(req, res) {
  Page.findOne({slug: req.params.slug}, function(err, page) {
    if(page){  
        res.send({ page: page });
    }else{
        var message = {
            title: '404!',
            slug:'',
            body:'<h1> Page Not Found!!!</h1>'    
        }
        res.send({page: message});
    }
  });
});

router.post('/', util.ensureAuthenticated, function(req, res) {
  var page = new Page(req.body);
  page.save(function(err) {
    res.send({ page: page });
  });
});

router.put('/:id', util.ensureAuthenticated, function(req, res) {
  Page.findByIdAndUpdate(req.params.id, req.body, function(err, page) {
    res.send({ page: req.body });
  });
});
    
router.delete('/:id', util.ensureAuthenticated, function(req, res) {
  Page.findById(req.params.id).remove(function(err) {
    res.sendStatus(200);
  });
});

//Show all User's Pages
router.get('/:id/list', function(req, res){
    Page.find({created_by: req.params.id})
        .populate('created_by', 'displayName _id')
        .exec(function(err, pages){
		res.send({pages:pages});
    });
});

module.exports = router;