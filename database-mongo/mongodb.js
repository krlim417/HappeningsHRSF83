const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:3000/happenings";

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});