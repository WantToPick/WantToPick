import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// self_introductiondb에서 데이터 가져오기 (GET 요청)
export const getSelfIntroduction = () => {
  return axios.get(`${API_BASE_URL}/self-introduction`)
    .then(response => response.data)
    .catch(error => {
      console.error('데이터 가져오기 에러:', error);
      throw error;
    });
};

// self_introductiondb에 데이터 저장하기 (PUT 요청)
export const updateSelfIntroduction = (editData) => {
  return axios.put(`${API_BASE_URL}/self-introduction`, editData)
    .then(response => response.data)
    .catch(error => {
      console.error('데이터 저장 실패:', error);
      throw error;
    });
};
