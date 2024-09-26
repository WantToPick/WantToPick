const express = require('express');
const router = express.Router();
const SelfIntroduction = require('../models/selfIntroduction'); // 모델 가져오기

// 자기소개 데이터 가져오기 (GET 요청)
router.get('/self-introduction', async (req, res) => {
  const { username } = req.query;  // 클라이언트에서 전달된 username

  try {
    // username에 맞는 데이터 찾기
    const selfIntroductionData = await SelfIntroduction.findOne({ username });

    if (!selfIntroductionData) {
      return res.status(404).json({ message: '해당 사용자의 데이터를 찾을 수 없습니다.' });
    }

    res.json(selfIntroductionData);  // 데이터 반환
  } catch (error) {
    console.error('데이터 가져오기 에러:', error);
    res.status(500).json({ message: '서버 에러', error });
  }
});

// 자기소개 데이터 업데이트 (PUT 요청)
router.put('/self-introduction', async (req, res) => {
  const {
    username,  // username을 추가하여 필터로 사용
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
      { username },  // username으로 특정 사용자 필터링
      { training_period, experience, nationality, motivation, mbti, favorite_songs, role_model, specialty, charm_points, my_dream },
      { new: true, upsert: true }  // 새 문서 생성 또는 업데이트
    );
    
    if (!updatedSelfIntroduction) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
    
    res.json(updatedSelfIntroduction);
  } catch (error) {
    console.error('데이터 업데이트 에러:', error);
    res.status(500).json({ message: '서버 에러', error });
  }
});

// 새로운 자기소개 데이터를 추가하는 POST 요청
router.post('/self-introduction', async (req, res) => {
  const {
    username,
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
    // 중복된 데이터가 있는지 확인
    const existingSelfIntroduction = await SelfIntroduction.findOne({ username });
    if (existingSelfIntroduction) {
      return res.status(400).json({ message: '해당 사용자에 대한 데이터가 이미 존재합니다.' });
    }

    // 새로운 자기소개 데이터 생성
    const newSelfIntroduction = new SelfIntroduction({
      username,
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
    });

    // 데이터베이스에 저장
    await newSelfIntroduction.save();

    // 생성된 데이터를 클라이언트로 반환
    res.status(201).json(newSelfIntroduction);

  } catch (error) {
    console.error('데이터 생성 에러:', error);
    res.status(500).json({ message: '서버 에러', error });
  }
});

module.exports = router;
