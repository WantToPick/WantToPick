import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { usePortfolio } from '../_hooks/usePortfolio';
import img7 from '../../../assets/images/portfolio/vs1.png'
import img8 from '../../../assets/images/portfolio/vs2.png'
import img9 from '../../../assets/images/portfolio/vs3.png'


export default function ImagePortfolioPage() {
  const { username } = useOutletContext();  // Outlet에서 전달된 context 받아오기

  const initialData = [
    { id: 1, title: '2024 개인 프로필 촬영', description: '비주얼 사진', thumbnail: img7 },
    { id: 2, title: '2023 개인 프로필 촬영', description: '비주얼 사진', thumbnail: img8 },
    { id: 3, title: '2023 흑백 프로필 촬영', description: '비주얼 사진', thumbnail: img9 },
    // 더 많은 데이터...
  ];

  const {
    currentPage,
    paginatedData,
    isEditing,
    selectedItems,
    totalPages,
    setCurrentPage,
    handleEditClick,
    handleSelectItem,
    handleDeleteSelected,
  } = usePortfolio(initialData);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">이미지 포트폴리오</h1>
        {isEditing ? (
          <div className="flex space-x-4">
            <button onClick={handleDeleteSelected} className="text-red-600 underline">
              삭제
            </button>
            <button onClick={handleEditClick} className="text-gray-600 underline">
              완료
            </button>
          </div>
        ) : (
          <button onClick={handleEditClick} className="text-gray-600 underline">
            편집
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        {paginatedData.map(item => (
          <div key={item.id} className="relative border p-4 rounded">
            {isEditing && (
              <input
                type="checkbox"
                className="absolute top-2 right-2"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleSelectItem(item.id)}
              />
            )}
            <Link to={`/portfolio/image?id=${item.id}`}>
              <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-cover mb-2 rounded" />
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-4 py-2 mx-1 ${currentPage === 1 ? 'text-gray-500' : 'text-blue-500'} `}
        >
          이전
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'font-bold text-blue-500' : 'text-gray-500'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-4 py-2 mx-1 ${currentPage === totalPages ? 'text-gray-500' : 'text-blue-500'}`}
        >
          다음
        </button>
      </div>
    </div>
  );
}
