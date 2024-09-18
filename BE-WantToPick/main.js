const connectDB = require('./lib/db.js'); // db.js에서 MongoDB 연결 함수 가져오기

require('dotenv').config(); // 환경 변수 로드
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const sessionConfig = require('./config/session'); // 세션 설정
const sessionRoutes = require('./routes/session'); // 세션에 데이터 저장하는 라우터
const signUpRoutes = require('./routes/signUp'); // /signin 라우터

const app = express();

// 환경 변수에서 포트와 MongoDB URI를 가져옵니다.
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

// CORS 설정
const corsOptions = {
    origin: 'http://localhost:3000', // 프론트엔드의 URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

// 미들웨어 설정
app.use(cors(corsOptions)); // CORS 설정 적용
app.use(express.json()); // JSON 형식의 요청을 파싱
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 요청을 파싱
app.use(session(sessionConfig)); // 세션 설정

connectDB();

// 라우터 설정
app.use('/api/session', sessionRoutes); // 세션에 데이터 저장 라우터
app.use('/api', signUpRoutes); // /sign_up 라우터

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 시작되었습니다`);
});
