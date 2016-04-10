/************
 * DATABASE *
 ************/


/* hard-coded data */
// var saints = [];
// saints.push({
//               name: "Mary Magdalene",
//               patronSaintOf: "Penitent Sinners",
//               feastDate: "July 22",
//               birthplace: "unknown",
//               funFact: "Also known as Mary of Magdalen. She is one of the greatest saints of " +
//               "the Bible and a legendary example of God's mercy and grace. " +
//               "Despite the scholarly dispute over her background, what she " +
//               "did in her subsequent life, after meeting Jesus, is much more " +
//               "significant. She was certainly a sinner whom Jesus saved, " +
//               " giving us an example of how no person is beyond the saving " +
//               " grace of God.",
//               imageUrl: "https://drawmeafter.files.wordpress.com/2015/07/mary-magdalene1_pg.jpg",
//               dedicatedChurches : {
//                 name: "St. Mary Magdalen Church",
//                  location: "Berkeley, CA",
//                  url: "http://marymagdalen.org/"
//               }
//             });
// saints.push({
//               name: "Dominic",
//               patronSaintOf: "Astronomers and Hopeful Mothers",
//               feastDate: "August 8",
//               birthplace: "Calaruega, Spain",
//               funFact: "Founder of the Order of Preachers. The spread of the Rosary is attribute to St. Dominic.",
//               imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/24/The_Perugia_Altarpiece,_Side_Panel_Depicting_St._Dominic.jpg",
//               dedicatedChurches : {
//                 name: "St. Dominic Parish",
//                  location: "Benicia, CA",
//                  url: "http://www.stdombenicia.org/"
//               }
//             });

var db = require('../models');

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

//POST /api/saints, data from form submitted
function create(req, res) {
  // console.log('body', req.body);

  /* make a quick saint object before putting it into our create db call */
  var newSaint = {
    name: req.body.name,
    patronSaintOf: req.body.patronSaint,
    feastDate: req.body.feastDate,
    birthplace: req.body.birthPlace,
    funFact: req.body.funFact,
    imageUrl: req.body.imageUrl,
  }

  /* make a dedicated Church object from the data we got from ajax */
  var newSaintChurch = new db.DedicatedChurch({
    name : req.body.dChurchName,
    location: req.body.dChurchLocation,
    url: req.body.dChurchUrl
  });

  /* call db.Saint.create and pass in the newSaint object we just made */
  db.Saint.create(newSaint, function(err, saint) {
    if (err) { console.log("create error: ", err); }
    //console.log("Sucess!!!!", saint);

    /* If we succeeded, then we push the dedicated church object into our new saint's dedicatedChurch array */
    saint.dedicatedChurches.push(newSaintChurch);

    /* Since we have changed our new Saint by adding a dedicatedChurch object to their array of dedicatedChurches, we need to save the newSaint. */
    saint.save(function(err, success) {
      if (err) { console.log("create error: ", err); }
      //console.log('SUCCESSSS!!!', success);

      /* Everything is sainly, we can now send our new saint back to the front end */
      res.json(success);

    })
  });
}

function show(req, res) {
  // FILL ME IN !
}

function destroy(req, res) {
  // FILL ME IN !
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
