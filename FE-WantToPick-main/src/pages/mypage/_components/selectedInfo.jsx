import brand_logo from '../../../assets/images/recruit/brand_logo.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { routes } from '../../../constants/routes';

export default function SelectedInfo() {
    const [activeButton, setActiveButton] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    const data = Array(45).fill().map((_, i) => ({
        id: i + 1,
        img: brand_logo,
        text: 'YG의 미래를 이끌어갈 남자 연습생을 모집합니다 :)'
    }));

    const indexOfLastItem = currentPage * itemsPerPage;
    const currentItems = data.slice(indexOfLastItem - itemsPerPage, indexOfLastItem);

    const handleItemClick = (id) => {
        navigate(`/detail/${id}`);
    };

    return (
        <div className="mt-7 flex h-screen">
            <div className="w-96 p-4 border-r border-gray-300 mt-10">
                <div className="mt-6">
                    <h2 className="text-[15px] font-semibold mb-4">카테고리</h2>
                    <div className="flex flex-wrap gap-2">
                        {['전체', 'K-POP', '비주얼', '보컬', '발라드', 'R&B', '댄스', '밴드', '힙합', '랩', '기타'].map((category, i) => (
                            <button
                                key={i}
                                className="py-3 px-5 bg-white rounded-[25px] text-[12px] border border-black hover:bg-[#D9D9D9] focus:outline-none"
                                onClick={() => setActiveButton(i)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-[15px] font-semibold mb-4">회사의 규모</h2>
                    <div className="flex flex-wrap gap-2">
                        {['대형', '중형', '소형'].map((size, i) => (
                            <button key={i} className="py-3 px-5 bg-white rounded-[25px] text-[12px] border border-black hover:bg-[#D9D9D9] focus:outline-none">
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-[15px] font-semibold mb-4">성별</h2>
                    <div className="flex space-x-2">
                        {['모두', '남성', '여성'].map((gender, i) => (
                            <div key={i} className="flex items-center">
                                <input id={gender} type="radio" name="gender" className="mr-2 leading-tight" />
                                <label htmlFor={gender} className="text-sm">{gender}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-[15px] font-semibold mb-4">연령</h2>
                    <select className="py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">연령을 선택하세요</option>
                        {Array.from({ length: 21 }, (_, i) => i + 10).map(age => (
                            <option key={age} value={age}>{age}세</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex-grow p-4">
                <div className="border-b border-gray-300 pb-4 -ml-4">
                    <div className="flex items-center ml-4">
                        <Link to={routes.mypage}>
                            <button className="text-xl p-1">{'\u2190'}</button>
                        </Link>
                        <h3 className="font-bold text-2xl ml-3">마이페이지</h3>
                    </div>
                </div>
                <div className="w-[90%] ml-7 mt-14 h-[100%] border border-gray-300 rounded-xl flex flex-col justify-start pt-16 px-10">
                    <h2 className="font-bold text-xl mb-6">찜한 모집공고 보기</h2>
                    <hr />
                    <div className="ml-5 flex flex-wrap gap-4 mt-8">
                        {currentItems.map((item) => (
                            <div
                                key={item.id}
                                className="h-48 w-[30%] rounded-2xl ml-5 flex flex-col border border-[#D9D9D9] cursor-pointer"
                                onClick={() => handleItemClick(item.id)}
                            >
                                <div className="flex-1 rounded-t-2xl overflow-hidden">
                                    <img src={item.img} className="w-full h-full object-cover" alt="brand logo" />
                                </div>
                                <div className="flex-1 bg-white rounded-b-2xl flex items-center justify-center">
                                    <p className="text-center text-black">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
