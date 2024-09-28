import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// 세션에 이름 저장 함수
export const saveName = async (name) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/session/name`, { name }, { withCredentials: true });
    console.log('이름 저장 응답:', response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('이름 저장 오류:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 세션에 생년월일 저장 함수
export const saveBirthDate = async (birthdate) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/session/birthdate`, { birthdate }, { withCredentials: true });
    console.log('생년월일 저장 응답:', response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('생년월일 저장 오류:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 세션에 성별 저장 함수
export const saveGender = async (gender) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/session/gender`, { gender }, { withCredentials: true });
    console.log('성별 저장 응답:', response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('성별 저장 오류:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 세션에 이메일 저장 함수
export const saveEmail = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/session/email`, { email }, { withCredentials: true });
    console.log('이메일 저장 응답:', response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('이메일 저장 오류:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 세션에 사용자명 저장 함수
export const saveUsername = async (username) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/session/username`, { username }, { withCredentials: true });
    console.log('사용자명 저장 응답:', response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('사용자명 저장 오류:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 세션에 비밀번호 저장 함수
export const savePassword = async (password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/session/password`, { password }, { withCredentials: true });
    console.log('비밀번호 저장 응답:', response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('비밀번호 저장 오류:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 모든 정보를 저장하는 함수 (/signin으로 전송)
export const saveAllInfo = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sign_up`, {}, { withCredentials: true });  // withCredentials 추가로 세션 공유
    console.log('모든 정보 저장 응답:', response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('모든 정보 저장 오류:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 포트폴리오의 프로필/자기소개서 튜플 추가하는 함수 (/self-introduction으로 전송)
export const addPortfolioInfo = async (username) => {
  const portfolioData = {
    username: username,
    training_period: ' ',
    experience: ' ',
    nationality: ' ',
    motivation: ' ',
    mbti: ' ',
    favorite_songs: {
      song1: ' ',
      song2: ' '
    },
    role_model: ' ',
    specialty: ' ',
    charm_points: ' ',
    my_dream: ' '
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/self-introduction`, portfolioData, { withCredentials: true });
    console.log('포트폴리오 정보 저장 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('포트폴리오 정보 저장 오류:', error.response ? error.response.data : error.message);
    throw error;
  }
};
