import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import bannerImage from '../../../assets/images/home/icon.png';

export default function Section1() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className={`flex flex-col items-center justify-center bg-gradient-to-r from-[#FFEAEB]/50 to-[#CEDAFF]/50 pt-24 pb-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className='text-center mb-10'>
                <div className='flex items-center justify-center mb-5'>
                    <div className='flex items-center text-2xl text-gray-700'>
                        <span className='font-semibold'>Pick</span>과 <span className='font-semibold ml-2'>Picker</span>의 만남
                    </div>
                    <span className='text-2xl font-bold text-[#526DF8] ml-2'>'PICK</span>
                    <span className='text-2xl font-bold ml-2'>TO</span>
                    <span className='text-2xl font-bold text-[#FFC4C7] ml-2'>PICK'</span>
                </div>
                <div className='flex items-center justify-center mb-5'>
                    <img src={bannerImage} alt='WTP' className='w-60 h-60 mr-4' />
                    <div className='text-left text-xl'>
                        <p className='text-4xl font-bold mb-4'>Want To Pick | 원투픽</p>
                        <p className='text-gray-500'>"나는 너를 픽하길 원해"</p>
                        <p className='font-medium'>국내유일 엔터테인먼트 X 연습생 매칭 웹 서비스</p>
                    </div>
                </div>
            </div>
            <div className='mt-10 text-gray-400'>
                <Link to="section2" smooth={true} duration={500} className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}