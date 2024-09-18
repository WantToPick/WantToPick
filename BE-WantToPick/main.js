require('dotenv').config(); // 환경 변수 로드
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const sessionConfig = require('./config/session'); // 세션 설정
const userRoutes = require('./routes/user'); // 사용자 라우터
const authRoutes = require('./routes/auth'); // 인증 라우터 (필요 시 주석 해제)

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

// MongoDB 연결 함수
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true
        });
        console.log('MongoDB 연결 성공');
    } catch (err) {
        console.error('MongoDB 연결 실패:', err);
    }
};

// MongoDB 연결 호출
connectDB();

// 라우터 설정
app.use('/api/auth', authRoutes); // 인증 라우터 (필요 시 주석 해제)
app.use('/api/user', userRoutes); // 사용자 라우터

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 시작되었습니다`);
});