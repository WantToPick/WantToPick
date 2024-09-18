const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../routes/user'); // User 모델을 불러옵니다
const router = express.Router();

// 비밀번호를 처리하고 데이터베이스에 저장하는 API 엔드포인트
router.post('/password', async (req, res) => {
    console.log('Password API 호출됨');
    
    if (!req.body.password) {
        return res.status(400).json({ message: '비밀번호를 입력하세요.' });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const { name, birthdate, gender, email, username } = req.session;

    if (!name || !birthdate || !gender || !email || !username) {
        return res.status(400).json({ message: '모든 필드를 입력하세요.' });
    }

    try {
        // MongoDB에 사용자 데이터 저장
        const newUser = new User({
            name,
            birthdate,
            gender,
            email,
            username,
            password: hashedPassword
        });

        await newUser.save();

        console.log('데이터가 저장되었습니다:', newUser);
        
        // 세션 삭제
        req.session.destroy((err) => {
            if (err) {
                console.error('세션 삭제 에러:', err);
                return res.status(500).json({ message: '세션 삭제 중 오류가 발생했습니다.' });
            }
            res.json({ message: '사용자 데이터가 성공적으로 저장되었습니다!' });
        });
    } catch (error) {
        console.error('데이터베이스 에러:', error);
        return res.status(500).json({ message: '데이터베이스 오류가 발생했습니다.' });
    }
});

module.exports = router;