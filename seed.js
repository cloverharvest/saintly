
var db = require("./models");

var saintsList= [];

saintsList.push({
              name: "Mary Magdalene",
              patronSaintOf: "Penitent Sinners",
              feastDate: "July 22",
              birthplace: "unknown",
              funFact: "She is one of the greatest saints of " +
              "the Bible and a legendary example of God's mercy and grace. " +
              "Despite the scholarly dispute over her background, what she " +
              "did in her subsequent life, after meeting Jesus, is much more " +
              "significant. She was certainly a sinner whom Jesus saved, " +
              " giving us an example of how no person is beyond the saving " +
              " grace of God.",
              imageUrl: "https://drawmeafter.files.wordpress.com/2015/07/mary-magdalene1_pg.jpg",
              dedicatedChurches : {
                name: "St. Mary Magdalen Church",
                 location: "Berkeley, CA",
                 url: "http://marymagdalen.org/"
              }
            });

saintsList.push({
              name: "Joseph",
              patronSaintOf: "Fathers",
              feastDate: "March 19",
              birthplace: "Bethlehem",
              funFact: "He followed God's commands in handling the "+
              "situation with Mary. He was a compassionate husband to her and " +
              "and dedicated foster father to Jesus",
              imageUrl: "http://www.catholic.org/files/images/saints/stjoseph.jpg",
              dedicatedChurches : {
                name: "St. Joseph Catholic Church",
                location: "Fremont, CA",
                url: "http://www.saintjosephmsj.org/"
            }
          });

saintsList.push({
              name: "St. Rita of Cascia",
              patronSaintOf: "Hopeless Cases(Spain)",
              feastDate: "May 22",
              birthplace: "Roccaporena, Italy",
              funFact: "St. Rita is often credited as the unofficial patron saint " +
              "of baseball due to a reference made to her in the 2002 film The Rookie.",
              imageUrl: "http://www.catholictradition.org/Cascia/rita-5a.jpg",
              dedicatedChurches : {
                name: "Basilica di Santa Rita",
                location: "Cascia, Italy",
                url: "http://www.santaritadacascia.org/"
              }
            });

saintsList.push({
              name: "Dominic",
              patronSaintOf: "Astronomers and Hopeful Mothers",
              feastDate: "August 8",
              birthplace: "Calaruega, Spain",
              funFact: "Founder of the Order of Preachers. The spread of the Rosary is attributed to St. Dominic.",
              imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/24/The_Perugia_Altarpiece,_Side_Panel_Depicting_St._Dominic.jpg",
              dedicatedChurches : {
                name: "St. Dominic Parish",
                location: "Benicia, CA",
                url: "http://www.stdombenicia.org/"
              }
            });

saintsList.push({
                name: "Therese of Lisieux",
                patronSaintOf: "The Missions",
                feastDate: "October 1",
                birthplace: "Alencon, France",
                funFact: "Therese was known as the Little Flower but she had a will of steel." +
                " When the superior of the Carmelite convent refused to take Therese because " +
                "she was so young, the formerly shy little girl went to the bishop. When " +
                " the bishop also said no, she decided to go over his head, as well. ",
                imageUrl: "http://www.catholic.org/files/images/saints/therese.jpg",
                dedicatedChurches : {
                  name: "St.Therese of Lisieux Parish",
                  location: "Shelby Township, MI",
                  url: "http://www.stthereseparish.ws/"
                }
              });

saintsList.push({
                name: "Nicholas",
                patronSaintOf: "Bakers, pawnbrokers, and the falsely accused",
                feastDate: "December 6",
                birthplace: "Asia Minor",
                funFact: "Also known as Nikolaos of Myra. He gave up his inheritance " +
                "to save three girls who were to be sold as slaves.",
                imageUrl: "http://www.catholictradition.org/Children/saint-nicholas6.jpg",
                dedicatedChurches: {
                  name: "St. Nicholas Church",
                  location: "Los Altos, CA",
                  url: "http://stnickcc.org/"
                }
              });

saintsList.push({
                name: "Michael the Archangel",
                patronSaintOf: "Grocers, soldiers, doctors, mariners, paratroopers, police",
                feastDate: "September 29",
                birthplace: "",
                funFact: "Michael the Archangel isn't a saint, in the " +
                "literal sense, but rather he is an angel, and the leader of " +
                "all angels and of the army of God. This is what the title "+
                "Archangel means that he is above all the others in rank.",
                imageUrl: "http://www.catholic.org/files/images/saints/stmichaelthearchangel.jpg",
                dedicatedChurches: {
                  name: "St. Michael the Archangel Catholic Church",
                  location: "Cary, NC",
                  url: "http://www.stmichaelcary.org/"
                }
              });

// saintsList.push({
//                 name: "",
//                 patronSaintOf: "",
//                 feastDate: "",
//                 birthplace: "",
//                 funFact: "",
//                 imageUrl: "",
//                 dedicatedChurches: {
//                   name: "",
//                   location: "",
//                   url: ""
//                   }
//               });
//
// saintsList.push({
//                 name: "",
//                 patronSaintOf: "",
//                 feastDate: "",
//                 birthplace: "",
//                 funFact: "",
//                 imageUrl: "",
//                 dedicatedChurches: {
//                   name: "",
//                   location: "",
//                   url: ""
//                 }
//               });

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
