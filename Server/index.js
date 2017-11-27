const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database-mongo/Post.js');
const ref = require('../Helpers/refGenerator.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/../Angular-Client')));
app.use(express.static(path.join(__dirname, '/../node_modules')));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send('Get request to `/` received.');
});

/**
 * This is used by pages that want to render the home view. It fetches the top five events based on likes for a certain city and returns the data to the client.
 * @param  {object} request - what is sent with the post request and contains the location of the events to look for in the database
 * @param  {object} response - what is sent back in response to the get post request and contains at most five event data for the user selected city.
 */
app.post('/home', (request, response) => {
  db.fetchTopFive(request.body.location, (result) => {
    response.send(result);
  });
});

/**
 * Function that is called when a get request is recieved to the /search route
 * @param  {object} request - what is sent with the get request and contains the search parameters
 * @param  {object} responce - what is sent back in responce to the get request and contains the search results
 */
app.get('/search/:city/:input/:cost/:duration/:intensity', (request, responce) => {
  console.log(request.params);
  db.search(request.params, (results) => {
    responce.send(results);
  });
});

/**
 * Fetches an event based on the reference. If an event is found, it will return that event back to the client. If there is no matching event, it will return false to the client.
 * @param  {object} request - what is sent with the post request and contains the user's inputted reference number
 * @param  {object} response - what is sent back in response to the post request and contains either: 1. if found, the event data, or 2. false to tell the client there was no matching reference
 */
app.post('/edit', (request, response) => {
  db.fetchEventByReference(request.body.reference, (result) => {
    if (result === false) {
      response.send(false);
    } else {
      response.send(result);
    }
  });
});

/**
 * The /save route handles two events:
 One is when the user chooses to create an event. When that occurs, the data is sent to the server without any reference since it is something new. The server will create a hash for this event and then store all of the data to the database.

 The second is when the user chooses to edit an event. The user will already have a reference so the server will go to the database and delete the old data, and save a completely new one.

 After it has handled any of the two events above, it will return to the client a reference. 
 * @param  {object} request - what is sent with the post request and cotanins the event data the user wants to save to the database
 * @param  {function} response - what is sent back from the post request and contains the reference of the event
 */
app.post('/save', (request, response) => {
  if (!request.body.reference) {
    console.log('post has no reference', request.body);
    request.body.reference = ref(request.body.city);
    db.save(request.body, () => {
      response.send(request.body.reference);
    });
  } else {
    console.log('post has reference', request.body);
    db.updateEvent(request.body, () => {
      response.send(request.body.reference);
    });
  }
});

/**
 * Function that is called when there is a post request recieved by the like route of the server
 * @param  {object} request - what is sent with the post request and contains the event being modified
 * @param  {object} responce - what is sent back from the post request
 */
app.post('/like', (request, responce) => {
  db.like(request.body._id, request.body.likes);
  responce.send();
});

const server = app.listen(port, (err) => {
  if (err) {
    console.log('something bad happened', err);
  } else {
    console.log(`server is listening on ${port}`);
  }
});

module.exports = server;
