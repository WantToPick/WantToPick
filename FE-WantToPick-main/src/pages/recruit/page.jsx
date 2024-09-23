import React from 'react';
import Section1 from './_components/section1';
import Section2 from './_components/section2';
import Section3 from './_components/section3';


export default function RecruitPage() {
    return (
        <div className="flex h-screen">
            {/* 사이드바 */}
            <div className="w-80 p-4">
                <Section1 />
                <Section2 />
            </div>
            
            {/* 콘텐츠 영역 */}
            <div className="flex-1 p-6 border-l border-gray-300">
               <Section3 />
            </div>
        </div>
    );
}