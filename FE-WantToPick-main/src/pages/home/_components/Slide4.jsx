import React from 'react';
import header4Image from '../../../assets/images/home/header4.png';

export default function Slide4() {
    return (
        <section
            className={`flex flex-col items-center justify-center py-24 bg-cover bg-center bg-no-repeat`}
            style={{
                backgroundImage: `url(${header4Image})`,
            }}
        >
            <div className='text-center mb-10'>
                <div className='flex items-center justify-center mb-5 text-2xl text-gray-700'>
                    아이돌이 되기 위한 첫 걸음
                </div>
                <div className='flex items-center justify-center mb-5'>
                    <div className='text-left text-xl'>
                        <p className='text-4xl font-bold mb-4'>Want To Pick | 원투픽</p>
                        <p className='text-gray-500'>"당신이 선택받는 순간을 위해"</p>
                        <p className='font-medium'>국내유일 아이돌 연습생 플랫폼</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
