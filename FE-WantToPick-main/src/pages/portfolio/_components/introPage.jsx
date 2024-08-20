import React, { useState } from 'react';

export default function IntroPage() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">자기소개서</h1>
        <button onClick={handleEditClick} className="text-gray-600 underline">
          {isEditing ? '완료' : '편집'}
        </button>
      </div>

      {/* 기본 정보 */}
      <div className="flex items-start mb-6">
        <h2 className="w-32 text-xl font-bold">기본 정보</h2>
        <div className="border rounded-lg p-4 flex-grow">
          <div className="space-y-4">
            {[
              { label: '연습기간', value: '1년 2개월' },
              { label: '경력', value: 'AA 광고 모델 촬영' },
              { label: '국적', value: '대한민국' },
              { label: '지원동기', value: '제 노래와 춤으로 많은 사람들에게 행복을 주고 싶습니다.' },
              { label: 'MBTI', value: 'ENFP' },
            ].map((item, index) => (
              <div key={index} className="flex">
                <span className="text-gray-400 w-32">{item.label}</span>
                <div className="flex-grow">
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={item.value === '미입력' ? '' : item.value}
                      className="border rounded-lg w-full mt-1 p-1"
                    />
                  ) : (
                    <p className="text-black">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 추가 정보 */}
      <div className="flex items-start">
        <h2 className="w-32 text-xl font-bold">추가 정보</h2>
        <div className="border rounded-lg p-4 flex-grow">
          <div className="space-y-4">
            {[
              { label: '좋아하는 노래', value: '아이유  |  아이와 나의 바다' },
              { label: '롤모델', value: '소녀시대' },
              { label: '특기', value: '발라드' },
              { label: '매력 포인트', value: '눈웃음이 예쁘다.' },
              { label: '나의 각오', value: '아이돌로서 무대에 서는 것은 항상 제 꿈이었으며...' },
            ].map((item, index) => (
              <div key={index} className="flex">
                <span className="text-gray-400 w-32">{item.label}</span>
                <div className="flex-grow">
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={item.value === '미입력' ? '' : item.value}
                      className="border rounded-lg w-full mt-1 p-1"
                    />
                  ) : (
                    <p className="text-black">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
