

$(document).ready(function() {
  console.log('app.js loaded!');
  //ajax call to get the hardcoded-saints in saintsController.js
  $.get('/api/saints').success(function (saints) {
    saints.forEach(function(saint) {
    console.log("saint", saint);
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

    //edit a church
    $('#saints').on('click', '.edit-church', handleChurchEditClick);

    //delete a saint
    $('#saints').on('click', '.delete-saint', handleDeleteSaintClick);
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

//EDIT A CHURCH ===> this is an additional feature to be worked on


function handleChurchEditClick(evt) {
  var saintId = $(this).closest('.saint').data('saint-id');
  console.log('edit saint', saintId);
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
