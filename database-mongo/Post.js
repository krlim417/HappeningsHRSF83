const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
  name: String,
  city: String,
  date: String,
  time: String,
  category: String,
  address: String,
  description: String,
  cost: Number,
  intensity: Number,
  rating: Number,
  duration: String,
  likes: { type: Number, default: 0 },
  imgUrl: String,
  reference: String,
},
{
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

const fetchTopFive = (city, callback) => {
  Post.find({ city: `${city}` }).limit(5).sort({ likes: -1 }).exec((err, result) => {
    if (err) {
      console.log('Failed to retrieve top five recommendations in database.');
    }
    callback(result);
  });
};

const search = (input, callback) => {
  Post.find({
    city: `${input.city}`,
    name: { $regex: `${input.input}`, $options: 'i' },
    cost: { $lt: `${input.cost}`},
    duration: { $regex: `${input.duration}`, $options: 'i' },
    intensity: `${input.intensity}`,
  }).sort({ likes: -1 }).exec((err, result) => {
    if (err) {
      console.log('Search failed');
    }
    callback(result);
  });
};

const save = (input, cb) => {
  Post.create(input, function (err) {
    if (err) {
      throw err;
    } else {
      cb();
    }
  });
};

const fetchEventByReference = (eventReference, callback) => {
  Post.find({ reference: `${eventReference}` }).exec((err, result) => {
    if (err) {
      console.log('Failed to retrieve the event based on reference.');
    } else if (result[0]) {
      callback(result);
    } else {
      callback(false);
    }
  });
};

module.exports = Post;
module.exports.fetchTopFive = fetchTopFive;
module.exports.search = search;
module.exports.save = save;
module.exports.fetchEventByReference = fetchEventByReference;
