const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database-mongo/Post.js');
const ref = require('../Helpers/refGenerator.js');
const app = express();
const port = 3000;

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

app.get('/search/:city/:input/:cost/:duration/:intencity', (request, responce) => {
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
  if (!request.body.reference) {
    request.body.reference = ref(request.body.city);
  }
  db.save(request.body, () => {
    response.send(request.body.reference);
  });
});

var server = app.listen(port, (err) => {
  if (err) {
    console.log('something bad happened', err);
  } else {
    console.log(`server is listening on ${port}`);
  }
});

module.exports = server;
