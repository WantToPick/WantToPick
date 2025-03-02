import React, { useState, useEffect } from 'react';
import { useLocation, Link, useOutletContext } from 'react-router-dom';
import vdo1 from '../../../assets/images/portfolio/lovewinsall.mp4'

export default function DetailPage() {
  const { username } = useOutletContext();  // Outlet에서 전달된 context 받아오기

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // URL 경로에서 포트폴리오 타입을 추출
  const pathSegments = location.pathname.split('/');
  const type = pathSegments[pathSegments.length - 1]; // "vocal", "dance", "rap", "image" 등을 추출

  // 디버깅용 로그 추가
  console.log("Location pathname:", location.pathname);
  console.log("Path segments:", pathSegments);
  console.log("Extracted type:", type);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // 모의 데이터
      const mockData = {
        vocal: [
          { 
            id: 1, 
            title: '아이유 | Love wins all', 
            description: '제가 좋아하는 노래입니다! 열심히 불러보았습니다 :)',
            videoUrl: vdo1,
            views: 150,
            date: '2024.08.05',
          },
          { 
            id: 2, 
            title: '백예린 | 우주를 줄게', 
            description: '제가 좋아하는 노래입니다! 열심히 불러보았습니다 :)',
            videoUrl: 'path/to/video2.mp4',
            views: 182,
            date: '2024.08.05',
          },
          { 
            id: 3, 
            title: '소녀시대 | 다시 만난 세계', 
            description: '제가 좋아하는 노래입니다! 열심히 불러보았습니다 :)',
            videoUrl: 'path/to/video3.mp4',
            views: 200,
            date: '2024.08.05',
          },
        ],
        dance: [
          { 
            id: 1, 
            title: '댄스 영상 1', 
            description: '댄스 영상 설명',
            videoUrl: 'path/to/dance_video1.mp4',
            views: 130,
            date: '2024.08.05',
          },
          { 
            id: 2, 
            title: '댄스 영상 2', 
            description: '댄스 영상 설명',
            videoUrl: 'path/to/dance_video2.mp4',
            views: 110,
            date: '2024.08.05',
          },
        ],
        rap: [
          { 
            id: 1, 
            title: '랩 영상 1', 
            description: '랩 영상 설명',
            videoUrl: 'path/to/rap_video1.mp4',
            views: 140,
            date: '2024.08.05',
          },
          { 
            id: 2, 
            title: '랩 영상 2', 
            description: '랩 영상 설명',
            videoUrl: 'path/to/rap_video2.mp4',
            views: 160,
            date: '2024.08.05',
          },
        ],
        image: [
          { 
            id: 1, 
            title: '이미지 1', 
            description: '이미지 설명',
            imageUrl: 'path/to/image1.png',
            views: 120,
            date: '2024.08.05',
          },
          { 
            id: 2, 
            title: '사진 포트폴리오 2', 
            description: '이 사진은 제 마음을 사로잡았습니다.',
            imageUrl: 'path/to/image2.png',
            views: 140,
            date: '2024.08.05',
          },
        ]
      };

      // mockData 확인 로그 추가
      console.log("mockData for type:", type, mockData[type]);

      // 해당 타입과 ID에 맞는 데이터를 찾습니다.
      const data = mockData[type]?.find((item) => item.id === parseInt(id));
      
      // 가져온 데이터 확인
      console.log("Fetched data:", data);

      setItem(data);
      setLoading(false);
    };

    fetchData();
  }, [type, id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!item) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          포트폴리오 | {type === 'vocal' ? '보컬' : type === 'dance' ? '댄스' : type === 'rap' ? '랩' : '이미지'}
        </h1>
        <button className="text-gray-600 underline">편집</button>
      </div>
      
      <div className="border rounded-lg p-10 mb-4">
        <div className='text-xl font-bold flex items-center mb-4'>
          <Link to={`/portfolio/${type}`} className="mr-5">{'<'}</Link>
          <h2>{item.title}</h2>
        </div>
        <div className='px-20 py-8 border-b border-gray-400 mb-8'>
          {type === 'image' ? (
            <img src={item.imageUrl} alt={item.title} className="w-full h-auto mb-4 rounded-lg" />
          ) : (
            <video controls className="w-full h-auto mb-4 rounded-lg">
              <source src={item.videoUrl} type="video/mp4" />
              해당 브라우저는 비디오 태그를 지원하지 않습니다.
            </video>
          )}
        </div>
        <p className='mb-4'>{item.description}</p>
        <div className="text-gray-500 flex justify-end">
          <span className="mr-6">조회수 {item.views}</span>
          <span>게시일 {item.date}</span>
        </div>
      </div>
    </div>
  );
}
