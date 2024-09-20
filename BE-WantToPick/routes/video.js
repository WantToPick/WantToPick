const express = require('express');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Video = require('../models/Video');
const router = express.Router();

const mongoURI = process.env.MONGO_URI;  // 환경 변수에서 MongoDB URI 가져오기
const conn = mongoose.createConnection(mongoURI);

// GridFS 설정
let gfs;
let gridfsBucket;

conn.once('open', () => {
  gridfsBucket = new GridFSBucket(conn.db, { bucketName: 'videos' });
  gfs = gridfsBucket;
});

// multer 및 GridFSStorage 설정
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'videos',
    };
  },
});
const upload = multer({ storage });

// 비디오 업로드
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const video = new Video({
      title: req.body.title,
      description: req.body.description,
      filename: req.file.filename,
      contentType: req.file.mimetype,
      length: req.file.size,
    });
    await video.save();
    res.status(201).json({ message: 'Video uploaded successfully', video });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload video' });
  }
});

// 비디오 다운로드
router.get('/download/:filename', (req, res) => {
  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'No video file found' });
    }
    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
  });
});

module.exports = router;