const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '/../Angular-Client')));
app.use(express.static(path.join(__dirname, '/../node_modules')));

app.get('/', (request, response) => {
  response.send('Get request to `/` received.');
});

app.post('/home', (request, response) => {
  // get top five activity recommendations from database
  // send the top five activity recommendations for the city back to the client
  response.send('Get request to `/home` received.');
});

app.use(bodyParser.json());

app.listen(port, (err) => {
  if (err) {
    console.log('something bad happened', err);
  } else {
    console.log(`server is listening on ${port}`);
  }
});
