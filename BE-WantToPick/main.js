const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // CORS 패키지 추가
const multer = require('multer'); // Multer 패키지 추가
const { spawn } = require('child_process'); // child_process 패키지 추가
const path = require('path'); // 경로 설정을 위한 패키지 추가
require('dotenv').config(); // 환경 변수 설정

// MongoDB URI
const mongoURI = process.env.MONGO_URI; // 환경 변수에서 MongoDB URI 가져오기

const app = express();

// CORS 설정
app.use(cors()); // 모든 도메인에서의 요청 허용
app.use(express.json()); // JSON 요청 바디를 파싱

// MongoDB 연결
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 파일을 저장할 경로
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // 원래 파일 이름 유지
    },
});
const upload = multer({ storage });

// /api/training 엔드포인트
app.post('/api/training', upload.single('file'), (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.file.filename); // 업로드된 파일 경로

    // Python 스크립트 실행
    const pythonProcess = spawn('python', ['analyze_audio.py', filePath]);

    pythonProcess.stdout.on('data', (data) => {
        const results = JSON.parse(data.toString());
        res.json(results); // 분석 결과를 클라이언트에 전송
    });

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