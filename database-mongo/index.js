const mongoose = require('mongoose');

const url = 'mongodb://localhost/happenings';
const db = mongoose.connect(process.env.MONGODB_URI || url);

module.exports = db;
