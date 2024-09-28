import sys
import os
import librosa
import numpy as np
import json

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
        'vocal_range': vocal_range
    }

    # 결과를 JSON으로 출력
    print(json.dumps(result))

if __name__ == "__main__":
    file_path = sys.argv[1]  # 파일 경로를 인자로 받음
    analyze_audio(file_path)