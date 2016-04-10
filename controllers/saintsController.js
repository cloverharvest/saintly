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
    console.log("i've deleted the hardcoded data and am sending you all saints" +
    "from the database back");
    res.json(saints);
  });
}

//POST /api/saints, data from form submitted
function create(req, res) {
  console.log('body', req.body);

// this splits at semicolon and removes trailing space??
  var dedicatedchurches = req.body.dedicatedChurches.split(',').map(function(item) { return item.trim(); } );
  console.log("line 61: ", dedicatedchurches);//this is showing as the way i entered in input in create error message
  req.body.dedicatedChurches = dedicatedchurches;

  db.Saint.create(req.body, function(err, saint) {
    console.log("saintsController line 64: i'm trying to send you a new saint from the database");
    if (err) { console.log("create error: ", err); }
    console.log("line 66", saint); //with the error, this is showing as undefined
    res.json(saint);
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
