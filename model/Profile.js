const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String
  }
});

module.exports = mongoose.model('profile', profileSchema);