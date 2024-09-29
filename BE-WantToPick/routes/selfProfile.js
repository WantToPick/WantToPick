const express = require('express');
const router = express.Router();
const User = require('../models/user'); // userdb 모델
const Profile = require('../models/profile'); // profiledb 모델

// 프로필 받아오기 API
router.get('/profile', async (req, res) => {
    const { username } = req.query;  // 클라이언트에서 전달된 username
  
    try {
      // username에 맞는 데이터 찾기
      const profileData = await Profile.findOne({ username });
  
      if (!profileData) {
        return res.status(404).json({ message: '해당 사용자의 데이터를 찾을 수 없습니다.' });
      }
  
      res.json(profileData);  // 데이터 반환
    } catch (error) {
      console.error('데이터 가져오기 에러:', error);
      res.status(500).json({ message: '서버 에러', error });
    }
  });

// 프로필 생성 또는 업데이트 API (PUT 요청)
router.put('/profile', async (req, res) => {
    const { username, position, keywords } = req.body; // 클라이언트에서 보낸 데이터
    
    try {
        // userdb에서 사용자 정보 가져오기
        const user = await User.findOne({ username });

        // 사용자가 없으면 404 반환
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 기존 프로필 정보가 있는지 확인
        const existingProfile = await Profile.findOne({ username: user.username });

        if (existingProfile) {
            // 프로필이 있으면 업데이트
            existingProfile.position = position;
            existingProfile.keywords = keywords;

            // 프로필 업데이트 후 저장
            await existingProfile.save();
            return res.status(200).json({ message: 'Profile updated successfully', profile: existingProfile });
        }

        // 프로필이 없으면 새로 생성
        const newProfile = new Profile({
            username: user.username, // userdb에서 가져온 사용자 이름
            name: user.name, // userdb에서 가져온 사용자 이름
            birthdate: user.birthdate, // userdb에서 가져온 생년월일
            email: user.email, // userdb에서 가져온 이메일
            position, // 클라이언트에서 받은 포지션 정보
            keywords // 클라이언트에서 받은 키워드 정보
        });

        // 새 프로필 저장
        await newProfile.save();
        res.status(201).json({ message: 'Profile created successfully', profile: newProfile });

    } catch (error) {
        // 에러 처리
        res.status(500).json({ message: 'Error creating or updating profile', error });
    }
});

router.post('/profile', async (req, res) => {
  try {
    // 클라이언트에서 전달된 데이터
    const { username, position, keywords } = req.body;

    // 세션에서 저장된 데이터 가져오기
    const { name, birthdate, email } = req.session;

    // 세션에 필요한 데이터가 없는 경우
    if (!name || !birthdate || !email) {
      return res.status(400).json({ message: '세션에 필요한 데이터가 없습니다.' });
    }

    // 프로필 데이터 생성
    const profileData = {
      username,
      name,
      birthdate,
      email,
      position, // 클라이언트에서 추가된 포지션 정보
      keywords // 클라이언트에서 전달된 키워드 정보
    };

    // 프로필을 DB에 저장
    const newProfile = new Profile(profileData);
    await newProfile.save();

    // 성공 메시지 반환
    res.status(201).json({ message: '프로필이 성공적으로 저장되었습니다.', profile: newProfile });
  } catch (error) {
    console.error('프로필 저장 중 오류:', error);
    res.status(500).json({ message: '프로필 저장 중 오류가 발생했습니다.', error });
  }
});


module.exports = router;