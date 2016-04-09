//models/saints.js
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var DedicatedChurch = require('./dedicatedchurch');

var SaintSchema = new Schema ({
  name: String,
  patronSaintOf: String,
  feastDate: String,
  birthplace: String,
  funFact: String,
  imageUrl: String,
  dedicatedChurches : [DedicatedChurch.schema]
});

var Saint = mongoose.model('Saint', SaintSchema);
module.exports = Saint;
