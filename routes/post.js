const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;
