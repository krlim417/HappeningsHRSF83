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

/**
 * This function does a database search for the top five most liked event for the city that got passed in. On success, it should pass result as an argument to the callback that was passed in.
 * @param  {string} city - the city to look for to fetch the top five events
 * @param  {function} callback - the callback specified in the initial call of fetchTopFive
 */
const fetchTopFive = (city, callback) => {
  Post.find( { city: { $regex: `${city}`, $options: 'i' } }).limit(5).sort({ likes: -1 }).exec((err, result) => {
    if (err) {
      console.log('Failed to retrieve top five recommendations in database.');
    }
    callback(result);
  });
};
/**
 * Search function that queries the database for activities with given search criteria
 * @param  {object} input - the search criteria passed down by the home component
 * @param  {function} callback - function used to send back the results of the query
 */
const search = (input, callback) => {
  console.log('input in search', input);
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

/**
 * Creates and saves an event document in the database from the user's input on the create page.
 * @param  {object} input - the event data to save to the database
 * @param  {function} cb - the callback specified in the initial call of save
 */
const save = (input, cb) => {
  console.log('post has been deleted, now saving');
  Post.create(input, function (err) {
    if (err) {
      throw err;
    } else {
      cb();
    }
  });
};

/**
 * Looks for any event with the same reference as the one that got passed into the function. If it is found, it will return the result. If it isn't found will return false to show that the reference the user inputted did not have any matches.
 * @param  {object} eventReference - contains the reference hash which will be used to find a particular event
 * @param  {function} callback - the callback specified in the initial call of fetchEventByReference
 */
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
/**
 * Like function that increases the like value of the event in the database
 * @param  {number} eventId - the id of the event that whose like value is to be changed
 * @param  {number} value - the value of the event's like value will be changed to
 */
const like = (eventId, value) => {
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

/**
 * updateEvent function that updates the event's data once the user does an edit
 * @param  {object} input - the user's event data from their edit
 * @param  {Function} cb - the callback specified in the initial call of updateEvent
 */
const updateEvent = (input, cb) => {
  Post.findOneAndUpdate({ reference: `${input.reference}` }, { $set: input}).exec(function(err, data) {
    if (err) {
      console.log('Did not increment times searched.');
    }
    console.log('Incremented times searched by one.');
    cb();
  });
};

module.exports = Post;
module.exports.fetchTopFive = fetchTopFive;
module.exports.search = search;
module.exports.save = save;
module.exports.fetchEventByReference = fetchEventByReference;
module.exports.like = like;
module.exports.updateEvent = updateEvent;
