var mongoose = require('mongoose');


var pageSchema = new mongoose.Schema({
  slug: { type: String, unique: true, lowercase: true },
  title: String,
  body: String,
  isPublished: Boolean,
  isActive: Boolean,
  image: String,
  thumbnail: String
});



module.exports = mongoose.model('Page', pageSchema);