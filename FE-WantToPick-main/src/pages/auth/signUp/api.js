import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// 이름 저장 함수
export const saveName = async (name) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/name`, { name });
    console.log('이름 저장 응답:', response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('이름 저장 오류:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 생년월일 저장 함수
export const saveBirthDate = async (birthdate) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/birthdate`, { birthdate: birthdate }); // 수정된 필드 이름
    console.log('생년월일 저장 응답:', response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('생년월일 저장 오류:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 성별 저장 함수
export const saveGender = async (gender) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/gender`, { gender });
    console.log('성별 저장 응답:', response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('성별 저장 오류:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 이메일 저장 함수
export const saveEmail = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/email`, { email });
    console.log('이메일 저장 응답:', response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('이메일 저장 오류:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 사용자명 저장 함수
export const saveUsername = async (username) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/username`, { username });
    console.log('사용자명 저장 응답:', response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('사용자명 저장 오류:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 비밀번호 저장 함수
export const savePassword = async (password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/password`, { password });
    console.log('비밀번호 저장 응답:', response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error('비밀번호 저장 오류:', error.response ? error.response.data : error.message);
    throw error;
  }
};
