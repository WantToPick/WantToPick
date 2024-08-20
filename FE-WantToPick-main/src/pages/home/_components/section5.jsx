import React from 'react';
import checkIcon from '../../../assets/images/home/signin1.png'; // 체크 아이콘 이미지 경로
import diamondIcon from '../../../assets/images/home/signin2.png'; // 다이아몬드 아이콘 이미지 경로

const CircleArrowIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="currentColor"
        className="w-10 h-10"
    >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3l3 3-3 3" />
    </svg>
);

export default function Section5() {
    return (
        <section className="py-32 bg-white">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">이제, 회원가입하고<br />내게 딱 맞는 기획사와 연습생을 만나보세요</h2>
                <div className="flex justify-center text-left space-x-8">
                    <div className="bg-[#CDD5FF] p-10 rounded-3xl w-1/3 relative flex flex-col justify-between">
                        <div>
                            <h3 className="text-[#526DF8] text-lg mb-2">나에게 딱 맞는 기획사를 찾고 싶다면 ?</h3>
                            <h4 className="text-[#153BFF] text-2xl font-bold mb-4">회원가입하고<br />나만의 기획사 픽하기</h4>
                            <div className="text-[#526DF8]">
                                <a href="#" className="flex items-center">
                                    <CircleArrowIcon />
                                </a>
                            </div>
                        </div>
                        <img src={checkIcon} alt="Check Icon" className="self-end w-20 mt-24" />
                    </div>
                    <div className="bg-[#FFE7E7] p-10 rounded-3xl w-1/3 relative flex flex-col justify-between">
                        <div>
                            <h3 className="text-[#F38F94] text-lg mb-2">우리 기획사의 스타를 찾고 싶다면 ?</h3>
                            <h4 className="text-[#C24F55] text-2xl font-bold mb-4">회원가입하고<br />숨은 보석 픽하기</h4>
                            <div className="text-[#C24F55]">
                                <a href="#" className="flex items-center">
                                    <CircleArrowIcon />
                                </a>
                            </div>
                        </div>
                        <img src={diamondIcon} alt="Diamond Icon" className="self-end w-20 mt-24" />
                    </div>
                </div>
            </div>
        </section>
    );
}
