const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const sessionConfig = require('./config/session');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const db = require('./lib/db');

const app = express();

// CORS 설정
const corsOptions = {
    origin: 'http://localhost:3000', // 프론트엔드의 URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

// 미들웨어 설정
app.use(cors(corsOptions)); // CORS 설정 적용
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session(sessionConfig));

// 데이터베이스 연결
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL 데이터베이스에 연결되었습니다.');
});

// 라우터 설정
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// 서버 시작
app.listen(3001, () => {
    console.log('서버가 포트 3001에서 시작되었습니다');
});
