require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const mongoURI = process.env.MONGO_URI;  // 환경 변수에서 MongoDB URI 가져오기
const conn = mongoose.createConnection(mongoURI);

// GridFS 설정
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// GridFS 스토리지 설정
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return {
            filename: Date.now() + '-' + file.originalname, // 파일명 설정
            bucketName: 'musics' // GridFS에서 저장될 버킷 이름
        };
    }
});

const upload = multer({ storage });

// ==================================================
// MP3 파일 업로드 API
// ==================================================
router.post('/upload/music', upload.single('file'), (req, res) => {
    res.status(201).json({ file: req.file });
});

// ==================================================
// MP3 파일 다운로드 API
// ==================================================
router.get('/download/music/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({ message: 'No MP3 file found' });
        }
        // MP3 파일 다운로드 스트림 생성
        if (file.contentType === 'music/mpeg' || file.contentType === 'music/mp3') {
            const readStream = gfs.createReadStream(file.filename);
            readStream.pipe(res);
        } else {
            return res.status(404).json({ message: 'Not an MP3 file' });
        }
    });
});

module.exports = router;
