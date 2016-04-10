
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
        console.log('saint after POST', saint);
        renderSaint(saint);
      });
      $(this).trigger("reset");
    });

  //catches and handles the click event on a button that will add one church
    $('#saints').on('click', '.add-church', function(evt) {
      console.log("add-church button has been clicked");

      var currentSaintId = $(this).closest('.saint').data('saint-id');//uniqued id for each saint NOT song
      console.log('id',currentSaintId);
      //"use this to keep track of which album the modal is referring to at any time"
      $('#churchModal').data('saint-id', currentSaintId);
      $('#churchModal').modal();  // display the modal!
    });
    //save church modal save button
    $('#saveChurch').on('click', handleNewChurchSubmit);
});

/* this function takes a single saint and renders it to the page */
function renderSaint(saint) {
  console.log('rendering one:', saint);
  var saintHtml = $('#saint-template').html();
  var saintsTemplate = Handlebars.compile(saintHtml);
  var html = saintsTemplate(saint);
  $('#saints').append(html);
}

//call this when the button on the modal is clicked
//handle new church submit
function handleNewSongSubmit(evt) {
  evt.preventDefault();
  //define variables
  var $modal = $('#churchModal');
  var $churchNameField = $modal.find('#churchName');
  var $locationField = $modal.find('#location');
  var $urlField = $modal.find('#url');

  //get data from modal fields
  var dataToPost = {
    name: $churchNameField.val(),
    location: $locationField.val(),
    url: $urlField.val()
  };

  //get saintID to build the correct URL for the AJAX POST
  var saintId = $modal.data('saintId');
  console.log('retrieved churchName:', name, ' and location:', location, ' and url:', url, ' for saint w/ id:', url);

  //post to server
  var churchPostToServerUrl = '/api/saints/'+ saintId + '/churches';
  $.post(churchPostToServerUrl), dataToPost, function(data) {
    console.log('received data from post to /churches:', data);
    //clear form
    $churchNameField.val('');
    $locationField.val('');
    $urlField.val('');

    //close the modal
    $modal.modal('hide');
    // update the correct saint to show the new church
    $.get('/api/saints/' + saintId, function(data) {
      //remove the current instance of the saint from the page
      ('[data-saint-id=' + saintId + ']').remove();
      //re-render it with the new saint data (including churches)
      renderSaint(data);
      console.log("log the results pending server setup:", data);//this is pending testing, remove once it works
    });
  }).error(function(err) {
    console.log('post to /api/saints/:saintId/churches resulted in error', error);
});
}
