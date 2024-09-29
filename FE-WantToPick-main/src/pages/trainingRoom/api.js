import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const uploadAudioFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);  // 'audio'에서 'file'로 수정

  try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('파일 업로드 중 오류가 발생했습니다.');
  }
};
