import { Link } from 'react-router-dom';
import { routes } from '../../../constants/routes';

export default function ModifyInfo() {
    return (
        <div className="mt-7 flex h-screen">
            <div className="w-80 p-4 border-r border-gray-300"></div>
            <div className="flex-grow p-4">
                <div className="border-b border-gray-300 pb-4 -ml-4">
                    <div className="flex items-center ml-4">
                        <Link to={routes.mypage}>
                            <button className="text-xl p-1">{'\u2190'}</button>
                        </Link>
                        <h3 className="font-bold text-2xl ml-3">마이페이지</h3>
                    </div>
                </div>
                {/* 개인정보 수정 섹션 */}
                <div className="w-[90%] ml-7 mt-14 h-[100%] border border-gray-300 rounded-xl flex flex-col justify-start pt-16 px-10">
                    {/* "내 정보 수정하기" */}
                    <h2 className="font-bold text-xl mb-6">내 정보 수정하기</h2>
                    <div><hr /></div>
                    {/* 아이디 입력 */}
                    <label className="block text-gray-700 text-sm font-bold mt-3 mb-2">아이디</label>
                    <input
                        type="text"
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                        placeholder="아이디"
                    />

                    {/* 비밀번호 입력 */}
                    <label className="block text-gray-700 text-sm font-bold mt-6 mb-2">비밀번호</label>
                    <input
                        type="password"
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                        placeholder="비밀번호"
                    />

                    {/* 이름 입력 */}
                    <label className="block text-gray-700 text-sm font-bold mt-6 mb-2">이름</label>
                    <input
                        type="text"
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                        placeholder="이름"
                    />

                    {/* 생년월일 입력 */}
                    <label className="block text-gray-700 text-sm font-bold mt-6 mb-2">생년월일</label>
                    <input
                        type="date"
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    />

                    {/* 성별 선택 */}
                    <label className="block text-gray-700 text-sm font-bold mt-6 mb-2">성별</label>
                    <div className="flex items-center">
                        <label className="mr-6">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                className="mr-2"
                            />
                            남자
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                className="mr-2"
                            />
                            여자
                        </label>
                    </div>

                    {/* 완료 버튼 */}
                    <div className="flex justify-center mt-8">
                        <button className="bg-[#526DF8] hover:bg-blue-700 text-white w-[25%] py-3 rounded-xl focus:outline-none focus:shadow-outline">
                            완료
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
