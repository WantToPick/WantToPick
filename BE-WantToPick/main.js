const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./lib/db');

const app = express();

// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// 세션 설정
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL 데이터베이스에 연결되었습니다.');
});

// 이름을 처리하는 API 엔드포인트
app.post('/api/name', (req, res) => {
    if (req.body.name) {
        req.session.name = req.body.name;
        res.json({ message: '이름이 저장되었습니다.' });
    } else {
        res.status(400).json({ message: '이름을 입력하세요.' });
    }
});

// 생년월일을 처리하는 API 엔드포인트
app.post('/api/birthdate', (req, res) => {
    if (req.body.birth_date) {  // 수정된 필드 이름
        req.session.birth_date = req.body.birth_date; // 수정된 필드 이름
        res.json({ message: '생년월일이 저장되었습니다.' });
    } else {
        res.status(400).json({ message: '생년월일을 입력하세요.' });
    }
});

// 성별을 처리하는 API 엔드포인트
app.post('/api/gender', (req, res) => {
    if (req.body.gender) {
        req.session.gender = req.body.gender;
        res.json({ message: '성별이 저장되었습니다.' });
    } else {
        res.status(400).json({ message: '성별을 입력하세요.' });
    }
});

// 이메일을 처리하는 API 엔드포인트
app.post('/api/email', (req, res) => {
    if (req.body.email) {
        req.session.email = req.body.email;
        res.json({ message: '이메일이 저장되었습니다.' });
    } else {
        res.status(400).json({ message: '이메일을 입력하세요.' });
    }
});

// 아이디를 처리하는 API 엔드포인트
app.post('/api/username', (req, res) => {
    if (req.body.username) {
        req.session.username = req.body.username;
        res.json({ message: '아이디가 저장되었습니다.' });
    } else {
        res.status(400).json({ message: '아이디를 입력하세요.' });
    }
});

// 비밀번호를 처리하고 데이터베이스에 저장하는 API 엔드포인트
app.post('/api/password', (req, res) => {
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
            res.status(500).json({ message: '데이터베이스 오류가 발생했습니다.' });
            return;
        }
        console.log('데이터가 저장되었습니다:', result);
        req.session.destroy();  // 세션 데이터 삭제
        res.json({ message: '사용자 데이터가 성공적으로 저장되었습니다!' });
    });
});

// 서버 시작
app.listen(3001, () => {
    console.log('서버가 포트 3001에서 시작되었습니다');
});
