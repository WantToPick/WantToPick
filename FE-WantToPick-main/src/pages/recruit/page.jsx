export default function RecruitPage() {
    return (
        <div className="flex h-screen">
            {/* 사이드바 */}
            <div className="w-80 p-4">
                <h1 className="text-xl font-extrabold mb-2">MY ONE PICK</h1>
                <p className="text-[#A7A4A4] mb-4">내가 원하는 엔터테인먼트는 어딜까?</p>
                <div className="flex space-x-4 text-[12px] mb-4">
                    <div>진행중</div>
                    <div>마감임박</div>
                    <div>신규</div>
                </div>
                <div className="mt-6">
                    <h2 className="text-[15px] font-semibold mb-4">카테고리</h2>
                    <div className="flex flex-wrap gap-2">
                        <button className="py-3 px-5 bg-white rounded-[25px] text-[12px] border border-black hover:bg-[#D9D9D9] focus:outline-none">
                            전체
                        </button>
                        <button className="py-3 px-5 bg-white rounded-[25px] text-[12px] border border-black hover:bg-[#D9D9D9] focus:outline-none">
                            K-POP
                        </button>
                        <button className="py-3 px-5 bg-white rounded-[25px] text-[12px] border border-black hover:bg-[#D9D9D9] focus:outline-none">
                            비주얼
                        </button>
                        <button className="py-3 px-5 bg-white rounded-[25px] text-[12px] border border-black hover:bg-[#D9D9D9] focus:outline-none">
                            보컬
                        </button>
                        <button className="py-3 px-5 bg-white rounded-[25px] text-[12px] border border-black hover:bg-[#D9D9D9] focus:outline-none">
                            발라드
                        </button>
                        <button className="py-3 px-5 bg-white rounded-[25px] text-[12px] border border-black hover:bg-[#D9D9D9] focus:outline-none">
                            R&B
                        </button>
                        <button className="py-3 px-5 bg-white rounded-[25px] text-[12px] border border-black hover:bg-[#D9D9D9] focus:outline-none">
                            댄스
                        </button>
                        <button className="py-3 px-5 bg-white rounded-[25px] text-[12px] border border-black hover:bg-[#D9D9D9] focus:outline-none">
                            밴드
                        </button>
                        <button className="py-3 px-5 bg-white rounded-[25px] text-[12px] border border-black hover:bg-[#D9D9D9] focus:outline-none">
                            힙합
                        </button>
                        <button className="py-3 px-5 bg-white rounded-[25px] text-[12px] border border-black hover:bg-[#D9D9D9] focus:outline-none">
                            랩
                        </button>
                        <button className="py-3 px-5 bg-white rounded-[25px] text-[12px] border border-black hover:bg-[#D9D9D9] focus:outline-none">
                            기타
                        </button>
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="text-[15px] font-semibold mb-4">회사의 규모</h2>
                    <div className="flex flex-wrap gap-2">
                        <button className="py-3 px-5 bg-white rounded-[25px] text-[12px] border border-black hover:bg-[#D9D9D9] focus:outline-none">
                            대형
                        </button>
                        <button className="py-3 px-5 bg-white rounded-[25px] text-[12px] border border-black hover:bg-[#D9D9D9] focus:outline-none">
                            중형
                        </button>
                        <button className="py-3 px-5 bg-white rounded-[25px] text-[12px] border border-black hover:bg-[#D9D9D9] focus:outline-none">
                            소형
                        </button>
                    </div>
                </div>
                <div className="mt-6">
                   <h2 className="text-[15px] font-semibold mb-4">성별</h2>
                   <div className="flex space-x-2">
                        <div className="flex items-center">
                            <input id="all" type="radio" name="gender" value="all" className="mr-2 leading-tight" />
                            <label htmlFor="all" className="text-sm">모두</label>
                        </div>
                        <div className="flex items-center">
                            <input id="male" type="radio" name="gender" value="male" className="mr-2 leading-tight" />
                            <label htmlFor="male" className="text-sm">남성</label>
                        </div>
                        <div className="flex items-center">
                            <input id="female" type="radio" name="gender" value="female" className="mr-2 leading-tight" />
                            <label htmlFor="female" className="text-sm">여성</label>
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
            </div>
            
            {/* 콘텐츠 영역 */}
            <div className="flex-1 p-6 bg-gray-100 ml-4">
                모집공고 페이지
            </div>
        </div>
    );
}
