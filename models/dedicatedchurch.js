//models/dedicatedChurch.js
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
​
var DedicatedChurchSchema = new Schema ({
  name : String,
  location: String,
  url: String,
});
​
var DedicatedChurch = mongoose.model('DedicatedChurch', DedicatedChurchSchema);
module.exports = DedicatedChurch;
