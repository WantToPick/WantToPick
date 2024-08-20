import React from 'react';

export default function ProfileHeader() {
  return (
    <div className="bg-gradient-to-r from-[#FFEAEB]/50 to-[#CEDAFF]/50 px-10 py-10 text-black flex justify-between items-start">
      <div className="flex items-center w-9/12">
        <div className="w-40 h-52 bg-gray-300 rounded-lg" />
        <div className="ml-8">
          <div className="flex mb-2">
            <p className="text-lg font-bold w-24">이름</p>
            <p className="text-lg font-normal">미입력</p>
          </div>
          <div className="flex mb-2">
            <p className="text-lg font-bold w-24">생년월일</p>
            <p className="text-lg font-normal">미입력</p>
          </div>
          <div className="flex mb-2">
            <p className="text-lg font-bold w-24">이메일</p>
            <p className="text-lg font-normal">미입력</p>
          </div>
          <div className="flex mb-2">
            <p className="text-lg font-bold w-24">포지션</p>
            <p className="text-lg font-normal">미입력</p>
          </div>
          <div className="flex">
            <p className="text-lg font-bold w-24">키워드</p>
            <div className="flex space-x-2">
              <span className="inline-block bg-black text-white px-3 py-1 rounded-full">미입력</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex space-x-4">
        <button className="border border-black text-black font-bold py-1 px-4 rounded-3xl hover:bg-gray-300">
          프로필 수정
        </button>
        <button className="border border-black text-black font-bold py-1 px-4 rounded-3xl hover:bg-gray-300">
          포트폴리오 업로드
        </button>
      </div>
    </div>
  );
}
