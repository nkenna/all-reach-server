var mongoose = require('mongoose');


var user = mongoose.Schema({
  firstname: String,
  middlename: String,
  lastname: String,
  address: String,
  phone: String,
  email: String,
  password: String,
  location: String,
  state: String,
  country: String,
  nature: String,
  num_donations: {type: Number, default: 0}

});

// create the model for elections and expose it to our app
module.exports = mongoose.model('User', user);