import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import group from '../../../assets/images/recruit/group.png';

export default function RecruitDetail() {
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setIsFavorite(!isFavorite);
    };

    const goBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <div className="mt-7 flex h-screen">
            <div className="w-80 p-4 border-r border-gray-300"></div>
            <div className="flex-grow p-4">
                <div className="flex items-center">
                    <button className="text-xl p-1" onClick={goBack}>{'\u2190'}</button>
                    <h3 className="font-bold text-2xl">YG의 미래를 이끌어갈 남자 연습생을 모집합니다 :)</h3>
                    <button
                        className={`text-2xl ml-96 ${isFavorite ? 'text-yellow-300' : 'text-gray-400'}`}
                        onClick={handleClick}
                    >
                        {isFavorite ? '★' : '☆'}
                    </button>
                </div>
                <div className="flex mt-4">
                    <img src={group} className="ml-6 w-8 h-auto" />
                    <p className="text-gray-500 ml-3">YG엔터테인먼트</p>
                </div>
                <div className="mt-14 ml-7 flex">
                    <h3 className="font-bold text-xl mb-2">모집요강</h3>
                    <div style={{ width: '68%' }} className="ml-10 border border-gray-300 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4 p-8">
                            <p className="text-gray-400">모집분야</p>
                            <p className="text-black font-bold">연습생</p>

                            <p className="text-gray-400">모집인원</p>
                            <p className="text-black font-bold">미정</p>

                            <p className="text-gray-400">모집기간</p>
                            <p className="text-black font-bold">2024.07.29 ~ 2024.08.10</p>

                            <p className="text-gray-400">모집연령</p>
                            <p className="text-black font-bold">2005년생 이상</p>

                            <p className="text-gray-400">성별</p>
                            <p className="text-black font-bold">남자</p>

                            <p className="text-gray-400">모집인종</p>
                            <p className="text-black font-bold">무관</p>

                            <p className="text-gray-400">사이트</p>
                            <p className="text-black font-bold">http://yg</p>
                        </div>
                    </div>
                </div>
                <div className="mt-16 ml-7 flex">
                    <h3 className="font-bold text-xl mb-2">상세정보</h3>
                    <div className="ml-32 p-4">
                        <p>주차장에 설치된 시스템 홍보 영상 촬영입니다.</p>
                        <p>진중하고 신뢰감 있는 30~40대 남성 배우분을 모십니다.</p>
                        <p>실내 스튜디오에서 촬영 후 야외 촬영이(2시간 이내) 있습니다.</p><br/>
                        <p>촬영일시 : 8월 중순~ 9월 초, 7H</p>
                        <p>촬영장소 : 경기도</p>
                        <p>출연료 : 80만원</p><br/>
                        <p>우대사항</p>
                        <p>- 운전면허 필수</p>
                        <p>- 공기업, 공공단체 등 캠페인 영상 촬영 경험하신 분</p>
                        <p>- 말과 행동이 자연스럽게 생활감 있는 연기가 가능하신 분</p>
                        <p>- 출연작 영상 링크 필수 제출</p><br/>
                        <p>프로필 확인 후 선정된 분들에 한해 개별적으로 연락 드리는 점 양해 부탁드리며, 많은 관심 부탁드리겠습니다 :)</p>
                        <p>감사합니다.</p>
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    <button className="bg-blue-500 text-white font-bold py-3 px-20 mr-28 rounded-lg">
                        즉시 지원하기
                    </button>
                </div>
            </div>
        </div>
    );
}
