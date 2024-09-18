require('dotenv').config();  // dotenv 설정 추가

const session = require('express-session');
const MongoStore = require('connect-mongo');

// MongoDB URL
const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DB}`; 

module.exports = {
    secret: 'WantToPick',  // 세션 암호화에 사용할 비밀 키
    resave: false,  // 세션이 수정되지 않아도 세션을 다시 저장할지 여부
    saveUninitialized: true,  // 초기화되지 않은 세션을 저장할지 여부
    cookie: { secure: false },  // HTTPS를 사용하는 경우 secure: true로 설정
    store: MongoStore.create({  // MongoDB를 세션 저장소로 사용
        mongoUrl: mongoUrl,  // MongoDB 연결 URL
        collection: 'sessions',  // 세션 데이터를 저장할 컬렉션 이름
        ttl: 14 * 24 * 60 * 60,  // 세션의 만료 시간 (초 단위), 여기서는 14일
        autoRemove: 'native',  // 자동으로 만료된 세션을 제거하는 옵션
    }),
};