const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.get('/', (request, response) => {
  response.send('Hello from Express!');
});
app.use(bodyParser.json());
app.listen(port, (err) => {
  if (err) {
    console.log('something bad happened', err);
  } else {
    console.log(`server is listening on ${port}`);
  }
});
