import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      {/* Add width constraints to Footer container */}
      <div className="max-w-7xl mx-auto w-full">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
