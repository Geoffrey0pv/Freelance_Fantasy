// ProfileLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';


const ProfileLayout = () => {
  return (

      <div className="flex-1">
        <Outlet />  {/* Aquí se renderizan las rutas internas */}
      </div>

  );
};

export default ProfileLayout;
