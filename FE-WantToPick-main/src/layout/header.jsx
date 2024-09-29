import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { FiUser, FiBell } from 'react-icons/fi'; // Feather 아이콘
import LoginPopup from './_components/loginPopup';
import { routes } from '../constants/routes';
import { useAuth } from './_hooks/useAuth'; // useAuth 훅 사용
import { usePopup } from './_hooks/usePopup';

export default function Header() {
  const { isLoggedIn, username, logout } = useAuth(); // useAuth에서 isLoggedIn, username, logout 가져오기
  const { isPopupOpen, togglePopup } = usePopup();

  const [isTrainingRoomHover, setIsTrainingRoomHover] = useState(false);
  const [isCommunityHover, setIsCommunityHover] = useState(false);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      logout();  // 로그아웃 시 팝업을 열지 않음
    } else {
      togglePopup();  // 로그인 시 팝업 열기/닫기
    }
  };

  return (
    <>
      <header className="bg-white text-black shadow-md fixed w-full h-[60px] z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Link to={routes.home}>
              <img src={logo} alt="Logo" className="w-12 mr-8" />
            </Link>
            <nav className="flex space-x-1">
              <Link
                to={routes.home}
                className="relative group text-black px-6 py-1 rounded-full hover:bg-black hover:text-white transition-all duration-200 ease-in-out"
              >
                HOME
              </Link>
              <Link
                to={routes.trainingRoom}
                className="relative group text-black px-6 py-1 rounded-full hover:bg-black hover:text-white transition-all duration-200 ease-in-out"
              >
                트레이닝룸
              </Link>
              <Link
                to={routes.recruit}
                className="relative group text-black px-6 py-1 rounded-full hover:bg-black hover:text-white transition-all duration-200 ease-in-out"
              >
                모집공고
              </Link>
              <Link
                to={routes.community}
                className="relative group text-black px-6 py-1 rounded-full hover:bg-black hover:text-white transition-all duration-200 ease-in-out"
              >
                커뮤니티
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4 relative">
            {isLoggedIn ? (
              <>
                <FiBell className="text-xl cursor-pointer" />
                <Link to={routes.mypage}>
                  <FiUser className="text-xl cursor-pointer" />
                </Link>
                <div className="flex items-center">
                  <span className="mx-2">{username}님</span> {/* 로그인한 사용자의 이름 표시 */}
                  <button className="bg-white text-[#526DF8] py-1 rounded-md hover:bg-opacity-50" onClick={logout}>
                    로그아웃
                  </button>
                </div>
                <button className="bg-[#526DF8] font-extrabold text-white px-5 py-1 rounded-md hover:text-opacity-50">
                  <Link to={routes.portfolioIntro}>
                    포트폴리오 +
                  </Link>
                </button>
              </>
            ) : (
              <button onClick={handleButtonClick} className="hover:text-gray-700">
                로그인
              </button>
            )}
          </div>
        </div>
        <LoginPopup isOpen={isPopupOpen} togglePopup={togglePopup} />
      </header>
      <div className="pt-[60px]"></div>
    </>
  );
}
