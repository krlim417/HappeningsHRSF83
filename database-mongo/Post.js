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
  Post.find( { city: { $regex: `${city}`, $options: 'i' } }).limit(5).sort({ likes: -1 }).exec((err, result) => {
    if (err) {
      console.log('Failed to retrieve top five recommendations in database.');
    }
    callback(result);
  });
};

const search = (input, callback) => {
  console.log('input in search', input)
  Post.find({
    city: { $regex: `${input.city}`, $options: 'i' },
    name: { $regex: `${input.input}`, $options: 'i' },
    cost: { $lt: `${input.cost}` },
    duration: { $regex: `${input.duration}`, $options: 'i' },
    intensity: `${input.intensity}`
  })
    .sort({ likes: -1 })
    .exec((err, result) => {
      if (err) {
        console.log('Search failed', err);
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
    } else if (result[0]) {
      callback(result);
    } else {
      callback(false);
    }
  });
};

const like = (name, value) => {
  Post.update(
    { _id : eventId },
    { $set: { likes: value } },
    { safe: true },
    (err, raw) => {
      if (err) { console.log('update failed'); }
      console.log('the raw responce from mongo was', raw);
    }
  );
};

const deleteNSave = (input, cb) => {
  Post.find({ reference: `${input.reference}` })
    .remove(save(input, cb));
};


module.exports = Post;
module.exports.fetchTopFive = fetchTopFive;
module.exports.search = search;
module.exports.save = save;
module.exports.fetchEventByReference = fetchEventByReference;
module.exports.like = like;
module.exports.deleteNSave = deleteNSave;
