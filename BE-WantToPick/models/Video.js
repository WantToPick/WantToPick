const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  uploadDate: { type: Date, default: Date.now },
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  length: { type: Number },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;