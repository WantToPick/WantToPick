const mongoose = require('mongoose');

const selfIntroductionSchema = new mongoose.Schema({
  training_period: { type: String, required: true },
  experience: { type: String, required: true },
  nationality: { type: String, required: true },
  motivation: { type: String, required: true },
  mbti: { type: String, required: true },
  favorite_songs: { type: Object, required: true },
  role_model: { type: String, required: true },
  specialty: { type: String, required: true },
  charm_points: { type: String, required: true },
  my_dream: { type: String, required: true },
});

const SelfIntroduction = mongoose.model('SelfIntroduction', selfIntroductionSchema, 'self_introductiondb');

module.exports = SelfIntroduction;