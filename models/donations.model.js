var mongoose = require('mongoose');


var donation = mongoose.Schema({
  date: {type: Date, default: Date.now()},
  to: String,
  toid: String,
  amount: Number,
  type: String,
  userid: String,
 
});

// create the model for elections and expose it to our app
module.exports = mongoose.model('Donation', donation);