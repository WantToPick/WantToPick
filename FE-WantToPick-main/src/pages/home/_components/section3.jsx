import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../constants/routes'; // routes 파일에서 경로 가져옴

export default function Section3() {
    // 전체 공고 데이터 임시로 넣어둠
    const announcements = [
        {
            id: 1,
            title: 'YG엔터테인먼트 남자 연습생 모집',
            deadline: '2024.07.19. 마감',
            company: 'YG엔터테인먼트',
        },
        {
            id: 2,
            title: 'SM엔터테인먼트 여자 연습생 모집',
            deadline: '2024.07.20. 마감',
            company: 'SM엔터테인먼트',
        },
        {
            id: 3,
            title: 'JYP엔터테인먼트 혼성 연습생 모집',
            deadline: '2024.07.22. 마감',
            company: 'JYP엔터테인먼트',
        },
        {
            id: 4,
            title: 'HYBE엔터테인먼트 남자 연습생 모집',
            deadline: '2024.07.25. 마감',
            company: 'HYBE엔터테인먼트',
        },
        {
            id: 5,
            title: 'CUBE엔터테인먼트 여자 연습생 모집',
            deadline: '2024.07.30. 마감',
            company: 'CUBE엔터테인먼트',
        },
        {
            id: 6,
            title: 'PLEDIS엔터테인먼트 여자 연습생 모집',
            deadline: '2024.08.05. 마감',
            company: 'PLEDIS엔터테인먼트',
        },
        {
            id: 7,
            title: '스타쉽엔터테인먼트 남자 연습생 모집',
            deadline: '2024.08.10. 마감',
            company: '스타쉽엔터테인먼트',
        },
    ];

    // 마지막 5개의 공고만 보여주도록 필터링
    const lastFiveAnnouncements = announcements.slice(-5); // 배열의 마지막 5개 항목 추출

    return (
        <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-10 md:px-32 bg-white">
            <div className="flex justify-between items-center mb-8">
                <div className="text-left">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">My One Pick</h2>
                    <p className="text-gray-600 text-lg">여러 엔터의 모집 공고를 확인하세요!</p>
                </div>

                <Link to={routes.recruit} className="text-end">
                    <div className="flex items-center justify-center w-10 h-10 border-2 border-gray-700 rounded-full hover:bg-gray-200 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </Link>
            </div>


            <div className="flex flex-col md:flex-row">
                {/* 왼쪽: 공고 진행 정보 */}
                <div className="mb-8 md:mb-0 md:w-1/3">
                    <div className="text-lg">
                        <span className="text-red-500 font-bold">{lastFiveAnnouncements.length}</span>개 공고 진행중
                    </div>
                </div>

                {/* 오른쪽: 공고 리스트 */}
                <div className="md:w-2/3">
                    <div className="grid grid-cols-1 gap-4">
                        {lastFiveAnnouncements.map((item, index) => (
                            <div key={index} className="flex justify-between items-center pb-4 border-b">
                                {/* 공고 제목 및 마감일 */}
                                <div className="flex flex-col">
                                    {/* Link에 공고 id를 URL 파라미터로 넘김 */}
                                    <Link to={`/recruit?id=${item.id}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                                        {item.title}
                                    </Link>
                                    <span className="text-gray-500 text-sm">{item.deadline}</span>
                                </div>

                                {/* 회사 이름 */}
                                <div className="text-gray-500 text-sm">{item.company}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
