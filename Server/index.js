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

app.post('/edit', (request, response) => {
  db.fetchEventByReference(request.body.reference, (result) => {
    if (result === false) {
      response.send(false);
    } else {
      response.send(result);
    }
  });
});

app.post('/save', (request, response) => {
  console.log('REQUEST BODY SAVE: ', request.body);
  if (!request.body.reference) {
    console.log('post has no reference', request.body);
    request.body.reference = ref(request.body.city);
    db.save(request.body, () => {
      response.send(request.body.reference);
    });
  } else {
    console.log('post has reference', request.body);
    db.update(request.body, () => {
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
