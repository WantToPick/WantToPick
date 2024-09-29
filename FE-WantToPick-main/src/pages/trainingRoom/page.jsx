import React, { useState, useRef } from 'react';
import { uploadAudioFile } from './api'; // API 함수 가져오기
import file_upload from '../../assets/images/trainingroom/file_upload.png';

export default function VocalTrainingPage() {
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null); // 업로드한 파일 상태
    const [analysisResults, setAnalysisResults] = useState(null); // 분석 결과 상태
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태
    const [showRecent, setShowRecent] = useState(false); // 최근 분석 기록 표시 여부
    const [showResults, setShowResults] = useState(false); // 분석 결과 표시 여부
    const [loading, setLoading] = useState(false); // 로딩 상태 추가

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile); // 파일 상태 업데이트
            setErrorMessage(''); // 에러 메시지 초기화
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setErrorMessage('파일을 선택하세요.');
            return;
        }

        setLoading(true); // 로딩 시작
        setShowResults(false); // 이전 결과 숨김
        try {
            // 2초간 로딩 시뮬레이션 (API 호출과 실제 분석 대체)
            await new Promise(resolve => setTimeout(resolve, 5000));

            // const analysisData = await uploadAudioFile(file); // API 호출하여 분석 결과 가져옴
            const analysisData = { song1: 'dd', song2: 'dd' };
            setAnalysisResults(analysisData); // 분석 결과 저장
            setShowResults(true); // 분석 결과 표시
        } catch (error) {
            setErrorMessage('파일 업로드 중 오류가 발생했습니다.');
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const toggleRecent = () => {
        setShowRecent(!showRecent);
    };

    return (
        <div>
            <div className="flex">
                <div className="w-64 min-h-screen bg-white px-8 py-3 border-r border-gray-300">
                    <div className="mt-7 mb-10">
                        <p className="text-2xl font-bold">TRAINING ROOM</p>
                        <p className="text-gray-500 text-base">나만의 트레이닝 도우미</p>
                    </div>
                </div>
                <div className="flex-grow p-4 mt-16">
                    <div className="items-center ml-4 border-b border-b-gray-300">
                        <h1 className="text-2xl font-bold">노래 분석하기</h1>
                        <div className="font-medium h-12 flex items-center text-gray-500">
                            <span className="mr-2">💡</span> 키, 템포, 음역대, 포먼트를 바탕으로 나에게 맞는 노래를 추천받아보세요!
                        </div>
                    </div>
                    <div
                        className={`m-4 mt-6 p-6 h-auto items-center ${
                            file ? 'flex flex-col justify-center' : 'flex flex-col justify-center'
                        } ${file ? '' : 'border-2 border-dashed border-gray-200 rounded-xl'}`}
                    >
                        {file ? ( // 파일이 있을 경우 파일명을 표시
                            <div className="flex flex-col items-start">
                                <p className="text-lg font-semibold">
                                    업로드된 파일: <span className="text-[#526DF8] font-medium"> {file.name}</span>
                                </p>
                                <audio controls className="mt-3">
                                    <source src={URL.createObjectURL(file)} type={file.type} />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        ) : (
                            <>
                                <img
                                    src={file_upload}
                                    alt="파일 업로드 아이콘"
                                    className="cursor-pointer h-12"
                                    onClick={handleImageClick}
                                />
                                <p className="mt-3 text-black font-semibold">음성파일 업로드</p>
                            </>
                        )}
                        <input
                            type="file"
                            accept="audio/mp3"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* 오류 메시지 출력 */}
                    </div>

                    {file && !showResults && !loading && ( // 파일이 있을 경우에만 버튼을 표시, 로딩 중이 아닐 때만
                        <button
                            className="bg-[#526DF8] hover:bg-[#4152c5] rounded-2xl font-semibold px-6 py-2 text-white mt-8 mx-auto flex justify-center items-center transition duration-300 ease-in-out"
                            onClick={handleSubmit} // 파일 제출 및 분석 실행
                        >
                            노래 분석 결과 →
                        </button>
                    )}

                    {loading && ( // 로딩 중일 때 로딩 화면 표시
                        <div className="flex justify-center items-center mt-8">
                            <div className="loader"></div>
                            <p className="ml-4 text-lg font-semibold fade-animation">분석 중...</p>
                        </div>
                    )}

                    {showResults && analysisResults && !loading && ( // 결과가 있을 경우 표시
                        <div className="text-left mt-8 flex flex-col items-center justify-center">
                            <h4 className="font-bold text-2xl">노래 분석 결과</h4>
                            <div className="mt-6 w-[400px] bg-[#4153c512] rounded-3xl p-5">
                                <p className="font-semibold mb-6 text-xl text-center w-full"><span className='border-b-2 border-gray-300 px-2 py-1'>분석 결과</span></p>
                                <ul className="space-y-2 px-28">
                                    <li><strong>추정된 키(Key):</strong> G</li>
                                    <li><strong>템포:</strong> 133.93 BPM</li>
                                    <li><strong>음역대:</strong> 고음역대</li>
                                    <li><strong>포먼트:</strong> 0.14</li>
                                </ul>
                            </div>
                        
                            <div className="mt-10 w-[700px] bg-[#4153c512] rounded-3xl p-5">
                                <p className="font-semibold mb-6 text-xl text-center w-full"><span className='border-b-2 border-gray-300 px-2 py-1'>추천곡</span></p>
                                <ul className="space-y-2 px-28">
                                    <li><span className='opacity-70'>🎵 </span> <strong>Like Crazy</strong> - Jimin (유사도: 61%)</li>
                                    <li><span className='opacity-70'>🎵 </span> <strong>MEOW</strong> - MEOVV (유사도: 61%)</li>
                                    <li><span className='opacity-70'>🎵 </span> <strong>My Name is Malguem</strong> - QWER (유사도: 60%)</li>
                                    <li><span className='opacity-70'>🎵 </span> <strong>Nice Guy</strong> - BOYNEXTDOOR (유사도: 58%)</li>
                                    <li><span className='opacity-70'>🎵 </span> <strong>Warmth</strong> - Lim Young Woong (유사도: 54%)</li>
                                    <li><span className='opacity-70'>🎵 </span> <strong>If We Ever Meet Again</strong> - Lim Young Woong (유사도: 52%)</li>
                                    <li><span className='opacity-70'>🎵 </span> <strong>London Boy</strong> - Lim Young Woong (유사도: 49%)</li>
                                    <li><span className='opacity-70'>🎵 </span> <strong>Grain of Sand</strong> - Lim Young Woong (유사도: 48%)</li>
                                    <li><span className='opacity-70'>🎵 </span> <strong>Rebirth (Intro)</strong> - Jimin (유사도: 47%)</li>
                                    <li><span className='opacity-70'>🎵 </span> <strong>Welcome to the Show</strong> - DAY6 (유사도: 46%)</li>
                                </ul>
                            </div>
                            <button
                                className="bg-[#526DF8] hover:bg-[#4152c5] rounded-2xl font-semibold px-6 py-2 text-white mt-16 mx-auto flex justify-center items-center transition duration-300 ease-in-out"
                                onClick={handleSubmit} // 파일 제출 및 분석 실행
                            >
                                결과 저장
                            </button>
                        </div>
                    )}
                </div>

                <div className="w-44 border-l mt-5 mr-5 border-gray-300 flex flex-col items-end">
                    <button className="bg-[#526DF8] text-white font-semibold rounded-2xl w-40 h-10 mt-5">
                        새 트레이닝 +
                    </button>
                    <div className="flex items-center mt-7 mr-28 cursor-pointer" onClick={toggleRecent}>
                        <span className="text-black font-semibold">최근</span>
                        <span className="ml-2">{showRecent ? '∨' : '>'}</span>
                    </div>
                    {showRecent && (
                        <ul className="mt-2 mr-10">
                            <li className="font-semibold">💡 9/22 노래 분석</li>
                            <li className="font-semibold">💡 9/21 노래 분석</li>
                            <li className="font-semibold">💡 9/20 노래 분석</li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
