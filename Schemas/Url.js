const mongoose = require('mongoose');
const { Schema } = mongoose;

const UrlSchema = new Schema({
  mainlink : {
    type: String
  },
  shortlink : {
    type: String
  },
  User : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  Date: {
    type: String
  }
});

const Url = mongoose.model('Url', UrlSchema);
module.exports = Url;