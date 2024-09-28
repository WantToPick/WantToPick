const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // CORS 패키지 추가
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

// 라우터 등록
const trainingRoomRoutes = require('./routes/trainingRoom');
app.use('/api/trainingRoom', trainingRoomRoutes); // 라우터 등록

// 서버 시작
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));