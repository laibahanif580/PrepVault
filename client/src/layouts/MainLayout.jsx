import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0B0C] overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Navbar */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main
        className={`
          transition-all duration-300 ease-in-out
          pt-24 sm:pt-28 md:pt-32
          px-3 sm:px-4 md:px-6 lg:px-8
          pb-6 sm:pb-8
          ${sidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-[280px]'}
          min-h-screen
        `}
      >
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;