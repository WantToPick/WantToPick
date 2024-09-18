// routes/user.js

const express = require('express');
const router = express.Router();
const User = require('../models/user'); // 수정된 User 모델 import
const connectDB = require('../lib/db'); // db.js에서 MongoDB 연결 함수 가져오기

// MongoDB 연결
connectDB();

// 공통된 MongoDB 저장 함수
const saveUserData = async (req, res, field, value) => {
    if (value) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(400).json({ message: '유효한 사용자 ID가 없습니다.' });
            }

            const update = { $set: { [field]: value } };
            const result = await User.updateOne({ _id: userId }, update, { upsert: true });

            if (result.modifiedCount === 0 && result.upsertedCount === 0) {
                return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
            }

            return res.json({ message: `${field}이 저장되었습니다.` });
        } catch (error) {
            console.error('MongoDB 저장 중 오류 발생:', error);
            return res.status(500).json({ message: '서버 오류' });
        }
    } else {
        return res.status(400).json({ message: `${field}을 입력하세요.` });
    }
};

// 이름을 처리하는 API 엔드포인트
router.post('/name', (req, res) => {
    saveUserData(req, res, 'name', req.body.name);
});

// 생년월일을 처리하는 API 엔드포인트
router.post('/birthdate', (req, res) => {
    saveUserData(req, res, 'birthdate', req.body.birthdate);
});

// 성별을 처리하는 API 엔드포인트
router.post('/gender', (req, res) => {
    saveUserData(req, res, 'gender', req.body.gender);
});

// 이메일을 처리하는 API 엔드포인트
router.post('/email', (req, res) => {
    saveUserData(req, res, 'email', req.body.email);
});

// 사용자 이름을 처리하는 API 엔드포인트
router.post('/username', (req, res) => {
    saveUserData(req, res, 'username', req.body.username);
});

module.exports = router;
