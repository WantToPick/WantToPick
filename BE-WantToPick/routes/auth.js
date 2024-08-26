const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../lib/db');
const router = express.Router();

// 비밀번호를 처리하고 데이터베이스에 저장하는 API 엔드포인트
router.post('/password', (req, res) => {
    console.log('Password API 호출됨');
    
    if (!req.body.password) {
        return res.status(400).json({ message: '비밀번호를 입력하세요.' });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const { name, birth_date, gender, email, username } = req.session;

    if (!name || !birth_date || !gender || !email || !username) {
        return res.status(400).json({ message: '모든 필드를 입력하세요.' });
    }

    const sql = 'INSERT INTO users (name, birthdate, gender, email, username, password) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [name, birth_date, gender, email, username, hashedPassword];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('데이터베이스 에러:', err);
            return res.status(500).json({ message: '데이터베이스 오류가 발생했습니다.' });
        }
        console.log('데이터가 저장되었습니다:', result);
        req.session.destroy((err) => {
            if (err) {
                console.error('세션 삭제 에러:', err);
                return res.status(500).json({ message: '세션 삭제 중 오류가 발생했습니다.' });
            }
            res.json({ message: '사용자 데이터가 성공적으로 저장되었습니다!' });
        });
    });
});

module.exports = router;
