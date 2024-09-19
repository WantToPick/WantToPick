import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../hooks/AuthProvider'; // AuthProvider에서 가져오기
import { login as loginAPI } from '../_components/api'; // 로그인 API 함수 가져오기

export function useAuth() {
  const { isAuthenticated, username, login, logout, setIsAuthenticated } = useContext(AuthContext); // Context에서 가져오기
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 처리
  const handleLogin = async (username, password) => {
    try {
      // 서버에 로그인 요청
      const response = await loginAPI(username, password); // API로 로그인 요청
      if (response.success) {
        login(); // Context API로 로그인 처리
        navigate('/'); // 로그인 후 홈으로 이동
      } else {
        // 로그인 실패 처리
        alert(response.message || '로그인 실패');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('서버와의 통신 중 오류가 발생했습니다.');
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    logout(); // Context API로 로그아웃 처리
    navigate(location.pathname); // 현재 페이지 유지
  };

  return {
    isLoggedIn: isAuthenticated,
    username,
    login: handleLogin,
    logout: handleLogout,
  };
}
