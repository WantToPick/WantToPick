const express = require('express');
const router = express.Router();
const Grid = require('gridfs-stream');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const { exec } = require('child_process'); // Python 스크립트 실행 모듈
const mongoose = require('mongoose'); // 이미 DB 연결이 되어 있으므로 재사용 가능

// GridFS 설정 (이미 연결된 Mongoose 인스턴스가 있다고 가정)
let gfs;
mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('musics');
});

// GridFS 스토리지 설정
const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return {
            filename: Date.now() + '-' + file.originalname,
            bucketName: 'musics' // 버킷 이름 설정
        };
    }
});

const upload = multer({ storage });

// MP3 파일 업로드 APIconst fs = require('fs'); // 파일 시스템 모듈
const path = require('path'); // 경로 모듈

router.post('/upload', upload.single('file'), (req, res) => {
    console.log('File uploaded:', req.file);

    // GridFS에서 파일 읽기
    const readStream = gfs.createReadStream({ filename: req.file.filename });
    const tempFilePath = path.join(__dirname, `../temp/${req.file.filename}`);  // 임시 파일 경로 설정

    // 임시 파일에 쓰기
    const writeStream = fs.createWriteStream(tempFilePath);

    readStream.pipe(writeStream).on('finish', () => {
        // Python 스크립트 실행
        const pythonScriptPath = path.join(__dirname, '../analyze_audio.py');  // Python 스크립트 절대 경로
        const pythonProcess = exec(`python3 ${pythonScriptPath} ${tempFilePath}`, (error, stdout, stderr) => {
            // 임시 파일 삭제
            fs.unlinkSync(tempFilePath);

            if (error) {
                console.error(`Error executing script: ${error}`);
                return res.status(500).json({ error: 'Audio analysis failed' });
            }

            try {
                const result = JSON.parse(stdout);
                res.status(201).json(result); // 분석 결과 반환
            } catch (parseError) {
                console.error('Parsing error:', parseError);
                res.status(500).json({ error: 'Parsing analysis result failed' });
            }
        });
    }).on('error', (err) => {
        console.error('Error writing file to disk:', err);
        res.status(500).json({ error: 'File write failed' });
    });
});


// ==================================================
// MP3 파일 다운로드 API
// ==================================================
router.get('/download/music/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({ message: 'No MP3 file found' });
        }

        if (file.contentType === 'audio/mpeg' || file.contentType === 'audio/mp3') {
            const readStream = gfs.createReadStream(file.filename);
            readStream.pipe(res);
        } else {
            return res.status(400).json({ message: 'Not an MP3 file' });
        }
    });
});

module.exports = router;
