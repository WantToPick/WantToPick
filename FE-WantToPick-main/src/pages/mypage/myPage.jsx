import { useState } from 'react';
import logo_black from '../../assets/images/mypage/logo_black.png';
import { Link } from 'react-router-dom';
import { routes } from '../../constants/routes';

export default function MyPage() {
    const [selectedImage, setSelectedImage] = useState(null);

    // 파일 선택 핸들러
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // 파일 미리보기 URL 생성
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    return (
        <div className="mt-7 flex h-screen">
            <div className="w-80 p-4 border-r border-gray-300"></div>
            <div className="flex-grow p-4">
                <div className="border-b border-gray-300 pb-4 -ml-4">
                    <div className="flex items-center ml-4">
                        <button className="text-xl p-1">{'\u2190'}</button>
                        <h3 className="font-bold text-2xl ml-3">마이페이지</h3>
                    </div>
                </div>
                <div className="w-[90%] ml-10 mt-10 h-1/2 border border-gray-300 rounded-xl flex">
                    {/* 왼쪽 */}
                    <div className="w-[50%] flex flex-col items-center justify-center border-r border-gray-300">
                        {/* 파일 업로드 버튼과 input */}
                        <input
                            id="profile-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {selectedImage && (
                            <div className="mt-4">
                                <img
                                    src={selectedImage}
                                    alt="Selected profile"
                                    className="w-24 h-24 rounded-lg object-cover"
                                />
                            </div>
                        )}
                        <p className="m-3 font-extrabold text-2xl">청일점</p>
                        <label
                            htmlFor="profile-upload"
                            className="bg-[#CDD5FF] text-black  mt-3 py-2 px-4 rounded-md hover:bg-blue-500 cursor-pointer"
                        >
                            프로필 사진 업로드 📎
                        </label>
                    </div>

                    {/* 오른쪽 */}
                    <div className="w-1/2 p-4">
                        <p className="m-5 font-bold border-b border-gray-300 pb-4">
                            <Link to={routes.modifyInfo}>내 정보 수정하기</Link>
                        </p>
                        <p className="m-5 font-bold border-b border-gray-300 pb-4">
                            <Link to={routes.selectedInfo}>찜한 모집공고 보기</Link>
                        </p>
                        <p className="m-5 font-bold border-b border-gray-300 pb-4">내 포트폴리오 보기</p>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-56">
                    <img src={logo_black}></img>
                </div>
                <div>
                    <Link to={routes.portfolio}>
                        <p className="text-[#999999] mt-5 text-center">잠깐! 아직 포트폴리오 업로드를 안했다면? ➜</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
