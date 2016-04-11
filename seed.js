
var db = require("./models");
//
// var saintsList= [];
//
// saintsList.push({
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
//
// saintsList.push({
//               name: "Joseph",
//               patronSaintOf: "Fathers",
//               feastDate: "March 19",
//               birthplace: "Bethlehem",
//               funFact: "He was a carpenter. He followed God's commands in handling the "+
//               "situation with Mary and going to Jerusalem to have Jesus circumcised and " +
//                           "Mary purified after the birth of Jesus. We are told that " +
//                           "He took his family to Jerusalem every year for Passover.",
//                           imageUrl: "http://www.catholic.org/files/images/saints/stjoseph.jpg",
//                           dedicatedChurches : {
//                             name: "St. Joseph Catholic Church",
//                              location: "Fremont, CA",
//                              url: "http://www.saintjosephmsj.org/"
//                           }
//                         });
//
//             saintsList.push({
//                         name: "St. Rita of Cascia",
//                         patronSaintOf: "Hopeless Cases(Spain)",
//                         feastDate: "May 22",
//                         birthplace: "Roccaporena, Italy",
//                         funFact: "St. Rita is often credited as also being the unofficial patron saint" +
//                         "of baseball due to a reference made to her in the 2002 film The Rookie.",
//                         imageUrl: "http://www.catholictradition.org/Cascia/rita-5a.jpg",
//                         dedicatedChurches : {
//                           name: "Basilica di Santa Rita",
//                           location: "Cascia, Italy",
//                           url: "http://www.santaritadacascia.org/"
//                         }
//                       });
// saintsList.push({
//               name: "Dominic",
//               patronSaintOf: "Astronomers and Hopeful Mothers",
//               feastDate: "August 8",
//               birthplace: "Calaruega, Spain",
//               funFact: "Founder of the Order of Preachers. The spread of the Rosary is attributed to St. Dominic.",
//               imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/24/The_Perugia_Altarpiece,_Side_Panel_Depicting_St._Dominic.jpg",
//               dedicatedChurches : {
//                 name: "St. Dominic Parish",
//                  location: "Benicia, CA",
//                  url: "http://www.stdombenicia.org/"
//               }
//             });

//
// var sampleChurches = [];
//
// sampleChurches.push({ name: "St. Mary Magdalen Church",
//                       location: "Camarillo, CA",
//                       url: "http://www.smmcam.org/"
// });
// sampleChurches.push({ name: "Church of St. Mary Magdalene",
//                       location: "San Diego, CA",
//                       url: "http://www.stmarymagonline.org/"
// });


// populate each Saint's church list
// saintsList.forEach(function(saint) {
//   saint.dedicatedChurches = sampleChurches;
// });

db.Saint.remove({}, function(err, saints){

  db.Saint.create(saintsList, function(err, saints){
    if (err) {
      return console.log('ERROR', err);
    }
    console.log("all saints:", saints);
    console.log("created", saints.length, "saints");
    process.exit();
  });

});
