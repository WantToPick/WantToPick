import sys
import json
import pandas as pd
import librosa
import numpy as np
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# .env 파일에서 환경 변수 로드
load_dotenv()

# 파일 경로를 인자로 받아오기
audio_file_path = sys.argv[1]

# MongoDB 연결 설정
mongo_uri = os.getenv('MONGO_URI')  # 환경 변수에서 MongoDB URI 가져오기
client = MongoClient(mongo_uri)
db = client['WantToPick']  # 데이터베이스 이름으로 수정
collection = db['top50songs']  # 컬렉션 이름

# 음성 파일 로드
def load_audio(file_path, sr=16000):
    y, sr = librosa.load(file_path, sr=sr)
    return y, sr

# 피치 추출
def extract_pitch(y, sr):
    pitches, magnitudes = librosa.core.piptrack(y=y, sr=sr)
    pitch_values = pitches[np.nonzero(pitches)]  # 0이 아닌 값들만 추출
    average_pitch = np.mean(pitch_values)  # 평균 피치
    return pitch_values, average_pitch

# 템포 추출
def extract_tempo(y, sr):
    onset_env = librosa.onset.onset_strength(y=y, sr=sr)
    tempo, _ = librosa.beat.beat_track(onset_envelope=onset_env, sr=sr)
    return tempo

# 에너지 추출 (RMS 에너지를 사용)
def extract_energy(y):
    energy = np.mean(librosa.feature.rms(y=y))
    return energy

# 댄서빌리티 추정 (리듬 변화 분석)
def extract_danceability(y, sr):
    tempo, beats = librosa.beat.beat_track(y=y, sr=sr)
    danceability = len(beats) / len(y)  # 간단한 비율 계산으로 댄서빌리티 추정
    return danceability

# 음역대 분석 (저, 중, 고 음역대 구분)
def extract_range(average_pitch):
    if average_pitch < 200:
        return "Low"
    elif 200 <= average_pitch <= 400:
        return "Mid"
    else:
        return "High"

# 키 추정 (피치 분포를 기반으로 추정)
def estimate_key(pitch_values):
    pitch_class_histogram = np.zeros(12)  # 12개의 음악적 음계를 위한 히스토그램

    for pitch in pitch_values:
        pitch_class = int(np.round(librosa.hz_to_midi(pitch))) % 12  # 피치를 MIDI 음계로 변환 후 12개 음계로 나눔
        pitch_class_histogram[pitch_class] += 1

    key_index = np.argmax(pitch_class_histogram)

    key_names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    estimated_key = key_names[key_index]
    return estimated_key

# 유사도 계산 함수 (가중치 조정 가능)
def calculate_similarity(row, key, tempo, energy, danceability):
    # key 유사도 (같으면 1, 다르면 0)
    key_similarity = 1 if row['Key'] == key else 0
    
    # tempo, energy, danceability 유사도는 차이의 역수로 처리
    tempo_similarity = 1 / (1 + abs(row['Tempo'] - tempo))
    energy_similarity = 1 / (1 + abs(row['Energy'] - energy))
    danceability_similarity = 1 / (1 + abs(row['Danceability'] - danceability))

    # 유사도 총합 (가중치 적용 가능)
    total_similarity = (0.2 * key_similarity + 
                        0.35 * danceability_similarity +
                        0.15 * tempo_similarity + 
                        0.3 * energy_similarity)

    return total_similarity  # 스칼라 값 반환

# 오디오 분석 수행
def analyze_audio(file_path):
    y, sr = load_audio(file_path)
    pitch_values, average_pitch = extract_pitch(y, sr)
    estimated_key = estimate_key(pitch_values)
    tempo = extract_tempo(y, sr)
    energy = extract_energy(y)
    danceability = extract_danceability(y, sr)
    vocal_range = extract_range(average_pitch)

    result = {
        'key': estimated_key,
        'tempo': tempo,
        'energy': energy,
        'danceability': danceability,
        'vocal_range': vocal_range,
    }

    return result

# 추천된 노래 출력
def generate_recommendations_from_spotify(analysis_results):
    # MongoDB에서 데이터 가져오기
    spotify_data = pd.DataFrame(list(collection.find()))

    # 키 이름을 숫자로 변환
    key_mapping = {'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 
                   'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11}
    my_song_features = {
        'key': key_mapping.get(analysis_results['key'], -1),  # 키 매핑이 없으면 -1 반환
        'tempo': analysis_results['tempo'],
        'energy': analysis_results['energy'],
        'danceability': analysis_results['danceability']
    }

    # 각 트랙에 대해 유사도 계산
    spotify_data['Similarity'] = spotify_data.apply(lambda row: calculate_similarity(
        row, 
        my_song_features['key'], 
        my_song_features['tempo'], 
        my_song_features['energy'], 
        my_song_features['danceability']
    ), axis=1)

    # 유사도 높은 순으로 정렬하여 상위 5개 추천
    top_5_recommendations = spotify_data.sort_values(by='Similarity', ascending=False).head(5)

    # 추천된 노래 출력
    for idx, track in top_5_recommendations.iterrows():
        similarity_value = float(track['Similarity'])  # Ensure similarity is a float before formatting
        print(f"Recommended Track: {track['Track Name']} by {track['Artist(s)']} - Similarity: {similarity_value:.2f}")

# 분석 결과 JSON 형식으로 출력
if __name__ == "__main__":
    analysis_results = analyze_audio(audio_file_path)
    print(json.dumps(analysis_results))
    generate_recommendations_from_spotify(analysis_results)