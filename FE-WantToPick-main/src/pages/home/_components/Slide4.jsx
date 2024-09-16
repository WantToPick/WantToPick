import React from 'react';
import header4Image from '../../../assets/images/home/header4.png';
import { Link } from 'react-router-dom';
import { routes } from '../../../constants/routes';

export default function Slide4() {
    return (
        <section
            className={`flex flex-col items-center justify-center py-24 px-4 sm:px-10 md:px-20 lg:px-40 bg-cover bg-center bg-no-repeat w-full h-auto`} // 반응형 패딩 및 배경 이미지 설정
            style={{
                backgroundImage: `url(${header4Image})`,
            }}
        >
            <div className="text-center sm:text-left w-full max-w-screen-lg">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 mb-4">
                    자신의 색을 보여주세요
                </h2>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10">
                    포트폴리오를 통해 자신을 어필하세요
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8">
                    연습생들이 자유롭게 포트폴리오를 올리고 공유할 수 있습니다.
                </p>
                <Link to={routes.portfolio} className="px-6 py-3 bg-white text-gray-700 font-medium rounded-full shadow-md hover:shadow-lg transition inline-block">
                    포트폴리오 바로가기 ➔
                </Link>
            </div>
        </section>
    );
}
