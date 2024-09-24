import React from 'react';
import section4Image from '../../../assets/images/home/section4.png'

export default function Section4() {
    return (
        <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-10 md:px-32 bg-gradient-to-b from-white to-[#E1E8FF]">
            {/* 타이틀 섹션 */}
            <div className="text-right mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">My Portfolio</h2>
                <p className="text-gray-600 text-lg">나를 보여주는 포트폴리오를 만들어볼까?</p>
            </div>

            {/* 이미지 섹션 */}
            <div className="px-4 flex justify-center">
                <img 
                    src={section4Image} 
                    alt="profile" 
                    className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl h-auto" 
                />
            </div>
        </section>
    );
}
