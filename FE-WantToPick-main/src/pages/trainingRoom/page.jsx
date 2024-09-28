import React, { useState } from 'react';
import axios from 'axios';

export default function VocalTrainingPage() {
    const [file, setFile] = useState(null);
    const [analysisResults, setAnalysisResults] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setErrorMessage('파일을 선택하세요.');
            return;
        }

        const formData = new FormData();
        formData.append('audio', file);

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setAnalysisResults(response.data); // 분석 결과 저장
        } catch (error) {
            console.error('Error uploading file:', error);
            setErrorMessage('파일 업로드 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <h1>보컬 트레이닝 페이지</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept="audio/mp3"
                    onChange={handleFileChange}
                />
                <button type="submit">업로드</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {analysisResults && (
                <div>
                    <h2>분석 결과</h2>
                    <p><strong>Estimated Key:</strong> {analysisResults.key}</p>
                    <p><strong>Tempo:</strong> {analysisResults.tempo} BPM</p>
                    <p><strong>Vocal Range:</strong> {analysisResults.vocal_range}</p>
                    <p><strong>Energy:</strong> {analysisResults.energy}</p>
                    <p><strong>Danceability:</strong> {analysisResults.danceability}</p>
                </div>
            )}
        </div>
    );
}