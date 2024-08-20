import React from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import { routes } from '../constants/routes';

import Layout from '../layout/layout';
import HomePage from '../pages/home/page';
import SignUpPage from '../pages/auth/signUp/page';
import VocalTrainingPage from '../pages/trainingRoom/vocalTraining/page';
import DanceTrainingPage from '../pages/trainingRoom/danceTraining/page';
import RecruitPage from '../pages/recruit/page';
import FreeBoardPage from '../pages/community/freeBoard/page';
import TeamRecruitPage from '../pages/community/teamRecruit/page';
import PortfolioPage from '../pages/portfolio/page';
import IntroPage from '../pages/portfolio/_components/introPage';
import VocalPortfolioPage from '../pages/portfolio/_components/vocalPortfolio';
import DancePortfolioPage from '../pages/portfolio/_components/dancePortfolio';
import RapPortfolioPage from '../pages/portfolio/_components/rapPortfolio';
import ImagePortfolioPage from '../pages/portfolio/_components/imagePortfolio';
import DetailPage from '../pages/portfolio/_components/detailPage'; // 상세 페이지 추가

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
          path: routes.vocalTraining,
          element: <VocalTrainingPage />,
        },
        {
          path: routes.danceTraining,
          element: <DanceTrainingPage />,
        },
        {
          path: routes.recruit,
          element: <RecruitPage />,
        },
        {
          path: routes.freeBoard,
          element: <FreeBoardPage />,
        },
        {
          path: routes.teamRecruit,
          element: <TeamRecruitPage />,
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
              element: <ImagePortfolioPage />,
            },
          ],
        },
      ],
    },
  ];

  return useRoutes(elements);
}
