// models/self_introduction.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// self_introduction 스키마 정의
const selfIntroductionSchema = new Schema({
  basic_info: {
    training_period: { type: String, required: true },
    experience: { type: String, required: true },
    nationality: { type: String, required: true },
    motivation: { type: String, required: true },
    mbti: { type: String, required: true }
  },
  additional_info: {
    favorite_songs: { type: [String], required: true },
    role_model: { type: String, required: true },
    specialty: { type: String, required: true },
    charm_points: { type: String, required: true },
    my_dream: { type: String, required: true }
  }
});

module.exports = selfIntroductionSchema;