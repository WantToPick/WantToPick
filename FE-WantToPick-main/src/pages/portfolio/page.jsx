import React from 'react';
import Sidebar from './_components/sideBar';
import ProfileHeader from './_components/profileHeader';
import { Outlet } from 'react-router-dom';

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-grow h-screen">
        <ProfileHeader />
        <div className="flex-grow overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
