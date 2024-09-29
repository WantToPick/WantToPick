import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../api';  // API 함수 가져오기

export default function ProfileHeader({ username }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null); // DB에서 가져온 프로필 데이터
  const [editProfileData, setEditProfileData] = useState(null); // 사용자가 수정한 임시 데이터

  // profiledb에서 데이터 가져오기
  useEffect(() => {
    if (username) {
      getProfile(username)  // username을 전달하여 해당 데이터만 가져옴
        .then(data => {
          setProfileData(data);
          setEditProfileData(data); // 처음에는 profileData와 동일하게 초기화
        })
        .catch(error => {
          console.error('데이터 가져오기 에러:', error);
        });
    }
  }, [username]);

  // 편집 상태 변경
  const handleEditClick = () => {
    if (isEditing && editProfileData) {
      // 완료 버튼 클릭 시 수정된 데이터 저장
      updateProfile(editProfileData, username)
        .then(data => {
          console.log('데이터 저장 성공:', data);
          setProfileData(editProfileData); // 서버에 저장한 내용을 화면에 반영
        })
        .catch(error => {
          console.error('데이터 저장 실패:', error);
        });
    }
    setIsEditing(!isEditing);
  };

  // 입력 값 변경 핸들러 (편집 모드에서만 사용)
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('keywords')) {
      const [_, kw] = name.split('_');  // name에서 'keywords' 뒤의 숫자 부분을 가져옴 (예: kw1, kw2 등)
      setEditProfileData(prevData => ({
        ...prevData,
        keywords: {
          ...prevData.keywords,  // 기존 keywords 객체 복사
          [kw]: value  // 새로운 값으로 kw1, kw2, kw3 등 갱신
        }
      }));
    } else {
      setEditProfileData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  // profileData가 없으면 로딩 상태 표시
  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-[#FFEAEB]/50 to-[#CEDAFF]/50 px-10 py-4 text-black flex justify-between items-start">
      <div className="flex items-center w-9/12">
        {/* 이미지 박스의 크기를 고정된 크기로 설정 */}
        <div className="w-40 h-52 bg-gray-300 rounded-lg flex-shrink-0" />
        <div className="ml-8">
          <div className="flex mb-2">
            <p className="text-lg font-bold w-24">이름</p>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editProfileData?.name || ''}
                onChange={handleInputChange}
                className="border border-black rounded px-2 py-1"
              />
            ) : (
              <p className="text-lg font-normal">{profileData.name}</p>
            )}
          </div>
          <div className="flex mb-2">
            <p className="text-lg font-bold w-24">생년월일</p>
            {isEditing ? (
              <input
                type="date"
                name="birthdate"
                value={editProfileData?.birthdate || ''}
                onChange={handleInputChange}
                className="border border-black rounded px-2 py-1"
              />
            ) : (
              <p className="text-lg font-normal">{profileData.birthdate}</p>
            )}
          </div>
          <div className="flex mb-2">
            <p className="text-lg font-bold w-24">이메일</p>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editProfileData?.email || ''}
                onChange={handleInputChange}
                className="border border-black rounded px-2 py-1"
              />
            ) : (
              <p className="text-lg font-normal">{profileData.email}</p>
            )}
          </div>
          <div className="flex mb-2">
            <p className="text-lg font-bold w-24">포지션</p>
            {isEditing ? (
              <input
                type="text"
                name="position"
                value={editProfileData?.position || ''}
                onChange={handleInputChange}
                className="border border-black rounded px-2 py-1"
              />
            ) : (
              <p className="text-lg font-normal">{profileData.position}</p>
            )}
          </div>
          <div className="flex">
            <p className="text-lg font-bold w-24">키워드</p>
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="keywords_kw1"
                    value={editProfileData?.keywords?.kw1 || ''}
                    onChange={handleInputChange}
                    className="border border-black rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    name="keywords_kw2"
                    value={editProfileData?.keywords?.kw2 || ''}
                    onChange={handleInputChange}
                    className="border border-black rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    name="keywords_kw3"
                    value={editProfileData?.keywords?.kw3 || ''}
                    onChange={handleInputChange}
                    className="border border-black rounded px-2 py-1"
                  />
                </>
              ) : (
                <>
                  {profileData.keywords?.kw1 && (
                    <span className="inline-block bg-black text-white px-3 py-1 rounded-full">
                      {profileData.keywords.kw1}
                    </span>
                  )}
                  {profileData.keywords?.kw2 && (
                    <span className="inline-block bg-black text-white px-3 py-1 rounded-full">
                      {profileData.keywords.kw2}
                    </span>
                  )}
                  {profileData.keywords?.kw3 && (
                    <span className="inline-block bg-black text-white px-3 py-1 rounded-full">
                      {profileData.keywords.kw3}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleEditClick}
          className="border border-black text-black font-bold py-1 px-4 rounded-3xl hover:bg-gray-300"
        >
          {isEditing ? '완료' : '프로필 수정'}
        </button>
        <button className="border border-black text-black font-bold py-1 px-4 rounded-3xl hover:bg-gray-300">
          포트폴리오 업로드
        </button>
      </div>
    </div>
  );
}
