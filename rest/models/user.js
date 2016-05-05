
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var userSchema = new mongoose.Schema({
  id: String,
  location: Array,
  logo: Array,
  type: String,
  tags: Array,
  activity: Boolean,
  timestamp: Date
});

// Return model
module.exports = restful.model('Users', userSchema);
