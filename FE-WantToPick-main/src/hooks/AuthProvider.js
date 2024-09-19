import React, { createContext, useState, useEffect } from 'react';
import { getUsernameFromToken, isLoggedIn as checkLoggedIn, logout as performLogout } from '../layout/_components/api'; // API 함수들 가져오기

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkLoggedIn()); // 초기 값은 JWT 토큰 여부로 판단
  const [username, setUsername] = useState(null);

  // 로그인 처리
  const login = () => {
    setIsAuthenticated(true);
    const usernameFromToken = getUsernameFromToken(); // JWT에서 username 추출
    setUsername(usernameFromToken);
  };

  // 로그아웃 처리
  const logout = () => {
    performLogout(); // 토큰 삭제
    setIsAuthenticated(false);
    setUsername(null);
  };

  // 컴포넌트가 마운트될 때 로그인 상태 및 username 초기화
  useEffect(() => {
    if (isAuthenticated) {
      const usernameFromToken = getUsernameFromToken();
      setUsername(usernameFromToken); // 초기화 시 JWT에서 username 가져오기
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
