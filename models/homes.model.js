var mongoose = require('mongoose');


var home = mongoose.Schema({
  title: String,
  address: String,
  phone: String,
  email: String,
  lat: Number,
  lon: Number,
  location: String,
  state: String,
  country: String,
  verified: {type: Boolean, default: false}

});

// create the model for elections and expose it to our app
module.exports = mongoose.model('Home', home);