import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import { FaHome, FaFileAlt, FaRegImage } from 'react-icons/fa';
import { MdVideoLibrary } from 'react-icons/md';
import { routes } from '../../../constants/routes';

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-white px-8 py-3 border-r border-gray-300">
      <div className="mb-10">
        <img src={logo} alt="Logo" className="w-12 mb-10" />
        <h1 className="text-2xl font-bold">MY PORTFOLIO</h1>
        <p className="text-gray-500 text-base">나를 보여주는 포트폴리오를 만들어볼까?</p>
      </div>

      <ul className="space-y-4">
        <li className="border-b border-gray-300">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-2 hover:font-bold group ${
                isActive ? 'text-black font-bold' : 'text-gray-500'
              }`
            }
          >
            <FaHome className="w-5 h-5 group-hover:text-black" />
            <span className="group-hover:text-black">메인 화면으로 돌아가기</span>
          </NavLink>
        </li>
        <li className="border-b border-gray-300">
          <NavLink
            to={routes.portfolioIntro}
            className={({ isActive }) =>
              `flex items-center space-x-2 hover:font-bold group ${
                isActive ? 'text-black font-bold' : 'text-gray-500'
              }`
            }
          >
            <FaFileAlt className="w-5 h-5 group-hover:text-black" />
            <span className="group-hover:text-black">자기소개서</span>
          </NavLink>
        </li>
        <li className="border-b border-gray-300">
          <div className="flex items-center space-x-2 text-black mt-4">
            <MdVideoLibrary className="w-5 h-5 text-gray-500" />
            <p className='text-gray-500'>비디오 포트폴리오</p>
          </div>
          <ul className="ml-7 space-y-2 my-2">
            <li>
              <NavLink
                to={routes.portfolioVocal}
                className={({ isActive }) =>
                  `hover:font-bold group ${isActive ? 'text-black font-bold' : 'text-gray-500'}`
                }
              >
                <span className="group-hover:text-black">보컬</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={routes.portfolioDance}
                className={({ isActive }) =>
                  `hover:font-bold group ${isActive ? 'text-black font-bold' : 'text-gray-500'}`
                }
              >
                <span className="group-hover:text-black">댄스</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={routes.portfolioRap}
                className={({ isActive }) =>
                  `hover:font-bold group ${isActive ? 'text-black font-bold' : 'text-gray-500'}`
                }
              >
                <span className="group-hover:text-black">랩</span>
              </NavLink>
            </li>
          </ul>
        </li>
        <li className="border-b border-gray-300">
          <NavLink
            to={routes.portfolioImage}
            className={({ isActive }) =>
              `flex items-center space-x-2 hover:font-bold group ${
                isActive ? 'text-black font-bold' : 'text-gray-500'
              }`
            }
          >
            <FaRegImage className="w-5 h-5 group-hover:text-black" />
            <span className="group-hover:text-black">이미지 포트폴리오</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
