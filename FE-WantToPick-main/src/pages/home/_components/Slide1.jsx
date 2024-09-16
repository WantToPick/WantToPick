import React from 'react';
import bannerImage from '../../../assets/images/home/icon.png';
import header1Image from '../../../assets/images/home/header1.png';

export default function Slide1() {
    return (
        <section
            className={`flex flex-col items-center justify-center py-24 px-4 sm:px-10 md:px-20 lg:px-40 bg-cover bg-center bg-no-repeat w-full h-auto`} // bg-cover로 비율 유지, 반응형 패딩 설정
            style={{
                backgroundImage: `url(${header1Image})`,
            }}
        >
            <div className='text-center w-full max-w-screen-lg'>
                <div className='flex items-center justify-center mb-4 text-xl sm:text-2xl text-gray-700'>
                    아이돌이 되기 위한 첫 걸음
                </div>
                <div className='flex flex-col sm:flex-row items-center justify-center'>
                    <img src={bannerImage} alt='WTP' className='w-40 sm:w-48 md:w-60 h-auto mr-0 sm:mr-4 mb-4 sm:mb-0' /> {/* 반응형 이미지 크기 설정 */}
                    <div className='text-center sm:text-left text-lg sm:text-xl'>
                        <p className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4'>Want To Pick | 원투픽</p>
                        <p className='text-gray-500 text-sm sm:text-base md:text-lg'>"당신이 선택받는 순간을 위해"</p>
                        <p className='font-medium text-sm sm:text-base md:text-lg'>국내유일 아이돌 연습생 플랫폼</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
