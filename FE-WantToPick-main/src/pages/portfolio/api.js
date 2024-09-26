// 자기소개서가 DB에 없는 경우(최초 작성하는 경우)에 자꾸 에러가 발생함...
// 기존에 dB에 있는 경우엔 데이터 불러오고, 수정하는거 잘 됨

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// username에 해당하는 자기소개 데이터를 가져오기 (GET 요청)
export const getSelfIntroduction = async (username) => {
  try {
    // 먼저 GET 요청으로 데이터를 가져옵니다.
    let response = await axios.get(`${API_BASE_URL}/self-introduction`, {
      params: { username }  // 쿼리 파라미터로 username 전달
    });
    
    // 데이터가 있으면 반환
    return response.data;
    
  } catch (error) {
    // 404 에러일 경우 POST로 새로운 데이터를 추가
    if (error.response && error.response.status === 404) {
      console.log('데이터가 없으므로 새로운 데이터를 생성합니다.');

      const defaultData = {
        username,  // username을 포함한 기본 값
        training_period: '',
        experience: '',
        nationality: '',
        motivation: '',
        mbti: '',
        favorite_songs: { song1: '', song2: '' },
        role_model: '',
        specialty: '',
        charm_points: '',
        my_dream: ''
      };

      // POST 요청으로 데이터 생성
      let postResponse = await axios.post(`${API_BASE_URL}/self-introduction`, defaultData);

      // 생성된 데이터를 다시 GET 요청으로 가져오기
      return postResponse.data;
    }

    // 404 이외의 다른 에러는 그대로 처리
    console.error('데이터 가져오기 또는 생성 에러:', error);
    throw error;
  }
};



// self_introductiondb에 데이터 저장하기 (PUT 요청)
export const updateSelfIntroduction = (editData, username) => {
  return axios.put(`${API_BASE_URL}/self-introduction`, { ...editData, username })
    .then(response => response.data)
    .catch(error => {
      console.error('데이터 저장 실패:', error);
      throw error;
    });
};
