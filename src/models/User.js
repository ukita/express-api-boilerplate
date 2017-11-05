const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
});

module.exports = mongoose.model('users', schema);
