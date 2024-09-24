const express = require('express');
const router = express.Router();
const User = require('../models/user'); // userdb 모델
const Profile = require('../models/profile'); // profiledb 모델

// 프로필 생성 API
router.post('/profile', async (req, res) => {
    const { username, position, keywords } = req.body; // 클라이언트에서 보낸 데이터
    
    try {
        // userdb에서 사용자 정보 가져오기
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 프로필 정보 생성
        const newProfile = new Profile({
            user_id: user._id, // userdb에서 가져온 _id
            name: user.name, // userdb에서 가져온 정보
            birthdate: user.birthdate,
            email: user.email,
            position, // 클라이언트에서 받은 새로운 정보
            keywords // 클라이언트에서 받은 새로운 정보
        });

        // 프로필 저장
        await newProfile.save();
        res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
    } catch (error) {
        res.status(500).json({ message: 'Error creating profile', error });
    }
});

module.exports = router;