

$(document).ready(function() {
  console.log('app.js loaded!');
  //ajax call to get the hardcoded-saints in saintsController.js
  $.get('/api/saints').success(function (saints) {
    saints.forEach(function(saint) {
      renderSaint(saint);
    });
  });


/////////////////////////////

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

/////////////////////////////

//TO ADD ONE CHURCH and its DETAILS

  //catches and handles the click event on a button that will add one church and its details
    $('#saints').on('click', '.add-church', function(evt) {
      console.log("add-church button has been clicked");

      var currentSaintId = $(this).closest('.saint').data('saint-id');//uniqued id for each saint
      console.log('id', currentSaintId);
      //use this to keep track of which saint the modal is referring to at any time
      $('#churchModal').data('saint-id', currentSaintId);
      $('#churchModal').modal();  // display the modal!
    });
    //save a new church
    $('#saveChurch').on('click', handleNewChurchSubmit);
    //
    //delete a saint
    $('#saints').on('click', '.delete-saint', handleDeleteSaintClick);
    //edit a saint
    $('#saints').on('click', '.edit-saint', handleSaintEditClick);
    //save the changes to a saint
    $('#saints').on('click', '.edit-saint', handleSaveSaintChangesClick);


  });


/////////// END OF DOCUMENT.READY //////////

/* this function takes a single saint and renders it to the page */
function renderSaint(saint) {
  //console.log('rendering one:', saint);
  var saintHtml = $('#saint-template').html();
  var saintsTemplate = Handlebars.compile(saintHtml);
  var html = saintsTemplate(saint);
  $('#saints').append(html);
}


/////////////////////////////

//EDIT A SAINT'S FUNFACT AND PATRON SAINT OF ===> this is an additional feature to be worked on

//when the edit button for the a saint is clicked this function is executed
function handleSaintEditClick(evt) {
  // var saintId = $(this).closest('.saint').data('saint-id');
  var $saintRow = $(this).closest('.saint');
  console.log("$saintRow: ", $saintRow);
  var saintId = $saintRow.data('saint-id');
  console.log("edit saint: ", saintId);


//show the save changes button
$saintRow.find('.save-saint').toggleClass('hidden');
//then hide the edit button
$saintRow.find('.edit-saint').toggleClass('hidden');

//opens the patron-name field and allows user to replace it  with new data
var saintPatronOf = $saintRow.find('span.patron-name').text();
$saintRow.find('span.patron-name').html('<input class="patron-name" value="' + saintPatronOf + '"></input>');

//opens the fun fact details field and allows user to replace it with a new data
var saintFunFact = $saintRow.find('span.funfact-details').text();
$saintRow.find('span.funfact-details').html('<input class="funfact-details" value="' + saintFunFact + '"></input>');

}

//after changes/edits have been made this save function is run
function handleSaveSaintChangesClick(evt) {
  var saintId = $(this).parents('.saint').data('saint-id');
  console.log("saintId: ", saintId);

  var $saintRow = $('[data-saint-id=' + saintId + ']');
  console.log("$saintRow: ", $saintRow);

  //save the new input in the patron-name field

  //save the new input in the fun-fact field

}

/////////////////////////////

//call this when the button on the modal is clicked
//HANDLE NEW CHURCH SUBMIT

function handleNewChurchSubmit(evt) {
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
  console.log('DATA TO POST: ' , dataToPost);
  //get saintID to build the correct URL for the AJAX POST
  var saintId = $modal.data('saintId');

  //Post to Server and Back
  var churchPostToServerUrl = '/api/saints/'+ saintId + '/churches';
  console.log(churchPostToServerUrl);

  $.post(churchPostToServerUrl, dataToPost)
     .success(function(saint) {
       console.log('church', saint);//it works fine  until here

       //clear form
       $churchNameField.val('');
       $locationField.val('');
       $urlField.val('');

       //close modal
       $modal.modal('hide');

       //removes old saint and re-renders saint with new church
       $('[data-saint-id='+ saintId + ']').remove();

       renderSaint(saint);//



  }).error(function(err) {
     console.log("error:", error);
  });

}

/////////////////////////////

//DELETE A SAINT

function handleDeleteSaintClick(evt) {
  var saintId = $(this).parents('.saint').data('saint-id');
  console.log("planning to delete saintId: ", saintId);

  $.ajax({
    method: 'DELETE',
    url: ('/api/saints/' + saintId),
    success:  handleDeleteSaintSuccess
  });

  //call success function
  function handleDeleteSaintSuccess(data) {
    var deletedSaintId = data._id;
    console.log("removing this saint from the page:", deletedSaintId);
    $('[data-saint-id=' + saintId + ']').remove();
    }
  }
