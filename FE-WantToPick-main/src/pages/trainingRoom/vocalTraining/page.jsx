import { useRef, useState } from 'react';
import file_upload from '../../../assets/images/trainingroom/file_upload.png';

export default function VocalTrainingPage() {
    const fileInputRef = useRef(null);
    const [showRecent, setShowRecent] = useState(false);
    const [file, setFile] = useState(null); // 업로드한 파일 상태
    const [showResults, setShowResults] = useState(false); // 결과 표시 상태
    const [analysisResults, setAnalysisResults] = useState(null); // 분석 결과 상태

    const handleFileUpload = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile); // 파일 상태 업데이트
            const formData = new FormData();
            formData.append('file', selectedFile); // 'audio' -> 'file'

            try {
                const response = await fetch('http://localhost:3001/api/trainingRoom/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const results = await response.json();
                    setAnalysisResults(results); // 분석 결과 저장
                    setShowResults(true); // 결과 표시 상태로 변경
                    console.log("분석 결과: ", results);
                    alert("업로드 성공!");
                } else {
                    alert("분석 중 오류가 발생했습니다.");
                }
            } catch (error) {
                console.error("Error uploading file:", error);
                alert("파일 업로드 중 오류가 발생했습니다.");
            }
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const toggleRecent = () => {
        setShowRecent(!showRecent);
    };

    const handleShowResults = () => {
        if (file) {
            setShowResults(true); // 결과 표시 상태 변경
        } else {
            alert("파일을 업로드해 주세요."); // 파일이 없을 경우 경고
        }
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
                            style={{ background: 'linear-gradient(to bottom, #CAD7FF, #FEE2E4)' }}
                        >
                            <span className="mr-2">💡</span> 키, 템포, 음역대, 포먼트를 바탕으로 나에게 맞는 노래를 추천받아보세요!
                        </div>
                    </div>
                    <div className="border-2 border-dashed border-gray-400 rounded-xl mt-6 p-6 h-96 flex flex-col items-center justify-center">
                        {showResults && analysisResults ? ( // 결과 표시 상태에 따라 조건부 렌더링
                            <div className="text-center">
                                <h4 className="font-bold text-2xl ">노래 분석 결과</h4>
                                <div className="mt-10 w-96 h-40 border-2 border-gray-300 rounded-3xl">
                                    <p className="mt-5 ml-5 text-left font-semibold">선우님께 맞는 노래는,</p>
                                    <ul className="mt-2 text-left ml-5">
                                        {analysisResults.recommendations.map((song, index) => (
                                            <li key={index}>🎵 {song}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <>
                                <img
                                    src={file_upload}
                                    alt="파일 업로드 아이콘"
                                    className="cursor-pointer"
                                    onClick={handleImageClick}
                                />
                                <p className="mt-3 text-black font-semibold">파일 추가하기</p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                            </>
                        )}
                    </div>
                    <button
                        className="bg-blue-500 rounded-xl w-36 h-12 text-white mt-12 mx-auto flex justify-center items-center"
                        onClick={handleShowResults} // 버튼 클릭 시 결과 표시
                    >
                        결과 확인하기
                    </button>
                </div>
                <div className="w-44 border-l mt-5 mr-5 border-gray-300 flex flex-col items-end">
                    <button className="bg-blue-500 text-white rounded-xl w-40 h-12 mt-5">
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