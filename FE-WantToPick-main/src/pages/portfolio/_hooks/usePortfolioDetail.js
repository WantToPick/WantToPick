import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePortfolioDetail(mockData) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // URL 경로에서 포트폴리오 타입을 추출
  const pathSegments = location.pathname.split('/');
  const type = pathSegments[pathSegments.length - 1];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log("Type:", type);
      console.log("ID:", id);

      // 해당 타입과 ID에 맞는 데이터를 찾습니다.
      const data = mockData[type]?.find((item) => item.id === parseInt(id));
      console.log("Found item:", data);
      setItem(data);
      setLoading(false);
    };

    fetchData();
  }, [type, id, mockData]);

  return { item, loading, type };
}
