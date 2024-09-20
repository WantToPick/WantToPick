const mongoose = require('mongoose');

const selfIntroductionSchema = new mongoose.Schema({
  username: { type: String, required: true }, // username을 외래키로 사용
  training_period: { type: String, required: true },
  experience: { type: String, required: true },
  nationality: { type: String, required: true },
  motivation: { type: String, required: true },
  mbti: { type: String, required: true },
  favorite_songs: { // favorite_songs를 객체로 정의
    song1: { type: String, required: true },
    song2: { type: String, required: true }
  },
  role_model: { type: String, required: true },
  specialty: { type: String, required: true },
  charm_points: { type: String, required: true },
  my_dream: { type: String, required: true },
});

const SelfIntroduction = mongoose.model('SelfIntroduction', selfIntroductionSchema, 'self_introductiondb');

module.exports = SelfIntroduction;