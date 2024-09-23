const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // username을 기본키로 사용
  name: { type: String, required: true },
  birthdate: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  keywords: { // keywords를 객체로 정의
    kw1: { type: String, required: true },
    kw2: { type: String, required: true },
    kw3: { type: String, required: true }
  }
});

const Profile = mongoose.model('Profile', profileSchema, 'profiledb');

module.exports = Profile;