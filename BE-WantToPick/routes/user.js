const express = require('express');
const router = express.Router();

// 공통된 세션 설정 함수
const setSessionData = (req, res, field, value) => {
    if (value) {
        req.session[field] = value;
        return res.json({ message: `${field}이 저장되었습니다.` });
    } else {
        return res.status(400).json({ message: `${field}을 입력하세요.` });
    }
};

// 이름을 처리하는 API 엔드포인트
router.post('/name', (req, res) => {
    setSessionData(req, res, 'name', req.body.name);
});

// 생년월일을 처리하는 API 엔드포인트
router.post('/birthdate', (req, res) => {
    setSessionData(req, res, 'birthdate', req.body.birthdate);
});

// 성별을 처리하는 API 엔드포인트
router.post('/gender', (req, res) => {
    setSessionData(req, res, 'gender', req.body.gender);
});

// 이메일을 처리하는 API 엔드포인트
router.post('/email', (req, res) => {
    setSessionData(req, res, 'email', req.body.email);
});

// 아이디를 처리하는 API 엔드포인트
router.post('/username', (req, res) => {
    setSessionData(req, res, 'username', req.body.username);
});

module.exports = router;
