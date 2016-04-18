var db = require('../models');


// POST '/api/saints/:saintId/churches', to create a new dedicated church via popup modal
function create(req, res) {
  // extract the new church data from req and make a dedicatedChurch object out of it.
  var newDedicatedChurch = new db.DedicatedChurch({
    name: req.body.name,
    location: req.body.location,
    url: req.body.url
  });

  /* TODO: exract your saintId from your params and store it in a variable for easy code reading -jc */
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
      /* TODO: send the savedSaint (with the new dedicatedChurch object) instead of the foundSaint (which is old and outdated) -jc */
      res.json(foundSaint);
    });
  });
}

/* TODO: can you add a destroy to remove churches? -jc */

module.exports = {
  create: create
};
