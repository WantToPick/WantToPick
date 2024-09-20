const mongoose = require('mongoose');

// 프로필 스키마 정의
const profileSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, // userdb의 _id를 참조
        required: true, 
        ref: 'User' // User 모델과의 관계 설정
    },
    name: { 
        type: String, 
        required: true 
    },
    birthdate: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    position: { 
        type: String, 
        required: true 
    },
    keywords: { 
        type: [String], // 문자열 배열
        required: true 
    }
});

// 프로필 모델 생성
const Profile = mongoose.model('Profile', profileSchema, 'profiledb');

module.exports = Profile;