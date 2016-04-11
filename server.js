// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

//serves static files from public folder and configure body parser for receiving form data
app.use(bodyParser.urlencoded({ extended: true }));


// // We'll serve jQuery and bootstrap from a local bower cache avoiding CDNs
// // We're placing these under /vendor to differentiate them from our own assets
// app.use('/vendor', express.static(__dirname + '/bower_components'));

var controllers = require('./controllers');

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', controllers.api.index);

//route for GET /api/saints
app.get('/api/saints', controllers.saints.index);

//route for POST /api/saints
app.post('/api/saints', controllers.saints.create);

//route for POST /api/saints/:saintId/churches, creates new dedicatedChurch via modal
app.post('/api/saints/:saintId/churches', controllers.saintsChurches.create);

//route for DELETE /api/saints/:saintId, deletes a saint
app.delete('/api/saints/:saintId', controllers.saints.destroy);

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
