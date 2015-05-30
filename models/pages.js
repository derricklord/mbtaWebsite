var mongoose = require('mongoose');
var User = require('./users');
var ObjectId = mongoose.Schema.ObjectId;

var pageSchema = new mongoose.Schema({
  slug: { type: String, unique: true, lowercase: true },
  title: String,
  body: String,
  isPublished: Boolean,
  isActive: Boolean,
  image: String,
  thumbnail: String,
  created_on: Date,
  created_by: {type: ObjectId, ref: 'User'},
});



module.exports = mongoose.model('Page', pageSchema);