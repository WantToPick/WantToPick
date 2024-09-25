import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const login = () => {
    setIsLoggedIn(true);
    navigate('/');  // 로그인 후 홈으로 이동하거나 적절한 페이지로 이동
  };

  const logout = () => {
    setIsLoggedIn(false);
    navigate(location.pathname);  // 현재 페이지를 그대로 유지
  };

  return {
    isLoggedIn,
    login,
    logout,
    setIsLoggedIn,
  };
}
