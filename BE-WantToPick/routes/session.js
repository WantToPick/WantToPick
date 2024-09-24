const express = require('express');
const router = express.Router();

// 이름 저장
router.post('/name', (req, res) => {
  const { name } = req.body;
  req.session.name = name;
  res.json({ message: '이름이 세션에 저장되었습니다.' });
});

// 생년월일 저장
router.post('/birthdate', (req, res) => {
  const { birthdate } = req.body;
  req.session.birthdate = birthdate;
  res.json({ message: '생년월일이 세션에 저장되었습니다.' });
});

// 성별 저장
router.post('/gender', (req, res) => {
  const { gender } = req.body;
  req.session.gender = gender;
  res.json({ message: '성별이 세션에 저장되었습니다.' });
});

// 이메일 저장
router.post('/email', (req, res) => {
  const { email } = req.body;
  req.session.email = email;
  res.json({ message: '이메일이 세션에 저장되었습니다.' });
});

// 사용자명 저장
router.post('/username', (req, res) => {
  const { username } = req.body;
  req.session.username = username;
  res.json({ message: '사용자명이 세션에 저장되었습니다.' });
});

// 비밀번호 저장
router.post('/password', (req, res) => {
  const { password } = req.body;
  req.session.password = password;
  res.json({ message: '비밀번호가 세션에 저장되었습니다.' });
});

module.exports = router;