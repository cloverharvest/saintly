
/*hardcoded data*/

// var sampleSaints = [];
//
// sampleSaints.push({
//               name: "Joseph",
//               patronSaintOf: "Fathers",
//               feastDate: "March 19",
//               birthplace: "Bethlehem",
//               funFact: "He was a carpenter. He followed God's commands in handling the "+
//               "situation with Mary and going to Jerusalem to have Jesus circumcised and " +
//               "Mary purified after the birth of Jesus. We are told that " +
//               "He took his family to Jerusalem every year for Passover.",
//               imageUrl: "http://www.catholic.org/files/images/saints/stjoseph.jpg",
//               dedicatedChurches : {
//                 name: "St. Joseph Catholic Church",
//                  location: "Fremont, CA",
//                  url: "http://www.saintjosephmsj.org/"
//               }
//             });
//
// sampleSaints.push({
//             name: "St. Rita of Cascia",
//             patronSaintOf: "Hopeless Cases(Spain)",
//             feastDate: "May 22",
//             birthplace: "Roccaporena, Italy",
//             funFact: "St. Rita is often credited as also being the unofficial patron saint" +
//             "of baseball due to a reference made to her in the 2002 film The Rookie.",
//             imageUrl: "http://www.catholictradition.org/Cascia/rita-5a.jpg",
//             dedicatedChurches : {
//               name: "Basilica di Santa Rita",
//               location: "Cascia, Italy",
//               url: "http://www.santaritadacascia.org/"
//             }
//           });
//
// /*end of hardcoded data*/

$(document).ready(function() {
  console.log('app.js loaded!');
  //ajax call to get the hardcoded-saints in saintsController.js
  $.get('/api/saints').success(function (saints) {
    saints.forEach(function(saint) {
    console.log("saint", saint);
      renderSaint(saint);
    });
  });
  /*this listens for a form submission and then
  serializes all input from the ADD SAINT and its DETAILS form */
  $('#saint-form form').on('submit', function(evt) {
      evt.preventDefault();
      var formData = $(this).serialize();
      //app.js got data from front end
      console.log('this is serialized', formData);

      $.post('/api/saints', formData, function(saint) {
        console.log('saints after POST', saint);
        renderSaint(saint);
      });
      $(this).trigger("reset");
    });

    
});

/* this function takes a single saint and renders it to the page */
function renderSaint(saint) {
  console.log('rendering one:', saint);
  var saintHtml = $('#saint-template').html();
  var saintsTemplate = Handlebars.compile(saintHtml);
  var html = saintsTemplate(saint);
  $('#saints').append(html);
}

// //this function renders a new saint and details via POST
// function newSaintFormSuccess(saint) {
//   console.log('saint after POST', saint);
//   renderSaint(saint);
// }

// //this function logs an error message if new new saint and details via POST
// //was unsuccessful
// function newSaintFormError(saint) {
//   console.log("Sorry, wasn't able to add the new Saint Form");
// }
