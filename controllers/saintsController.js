/************
 * DATABASE *
 ************/

var db = require('../models');

///////////////////

// GET /api/saints, get all saints from db
function index(req, res) {
  db.Saint.find({}, function (err, saints) {
    if(err) {
      return console.log("index error: ", err);
    }
    console.log("I'm sending you all the saints " +
    "from the database");
    res.json(saints);
  });
}


/* TODO: I would love to see a show route for your saints. I known it is slightly redundant, but it is good practice to be able to demonstrate all of hte CRUD actions -jc */

///////////////////

//POST /api/saints, get data from form submitted
function create(req, res) {
  /* make a quick saint object before putting it into our create db call */
  var newSaint = {
    name: req.body.name,
    patronSaintOf: req.body.patronSaintOf,
    feastDate: req.body.feastDate,
    birthplace: req.body.birthPlace,
    funFact: req.body.funFact,
    imageUrl: req.body.imageUrl,
  };


  /* make a dedicated Church object from the data we got from ajax */
  var newSaintChurch = new db.DedicatedChurch({
    name : req.body.dChurchName,
    location: req.body.dChurchLocation,
    url: req.body.dChurchUrl
  });

  /* call db.Saint.create and pass in the newSaint object we just made */
  db.Saint.create(newSaint, function(err, saint) {
    if (err) {
      console.log("create error: ", err);
    }
    //console.log("Sucess!!!!", saint);

    /* If we succeeded, then we push the dedicated church object into our new saint's dedicatedChurch array */
    saint.dedicatedChurches.push(newSaintChurch);

    /* Since we have changed our new Saint by adding a dedicatedChurch object to their array of dedicatedChurches, we need to save the newSaint. */
    saint.save(function(err, success) {
      if (err) { console.log("create error: ", err); }

      /* Everything is saintly, we can now send our new saint back to the front end */
      res.json(success);
    });
  });
}

///////////////////

//DELETE a saint in the database
function destroy(req, res) {
  //database remove saint by ID
  db.Saint.findOneAndRemove({ _id: req.params.saintId }, function(err, foundSaint){
    if (err) {
      console.log('destroy error: ', err);
    }
    res.json(foundSaint);
  });
}

//UPDATE/edit properties of a saint
function update(req, res) {

  /* TODO: try to keep req.body attributes out of your actual database callbacks by extracting them to a variable. Example:
      var newPatroSaintOf  = req.body.patronSaintOf;
      var newFunFact = req.body.funFact;
    This will make your code easier to read. -jc
  */
  console.log(req.body);
  db.Saint.findById(req.params.saintId, function(err, foundSaint) {
    if(err) {
      console.log('update error: ', error);
    }
    foundSaint.patronSaintOf = req.body.patronSaintOf;
     console.log(req.body.patronSaintOf);

    foundSaint.funFact = req.body.funFact;
     console.log(req.body.funfact);

    foundSaint.save(function(err, savedSaint) {
      if (err) {
        console.log('save error:', error);
      }
      res.json(savedSaint);
    });
  });
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  // show: show,
  destroy: destroy,
  update: update
};
