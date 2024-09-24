import React from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import { routes } from '../constants/routes';

import Layout from '../layout/layout';
import HomePage from '../pages/home/page';
import SignUpPage from '../pages/auth/signUp/page';
import TrainingRoomPage from '../pages/trainingRoom/page';
import RecruitPage from '../pages/recruit/page';
import CommunityPage from '../pages/community/page';
import PortfolioPage from '../pages/portfolio/page';
import IntroPage from '../pages/portfolio/_components/introPage';
import VocalPortfolioPage from '../pages/portfolio/_components/vocalPortfolio';
import DancePortfolioPage from '../pages/portfolio/_components/dancePortfolio';
import RapPortfolioPage from '../pages/portfolio/_components/rapPortfolio';
import ImagePortfolioPage from '../pages/portfolio/_components/imagePortfolio';
import DetailPage from '../pages/portfolio/_components/detailPage';
import RecruitDetail from '../pages/recruit/_components/recruitDetail';
import MyPage from '../pages/mypage/myPage';
import ModifyInfo from '../pages/mypage/_components/modifyInfo';
import SelectedInfo from '../pages/mypage/_components/selectedInfo';

export default function Router() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  const elements = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: routes.home,
          element: <HomePage />,
        },
        {
          path: routes.login,
          element: null, // 팝업을 통해 구현하니까 null
        },
        {
          path: routes.signUp,
          element: <SignUpPage />,
        },
        {
          path: routes.trainingRoom,
          element: <TrainingRoomPage />,
        },
        {
          path: routes.recruit,
          element: <RecruitPage />,
        },
        {
          path: routes.community,
          element: <CommunityPage />,
        },
        {
          path: routes.mypage,
          element: <MyPage />, 
        },
        {
          path: routes.modifyInfo,
          element: <ModifyInfo />,
        },
        {
          path: routes.selectedInfo,
          element: <SelectedInfo />,
        },
        {
          path: routes.portfolio,
          element: <PortfolioPage />,
          children: [
            {
              path: routes.portfolioIntro,
              element: <IntroPage />,
            },
            {
              path: routes.portfolioVocal,
              element: id ? <DetailPage /> : <VocalPortfolioPage />,
            },
            {
              path: routes.portfolioDance,
              element: id ? <DetailPage /> : <DancePortfolioPage />,
            },
            {
              path: routes.portfolioRap,
              element: id ? <DetailPage /> : <RapPortfolioPage />,
            },
            {
              path: routes.portfolioImage,
              element: id ? <DetailPage /> : <ImagePortfolioPage />,
            },
          ],
        },
        {
          path: '/detail/:id',
          element: <RecruitDetail />,
        },
      ],
    },
  ];

  return useRoutes(elements);
}
