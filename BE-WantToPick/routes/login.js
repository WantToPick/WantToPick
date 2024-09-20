const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

const SECRET_KEY = 'your_jwt_secret'; // 환경 변수로 관리하는 것이 좋습니다.

// 로그인 라우트
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 데이터베이스에서 사용자 찾기
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: '존재하지 않는 ID 입니다.' });
    }

    // 비밀번호 비교 (단순 문자열 비교)
    if (password !== user.password) {
      return res.status(401).json({ message: '잘못된 비밀번호입니다.' });
    }

    // JWT 토큰 생성
    const token = jwt.sign({ userId: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    // JWT 토큰을 클라이언트로 반환
    res.json({ message: '로그인 성공', token });
  } catch (error) {
    console.error('로그인 중 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

module.exports = router;
