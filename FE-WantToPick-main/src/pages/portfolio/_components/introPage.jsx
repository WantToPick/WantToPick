import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getSelfIntroduction, updateSelfIntroduction } from '../api';  // API 함수 가져오기

export default function IntroPage() {
  const { username } = useOutletContext();  // Outlet에서 전달된 context 받아오기

  const [isEditing, setIsEditing] = useState(false);
  const [selfIntroductionData, setSelfIntroductionData] = useState(null); // DB에서 가져온 자기소개 데이터
  const [editSelfIntroductionData, setEditSelfIntroductionData] = useState(null); // 사용자가 수정한 임시 데이터

  // self_introductiondb에서 데이터 가져오기
  useEffect(() => {
    if (username) {
      getSelfIntroduction(username)  // username을 전달하여 해당 데이터만 가져옴
        .then(data => {
          setSelfIntroductionData(data);
          setEditSelfIntroductionData(data); // 처음에는 selfIntroductionData와 동일하게 초기화
        })
        .catch(error => {
          console.error('데이터 가져오기 에러:', error);
        });
    }
  }, [username]);

  // 편집 상태 변경
  const handleEditClick = () => {
    if (isEditing && editSelfIntroductionData) {
      // 완료 버튼 클릭 시 수정된 데이터 저장
      updateSelfIntroduction(editSelfIntroductionData, username)
        .then(data => {
          console.log('데이터 저장 성공:', data);
          setSelfIntroductionData(editSelfIntroductionData); // 서버에 저장한 내용을 화면에 반영
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
  
    if (name.startsWith('favorite_songs')) {
      const [_, songKey] = name.split('_');  // name을 통해 'song1' 또는 'song2' 구분
      setEditSelfIntroductionData(prevData => ({
        ...prevData,
        favorite_songs: {
          ...prevData.favorite_songs,  // 기존 favorite_songs 값 복사
          [songKey]: value  // 새로운 값 할당
        }
      }));
    } else {
      setEditSelfIntroductionData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  if (!selfIntroductionData) {
    return <div>Loading...</div>; // 데이터를 가져오기 전 로딩 상태 표시
  }

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
              { label: '연습기간', value: editSelfIntroductionData.training_period, name: 'training_period' },
              { label: '경력', value: editSelfIntroductionData.experience, name: 'experience' },
              { label: '국적', value: editSelfIntroductionData.nationality, name: 'nationality' },
              { label: '지원동기', value: editSelfIntroductionData.motivation, name: 'motivation' },
              { label: 'MBTI', value: editSelfIntroductionData.mbti, name: 'mbti' },
            ].map((item, index) => (
              <div key={index} className="flex">
                <span className="text-gray-400 w-32">{item.label}</span>
                <div className="flex-grow">
                  {isEditing ? (
                    <input
                      type="text"
                      name={item.name}
                      value={item.value || ''}
                      onChange={handleInputChange}
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
            {/* 좋아하는 노래 */}
            <div className="flex">
              <span className="text-gray-400 w-32">좋아하는 노래</span>
              <div className="flex-grow">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="favorite_songs_song1"
                      value={editSelfIntroductionData.favorite_songs?.song1 || ''}
                      onChange={handleInputChange}
                      className="border rounded-lg w-full mt-1 p-1"
                      placeholder="노래 1"
                    />
                    <input
                      type="text"
                      name="favorite_songs_song2"
                      value={editSelfIntroductionData.favorite_songs?.song2 || ''}
                      onChange={handleInputChange}
                      className="border rounded-lg w-full mt-1 p-1"
                      placeholder="노래 2"
                    />
                  </>
                ) : (
                  <p className="text-black">
                    {editSelfIntroductionData.favorite_songs?.song1}<br />
                    {editSelfIntroductionData.favorite_songs?.song2}
                  </p>
                )}
              </div>
            </div>

            {/* 나머지 추가 정보 */}
            {[
              { label: '롤모델', value: editSelfIntroductionData.role_model, name: 'role_model' },
              { label: '특기', value: editSelfIntroductionData.specialty, name: 'specialty' },
              { label: '매력 포인트', value: editSelfIntroductionData.charm_points, name: 'charm_points' },
              { label: '나의 각오', value: editSelfIntroductionData.my_dream, name: 'my_dream' },
            ].map((item, index) => (
              <div key={index} className="flex">
                <span className="text-gray-400 w-32">{item.label}</span>
                <div className="flex-grow">
                  {isEditing ? (
                    <input
                      type="text"
                      name={item.name}
                      value={item.value || ''}
                      onChange={handleInputChange}
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
