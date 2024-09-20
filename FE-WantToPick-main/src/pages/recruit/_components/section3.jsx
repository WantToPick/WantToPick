import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import
import brand_logo from '../../../assets/images/recruit/brand_logo.png';

export default function Section3() {
    const [activeButton, setActiveButton] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // 한 페이지에 보여줄 항목 수
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleButtonClick = (buttonIndex) => {
        setActiveButton(buttonIndex);
    };

    // 데이터(임시로 넣었어요)
    const data = Array(45).fill().map((_, i) => ({
        id: i + 1, // 고유 ID 추가
        img: brand_logo,
        text: `YG의 미래를 이끌어갈 남자 연습생을 모집합니다 :)`
    }));

    // 페이지에 맞는 데이터 필터링
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemClick = (id) => {
        navigate(`/detail/${id}`); // 상세 페이지로 이동
    };

    return (
        <div>
            <div className="flex justify-center">
                <input
                    type="search"
                    placeholder="내가 PICK할 엔터테인먼트는 어딜까?"
                    className="w-1/2 px-4 py-2 mt-5 border-b border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-700"
                />
            </div>
            <div className="flex justify-end mt-16 space-x-2 mr-5">
                <button
                    className={`${activeButton === 0 ? 'text-black font-bold' : 'text-gray-500'}`}
                    onClick={() => handleButtonClick(0)}
                >
                    추천순
                </button>
                <button
                    className={`${activeButton === 1 ? 'text-black font-bold' : 'text-gray-500'}`}
                    onClick={() => handleButtonClick(1)}
                >
                    최신순
                </button>
                <button
                    className={`${activeButton === 2 ? 'text-black font-bold' : 'text-gray-500'}`}
                    onClick={() => handleButtonClick(2)}
                >
                    마감순
                </button>
                <button
                    className={`${activeButton === 3 ? 'text-black font-bold' : 'text-gray-500'}`}
                    onClick={() => handleButtonClick(3)}
                >
                    찜순
                </button>
            </div>
            <div>
                <div className="ml-14 flex flex-wrap gap-4 mt-8">
                    {currentItems.map((item, index) => (
                        <div
                            key={index}
                            className="h-48 w-[30%] rounded-2xl ml-5 flex flex-col border border-[#D9D9D9] cursor-pointer"
                            onClick={() => handleItemClick(item.id)} // 클릭 시 상세 페이지로 이동
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

                {/* 페이지네이션 버튼 */}
                <div className="flex justify-center mt-8">
                    {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(number => (
                        <button
                            key={number}
                            onClick={() => handlePageChange(number + 1)}
                            className={`mx-1 px-3 py-1 border rounded ${currentPage === number + 1 ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}
                        >
                            {number + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
