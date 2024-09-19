import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logo from '../../assets/images/home/logo.png';
import { routes } from '../../constants/routes';
import { login } from './api';  // API 함수 import

export default function LoginPopup({ isOpen, togglePopup, setIsLoggedIn }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);  // 로그인 실패 메시지를 저장하는 state

  const navigate = useNavigate();
  const location = useLocation();

  const closePopup = () => {
    togglePopup();
    navigate(location.pathname.split('/login')[0]); // 현재 경로에서 '/login'을 제거하여 원래 경로로 돌아감
  };

  const handleLogin = async () => {
    const result = await login(id, password);
  
    if (result.success) {
      setIsLoggedIn(true);
      closePopup();
    } else {
      setError(result.message);  // 로그인 실패 시 에러 메시지 설정
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-[25px] overflow-hidden shadow-lg w-3/4 h-3/4 flex relative">
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl p-2"
        >
          &#x2715; {/* Unicode character for X */}
        </button>
        <div className="w-1/2 p-8 flex flex-col justify-end items-center"
            style={{ background: 'linear-gradient(to bottom right, #FFEAEA, #D7E1FF)' }}
        >
          <div className="absolute bottom-8 left-8 text-left text-[20px] text-[#526DF8]">WANTTOPICK</div>
          <div className="flex items-center justify-center flex-grow">
            <img src={logo} alt="Logo" className="h-14" />
          </div>
        </div>
        <div className="w-1/2 p-8 flex flex-col justify-center h-full">
          <h2 className="text-2xl font-bold mb-4">Log in</h2>
          <div className="mb-10">
              <p className="block text-[#999999] font-bold ">Welcome to WANTTOPICK!</p>
            </div>
          {error && <p className="text-red-500 mb-4">{error}</p>} {/* 에러 메시지 표시 */}
          <form>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter Your ID" 
                value={id}
                onChange={(e) => setId(e.target.value)}  // 아이디 입력 업데이트
                className="w-full px-4 py-2 border border-black rounded-[72px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Enter Your Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}  // 비밀번호 입력 업데이트
                className="w-full px-4 py-2 border border-black rounded-[72px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-[15px]">로그인 유지</span>
              </label>
            </div>
            <button
              type="button"
              className="w-full bg-[#526DF8] text-white py-2 rounded-[72px]"
              onClick={handleLogin}  // 로그인 버튼 클릭 시 handleLogin 실행
            >
              <div className="text-[#FFFFFF] text-[20px]">LOGIN</div>
            </button>
            <div className="flex justify-center mt-10 space-x-4">
              <Link
                to={routes.signUp}
                className="text-black hover:text-[#A7A4A4]"
              >
                회원가입
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
