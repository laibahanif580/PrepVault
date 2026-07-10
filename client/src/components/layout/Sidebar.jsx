import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/logo.png";
import SidebarItem from "./SidebarItem";

import {
  LayoutDashboard,
  BookOpen,
  FolderKanban,
  FileText,
  CalendarDays,
  Bot,
  Bookmark,
  User,
  Settings,
  X,
} from "lucide-react";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, text: "Dashboard" },
    { to: "/subjects", icon: BookOpen, text: "Subjects" },
    { to: "/projects", icon: FolderKanban, text: "Projects" },
    { to: "/resources", icon: FileText, text: "Resources" },
    { to: "/mockinterview", icon: CalendarDays, text: "Mock Interview" },
  ];

  const bottomItems = [
    { to: "/profile", icon: User, text: "Profile" },
    { to: "/settings", icon: Settings, text: "Settings" },
  ];

  const handleLinkClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen || !isMobile ? 0 : -320,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`
          fixed top-0 left-0 z-50
          h-full w-[270px] sm:w-[280px] lg:w-[270px]
          border-r border-white/10
          bg-[#111113]/95 backdrop-blur-2xl
          shadow-[0_25px_70px_rgba(0,0,0,.55)]
          lg:top-5 lg:left-5 lg:h-[calc(100vh-40px)]
          lg:rounded-[30px]
          lg:translate-x-0
        `}
      >
        {/* Close Button - Mobile */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition z-10"
          >
            <X size={24} />
          </button>
        )}

        {/* Gold Glow */}
        <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#C8A96A]/10 blur-[90px]" />

        <div className="relative flex h-full flex-col">
          {/* Logo */}
          <div className="flex justify-center py-4 sm:py-5 lg:py-6">
            <Link to="/dashboard" onClick={handleLinkClick}>
              <img
                src={logo}
                alt="PrepVault"
                className="h-10 sm:h-11 lg:h-12 object-contain"
              />
            </Link>
          </div>

          {/* Divider */}
          <div className="mx-4 sm:mx-5 lg:mx-6 mb-2 border-b border-white/10" />

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-4 lg:px-5">
            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={item.to} onClick={handleLinkClick}>
                  <SidebarItem
                    to={item.to}
                    icon={item.icon}
                    text={item.text}
                    isActive={location.pathname === item.to}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom - Profile Section */}
          <div className="px-3 sm:px-4 lg:px-5 pb-3 lg:pb-4">
            <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl overflow-hidden">
              <div className="flex items-center gap-3 p-3 lg:p-4">
                <div className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-[#C8A96A] font-bold text-black text-base lg:text-lg flex-shrink-0">
                  L
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm truncate">Laiba</h3>
                </div>
              </div>

              <div className="border-t border-white/10" />

              <div className="p-1">
                {bottomItems.map((item) => (
                  <div key={item.to} onClick={handleLinkClick}>
                    <SidebarItem
                      to={item.to}
                      icon={item.icon}
                      text={item.text}
                      isActive={location.pathname === item.to}
                      compact
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

export default Sidebar;