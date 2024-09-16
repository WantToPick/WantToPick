import React from 'react';
import header3Image from '../../../assets/images/home/header3.png';
import { Link } from 'react-router-dom';
import { routes } from '../../../constants/routes';

export default function Slide3() {
    return (
        <section
            className={`flex flex-col items-center justify-center py-24 px-4 sm:px-10 md:px-20 lg:px-40 bg-cover bg-center bg-no-repeat w-full h-auto`} // 반응형 배경 및 패딩 설정
            style={{
                backgroundImage: `url(${header3Image})`,
            }}
        >
            <div className="text-center sm:text-left w-full max-w-screen-lg">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 mb-4">
                    다른 연습생들과 자유롭게 소통하기
                </h2>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10">
                    다채로운 커뮤니티 공간
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8">
                    다양한 커뮤니티 기능으로 연습생들끼리 정보를 공유하고 함께 성장하세요.
                </p>
                <Link to={routes.freeBoard} className="px-6 py-3 bg-white text-gray-700 font-medium rounded-full shadow-md hover:shadow-lg transition inline-block">
                    커뮤니티 바로가기 ➔
                </Link>
            </div>
        </section>
    );
}
