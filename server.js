/**
 * Myron B. Thompson Academy Website
 * (c) 2015 Derrick Lord
 * License: MIT
 */

//Load Userland npm Modules
var path = require('path');
var qs = require('querystring');
var async = require('async');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var express = require('express');
var logger = require('morgan');
var jwt = require('jwt-simple');
var moment = require('moment');
var mongoose = require('mongoose');
var request = require('request');

//Load Custom Modules (Config/Lib/Models/Routes)
var config = require('./config');
var util = require('./lib/util.js');
var User = require('./models/users'); 
var Page = require('./models/pages');

var rootRoutes = require('./routes/root'); 
var authRoutes = require('./routes/auth');
var apiRoutes = require('./routes/api');
var pageRoutes = require('./routes/pages');
var userRoutes = require('./routes/users');

//Initialize Database
mongoose.connect(config.MONGO_URI);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});


//Initialize Express
var app = express();


//Configure Server Environment
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Force HTTPS on Heroku
if (app.get('env') === 'production') {
  app.use(function(req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}


//Configure Routes
app.use('/', rootRoutes);
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/page', pageRoutes);
app.use('/user', userRoutes);
app.use(express.static(path.join(__dirname, 'client')));


//Start Server listening on port 3000
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});