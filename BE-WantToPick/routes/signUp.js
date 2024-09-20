const express = require('express');
const router = express.Router();
const User = require('../models/user'); // User 모델 가져오기

// 세션에 저장된 모든 데이터를 한 번에 저장
router.post('/sign_up', async (req, res) => {
  try {
    // 세션에서 데이터를 가져옵니다.
    const { name, birthdate, gender, email, username, password } = req.session;

    // 필수 값이 모두 있는지 확인
    if (!name || !birthdate || !gender || !email || !username || !password) {
      return res.status(400).json({ message: '모든 필드가 필요합니다.' });
    }

    // 새로운 유저를 생성하고 데이터베이스에 저장
    const newUser = new User({ name, birthdate, gender, email, username, password });
    await newUser.save();

    res.json({ message: '모든 정보가 저장되었습니다.' });
  } catch (error) {
    console.error('정보 저장 중 오류:', error);
    res.status(500).json({ message: '서버 오류' });
  }
});

module.exports = router;