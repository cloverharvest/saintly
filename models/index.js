//something has to be here
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "mongodb://localhost/saintly");

module.exports.Saint = require('./saint');
module.exports.DedicatedChurch = require('./dedicatedchurch');
