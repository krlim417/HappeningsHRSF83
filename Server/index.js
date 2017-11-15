// const http = require('http')
// const port = 3000

// const requestHandler = (request, response) => {
// 	console.log(request.url)
// 	response.end('Hello Node.js Server!')
// }

// const server = http.createServer(requestHandler)

// server.listen(port, (err) => {
// 	if (err) {
// 		return console.log('someting bad happened', err)
// 	}
// 	console.log(`server is listening on ${port}`)
// }) 
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')


app.get('/', (request, response) => {
  response.send('Hello from Express!')
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

