require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const connectDB = require('./lib/db'); // MongoDB 연결 파일
const mongoose = require('mongoose'); // mongoose를 가져옵니다.
const mongoURI = process.env.MONGO_URI;
const multer = require('multer'); // multer 추가
const path = require('path'); // path 모듈 추가
const { exec } = require('child_process'); // child_process 추가
const sessionConfig = require('./config/session'); // 세션 설정
const sessionRoutes = require('./routes/session'); // 세션에 데이터 저장하는 라우터
const signUpRoutes = require('./routes/signUp'); // /signin 라우터
const loginRoutes = require('./routes/login'); // 새로운 로그인 경로
const selfIntroductionRoutes = require('./routes/selfIntroduction');
const profileRoutes = require('./routes/selfProfile');
const videoRoutes = require('./routes/video'); // 비디오 업로드/다운로드 라우터 추가
const musicRoutes = require('./routes/trainingRoom'); // 노래 업로드/다운로드 라우터 추가

const app = express();

// CORS 설정
app.use(cors()); // 모든 도메인에서의 요청 허용
app.use(express.json()); // JSON 요청 바디를 파싱

// MongoDB 연결
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// MongoDB 연결
connectDB(); // MongoDB 연결 함수 호출

// multer 설정
const upload = multer({ dest: 'uploads/' }); // 파일 업로드를 위한 multer 설정

// /api/training 엔드포인트
app.post('/api/training', upload.single('file'), (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.file.filename); // 업로드된 파일 경로

    // Python 스크립트 실행
    const pythonProcess = exec(`python analyze_audio.py ${filePath}`);

    pythonProcess.stdout.on('data', (data) => {
        const results = JSON.parse(data.toString());
        res.json(results); // 분석 결과를 클라이언트에 전송
    });


// 라우터 설정
app.use('/api/session', sessionRoutes); // 세션에 데이터 저장 라우터
app.use('/api', signUpRoutes); // /sign_up 라우터
app.use('/api', loginRoutes);  // /api/login 라우트를 추가
app.use('/api', selfIntroductionRoutes);
app.use('/api', profileRoutes);

// 비디오 업로드 및 다운로드 라우터
app.use('/api/video', videoRoutes); // /api/video 경로에 비디오 관련 라우터 추가

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Error: ${data}`);
        res.status(500).send('Error analyzing the audio file');
    });
});


// 라우터 등록
const trainingRoomRoutes = require('./routes/trainingRoom');
app.use('/api/trainingRoom', trainingRoomRoutes); // 라우터 등록

// 서버 시작
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
