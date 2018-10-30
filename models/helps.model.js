var mongoose = require('mongoose');


var help = mongoose.Schema({
  name: String,
  note: String,
  title: String,
  address: String,
  phone: String,
  email: String,
  password: String,
  location: String,
  state: String,
  country: String,
  info: {type: Boolean, default: true},
  startdate: Date,
  enddate: Date,
  verified: {type: Boolean, default: false}

});

// create the model for elections and expose it to our app
module.exports = mongoose.model('Help', help);