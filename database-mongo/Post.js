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

module.exports = Post;
