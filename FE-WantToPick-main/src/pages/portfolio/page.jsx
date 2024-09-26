import React, { useContext }from 'react';
import { AuthContext } from '../../hooks/AuthProvider';

import Sidebar from './_components/sideBar';
import ProfileHeader from './_components/profileHeader';
import { Outlet } from 'react-router-dom';

export default function PortfolioPage() {
  const { username } = useContext(AuthContext);  // Context에서 username 가져오기

  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-grow h-screen">
        <ProfileHeader username={username}/>
        <div className="flex-grow overflow-y-auto">
          <Outlet context={{ username }}/>
        </div>
      </div>
    </div>
  );
}
