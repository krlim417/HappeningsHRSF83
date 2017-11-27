const expect = require('chai').expect;
const server = require('../Server/index.js');
const request = require('supertest');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create a new schema that accepts a 'name' object.
// 'name' is a required field
const testSchema = new Schema({
  name: { type: String, required: true },
});

// Create a new collection called 'Name'
const Name = mongoose.model('Name', testSchema);

describe('Database Tests', function () {
  // Before starting the test, create a sandboxed database connection
  // Once a connection is established invoke done()

  before(function (done) {
    mongoose.connect('mongodb://localhost/testDatabase');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function () {
      console.log('We are connected to test database!');
      done();
    });
  });

  describe('Test Database', function () {
    // Save object with 'name' value of 'Mike"
    it('New name saved to test database', function (done) {
      const testName = Name({
        name: 'Mike',
      });
      testName.save(done);
    });
    it('Dont save incorrect format to database', function (done) {
      // Attempt to save with wrong info. An error should trigger
      const wrongSave = Name({
        notName: 'Not Mike',
      });
      wrongSave.save(err => {
        if (err) { return done(); }
        throw new Error('Should generate error!');
      });
    });
    it('Should retrieve data from test database', function (done) {
      // Look up the 'Mike' object previously saved.
      Name.find({ name: 'Mike' }, (err, name) => {
        if (err) { throw err; }
        if (name.length === 0) { throw new Error('No data!'); }
        done();
      });
    });
  });

  describe('Server tests', () => {
    it('Should return a status code of 200 for a GET request to /', (done) => {
      request(server)
        .get('/')
        .expect(200, done);
    });

    it('should return a status code of 404 for all other GET requests', (done) => {
      request(server)
        .get('/foo/bar')
        .expect(404, done);
    });

      it('Should return a status code of 200 for a POST request to /home', (done) => {
      request(server)
        .post('/home')
        .expect(200, done);
    });

    it('Should return a status code of 404 for all other POST requests', (done) => {
      request(server)
        .post('/foo/bar')
        .expect(404, done);
     });

    it("Should return a status code of 404 for a GET request to /search without parameters", done => {
      request(server)
        .get("/search")
        .expect(404, done);
    });

  it("Should return a status code of 200 for a GET request to /search with parameters", done => {
    request(server)
      .get("/search/canada/fishing/10/short/1")
      .expect(200, done);
  });

  });

  // After all tests are finished drop database and close connection
  after(function (done) {
    server.close();
    mongoose.connection.db.dropDatabase(function () {
      mongoose.connection.close(done);
    });
  });
});

// describe("Description of the test", function() {
//   describe("more specific detail of each test", function() {
//     it("expected result", function () {
//     });
//   });
// });

