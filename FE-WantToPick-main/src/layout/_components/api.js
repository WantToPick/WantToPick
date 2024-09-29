import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// 로그인 API 함수
export const login = async (username, password, keepLoggedIn) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
      keepLoggedIn  // 로그인 유지 여부 전송
    });

    // 로그인 성공 시 JWT 토큰 반환
    if (response.data.token) {
      localStorage.setItem('token', response.data.token); // 토큰 저장
      return { success: true, token: response.data.token };
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { success: false, message: '잘못된 사용자명 또는 비밀번호입니다.' };
    } else {
      console.error('로그인 요청 중 오류:', error);
      return { success: false, message: '서버 오류가 발생했습니다.' };
    }
  }
};


// JWT에서 username 추출
export const getUsernameFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token); // 토큰 디코딩
    return decodedToken.username; // JWT에서 username 추출
  }
  return null;
};

// 로그인 상태 확인 (로컬 스토리지에 JWT가 있는지 확인)
export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

// 로그아웃
export const logout = () => {
  localStorage.removeItem('token');
};
