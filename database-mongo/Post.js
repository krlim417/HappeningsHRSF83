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

const search = (city, input, callback) => {
  Post.find({ city: `${city}`, name: { $regex: `${input}`, $options: 'i' } }).sort({ likes: -1 }).exec((err, result) => {
    if (err) {
      console.log('Search failed');
    }
    console.log(city);
    console.log(input);
    callback(result);
  });
};

module.exports = Post;
module.exports.fetchTopFive = fetchTopFive;
module.exports.search = search;
