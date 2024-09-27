// 기존 코드
const connectDB = require('./lib/db'); // db.js에서 MongoDB 연결 함수 가져오기
require('dotenv').config(); // 환경 변수 로드
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const multer = require('multer'); // multer 추가
const { exec } = require('child_process'); // child_process 추가
const sessionConfig = require('./config/session'); // 세션 설정
const sessionRoutes = require('./routes/session'); // 세션에 데이터 저장하는 라우터
const signUpRoutes = require('./routes/signUp'); // /signin 라우터
const loginRoutes = require('./routes/login'); // 새로운 로그인 경로
const selfIntroductionRoutes = require('./routes/selfIntroduction');
const videoRoutes = require('./routes/video'); // 비디오 업로드/다운로드 라우터 추가
const musicRoutes = require('./routes/trainingRoom'); //노래 업로드/다운로드 라우터 추가

const app = express();

// 환경 변수에서 포트와 MongoDB URI를 가져옵니다.
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

const corsOptions = {
    origin: 'http://localhost:3000', // 프론트엔드의 URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions)); // CORS 미들웨어 추가

// 미들웨어 설정
app.use(cors(corsOptions)); // CORS 설정 적용
app.use(express.json()); // JSON 형식의 요청을 파싱
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 요청을 파싱
app.use(session(sessionConfig)); // 세션 설정

connectDB();

// MP3 업로드를 위한 multer 설정
const upload = multer({ dest: 'uploads/' }); // 파일 저장 위치

// 음성 분석을 위한 API 라우트 추가
app.post('/api/trainingRoom/upload', upload.single('audio'), (req, res) => {
    const filePath = req.file.path;

    // Python 스크립트 실행
    exec(`python analyze_audio.py ${filePath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error during audio analysis');
        }

        // 분석 결과를 JSON 형태로 반환
        const analysisResults = JSON.parse(stdout);
        res.json(analysisResults);
    });
});

// 라우터 설정
app.use('/api/session', sessionRoutes); // 세션에 데이터 저장 라우터
app.use('/api', signUpRoutes); // /sign_up 라우터
app.use('/api', loginRoutes);  // /api/login 라우트를 추가
app.use('/api', selfIntroductionRoutes);

// 비디오 업로드 및 다운로드 라우터
app.use('/api/video', videoRoutes); // /api/video 경로에 비디오 관련 라우터 추가

// MP3 업로드 및 다운로드 라우터
app.use('/api/trainingRoom', musicRoutes); // /api/trainingRoom 경로에 MP3 관련 라우터 추가

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 시작되었습니다`);
});