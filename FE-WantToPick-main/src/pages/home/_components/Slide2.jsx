import React from 'react';
import header2Image from '../../../assets/images/home/header2.png';
import { Link } from 'react-router-dom';
import { routes } from '../../../constants/routes';

export default function Slide2() {
    return (
        <section
            className={`flex flex-col items-center justify-center py-24 px-4 sm:px-10 md:px-20 lg:px-40 bg-cover bg-center bg-no-repeat w-full h-auto`} // 반응형 패딩 및 배경 이미지
            style={{
                backgroundImage: `url(${header2Image})`,
            }}
        >
            <div className="text-center sm:text-left w-full max-w-screen-lg">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 mb-4">
                    4가지 요소를 분석하여
                </h2>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10">
                    나만의 맞춤 노래 찾기
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8">
                    키, 음역대, 템포, 포먼트를 분석하여 사용자 맞춤 노래를 추천해줍니다.
                </p>
                <Link to={routes.trainingRoom} className="px-6 py-3 bg-white text-gray-700 font-medium rounded-full shadow-md hover:shadow-lg transition inline-block">
                    트레이닝룸 바로가기 ➔
                </Link>
            </div>
        </section>
    );
}
