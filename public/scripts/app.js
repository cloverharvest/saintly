

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
      //app.js got data from the view
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
    $('#saints').on('click', '.save-saint', handleSaveSaintChangesClick);
});


/////////// END OF DOCUMENT.READY //////////

/////////////////////////////

//RENDER SAINT FUNCTION

/* this function takes a single saint and renders it to the page */
function renderSaint(saint) {
  var saintHtml = $('#saint-template').html();
  var saintsTemplate = Handlebars.compile(saintHtml);
  var html = saintsTemplate(saint);
  $('#saints').prepend(html);
}


/////////////////////////////

//EDIT AND SAVE A SAINT'S FUNFACT AND PATRON SAINT OF

//when the edit button for the saint is clicked this function is executed
function handleSaintEditClick(evt) {

  //targeting what row and what id will be edited
  var $saintRow = $(this).closest('.saint');
  console.log("edit saint at this row: ", $saintRow);
  var saintId = $saintRow.data('saint-id');
  console.log("edit saint at: ", saintId);


  //show the save changes button
  $saintRow.find('.save-saint').toggleClass('hidden');
  //then hide the edit button
  $saintRow.find('.edit-saint').toggleClass('hidden');

  //opens the patron-name field and gets the value in it, .text() is a getter, accepts no arguments and returns a "string"
  var saintPatronOf = $saintRow.find('span.patron-name').text();

 //this line of code finds the patron name field and sets the contents of the value
  $saintRow.find('span.patron-name').html('<input class="edit-patron-name" value="' + saintPatronOf + '"></input>');

  //opens the fun fact details field and gets the value in it
  var saintFunFact = $saintRow.find('span.funfact-details').text();
  $saintRow.find('span.funfact-details').html('<input class="edit-funfact-details" value="' + saintFunFact + '"></input>');
}

//after changes/edits have been made this save function is run

function handleSaveSaintChangesClick(evt) {
  evt.preventDefault();
  var saintId = $(this).parents('.saint').data('saint-id');
  console.log("saintId: ", saintId);

  var $saintRow = $('[data-saint-id=' + saintId + ']');
  console.log("$saintRow: ", $saintRow);

  var data;

  $.ajax({
    method: 'PUT',
    url: '/api/saints/' + saintId,
    data: {
      patronSaintOf: $saintRow.find('.edit-patron-name').val(),
      funFact: $saintRow.find('.edit-funfact-details').val()
    },
    success: handleSaintUpdatesSuccess //bec there is max of two updates(funfact/patronSaintOf) possible in this functionality
  });

   //call success function
   function handleSaintUpdatesSuccess(data) {
     console.log('response from server update: ', data);

     var saintId = data._id;
     $('[data-saint-id=' + saintId + ']').remove();
     renderSaint(data);
   }

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
  var churchPostToServerUrl = '/api/saints/'+ saintId + '/churches'; //the path
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
