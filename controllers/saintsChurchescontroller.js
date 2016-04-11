var db = require('../models');


// POST '/api/saints/:saintId/churches', to create a new dedicated church   via popup modal
function create(req, res) {
  // extract the new church data from req and make a dedicatedChurch object out of it.
  var newDedicatedChurch = new db.DedicatedChurch({
    name: req.body.name,
    location: req.body.location,
    url: req.body.url
  });

  // find the saint in your db where we will  put the new church// this is ok
  db.Saint.findById(req.params.saintId, function(err, foundSaint) {
    if (err) {
      return console.log("error: ", err);
    }
    console.log("success, we are about to push the new church to the DB");
    //if we succeeded, push the new church into the saint's dedicatedChurches array
    foundSaint.dedicatedChurches.push(newDedicatedChurch);
    // save the saint since we changed it.
    foundSaint.save(function(err, savedSaint) {
      if (err) {
        console.log("error: ", err);
      }
      console.log('newDedicatedChurch created: ', savedSaint.dedicatedChurches);
      // send our newly changed saint back to the front end :)
      res.json(foundSaint);
    });
  });
}

module.exports = {
  create: create
};
