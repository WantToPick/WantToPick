const express = require('express');
const router = express.Router();
const SelfIntroduction = require('../models/selfIntroduction'); // 모델 가져오기

// 자기소개 데이터 가져오기 (GET 요청)
router.get('/self-introduction', async (req, res) => {
  try {
    const selfIntroduction = await SelfIntroduction.findOne(); // 첫 번째 문서 가져오기
    res.json(selfIntroduction);
  } catch (error) {
    console.error('데이터 가져오기 에러:', error);
    res.status(500).send('서버 에러');
  }
});

// 자기소개 데이터 업데이트 (PUT 요청)
router.put('/self-introduction', async (req, res) => {
  const {
    training_period,
    experience,
    nationality,
    motivation,
    mbti,
    favorite_songs,
    role_model,
    specialty,
    charm_points,
    my_dream
  } = req.body;

  try {
    const updatedSelfIntroduction = await SelfIntroduction.findOneAndUpdate(
      {}, // 첫 번째 문서를 업데이트
      { training_period, experience, nationality, motivation, mbti, favorite_songs, role_model, specialty, charm_points, my_dream },
      { new: true, upsert: true } // 새 문서 생성 또는 업데이트
    );
    res.json(updatedSelfIntroduction);
  } catch (error) {
    console.error('데이터 업데이트 에러:', error);
    res.status(500).send('서버 에러');
  }
});

module.exports = router;
