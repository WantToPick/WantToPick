import React, { useState, useRef } from 'react';
import { uploadAudioFile } from './api'; // API 함수 가져오기
import file_upload from '../../assets/images/trainingroom/file_upload.png';

export default function VocalTrainingPage() {
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null); // 업로드한 파일 상태
    const [analysisResults, setAnalysisResults] = useState(null); // 분석 결과 상태
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태
    const [showRecent, setShowRecent] = useState(false); // 최근 분석 기록 표시 여부

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

        try {
            const analysisData = await uploadAudioFile(file); // API 호출하여 분석 결과 가져옴
            setAnalysisResults(analysisData); // 분석 결과 저장
        } catch (error) {
            setErrorMessage('파일 업로드 중 오류가 발생했습니다.');
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
            <div className="mt-7 flex">
                <div className="w-80 p-4 border-r mt-5 ml-5 border-gray-300">
                    <p className="text-black font-bold text-3xl">TRAINING ROOM</p>
                    <p className="text-gray-400 mt-3 text-base">나만의 트레이닝 도우미</p>
                </div>
                <div className="flex-grow p-4 mt-16">
                    <div className="flex items-center ml-4">
                        <h3 className="font-bold text-3xl ml-3">노래 분석하기</h3>
                        <div
                            className="border rounded-3xl font-semibold ml-auto w-[60%] h-12 flex items-center justify-center"
                        >
                            <span className="mr-2">💡</span> 키, 템포, 음역대, 포먼트를 바탕으로 나에게 맞는 노래를 추천받아보세요!
                        </div>
                    </div>
                    <div className="border-2 border-dashed border-gray-400 rounded-xl mt-6 p-6 h-96 flex flex-col items-center justify-center">
                        {analysisResults ? ( // 분석 결과가 있을 경우 결과 표시
                            <div className="text-center">
                                <h4 className="font-bold text-2xl ">노래 분석 결과</h4>
                                <div className="mt-10 w-96 h-40 border-2 border-gray-300 rounded-3xl">
                                    <p className="mt-5 ml-5 text-left font-semibold">선우님께 맞는 노래는,</p>
                                    <ul className="mt-2 text-left ml-5">
                                        {analysisResults.recommendations?.map((song, index) => (
                                            <li key={index}>🎵 {song}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <>
                                {file ? ( // 파일이 있을 경우 파일명을 표시
                                    <div className="flex flex-col items-center">
                                        <p className="text-lg font-semibold">업로드된 파일: {file.name}</p>
                                        <audio controls className="mt-3">
                                            <source src={URL.createObjectURL(file)} type={file.type} />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                ) : ( // 파일이 없을 경우 기존 이미지와 파일 선택 버튼 표시
                                    <>
                                        <img
                                            src={file_upload}
                                            alt="파일 업로드 아이콘"
                                            className="cursor-pointer"
                                            onClick={handleImageClick}
                                        />
                                        <p className="mt-3 text-black font-semibold">파일 추가하기</p>
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
                            </>
                        )}
                    </div>
                    <button
                        className="bg-[#526DF8] rounded-2xl font-semibold w-36 h-12 text-white mt-12 mx-auto flex justify-center items-center"
                        onClick={handleSubmit} // 파일 제출 및 분석 실행
                    >
                        결과 확인하기
                    </button>
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
