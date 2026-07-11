import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  LogOut,
} from "lucide-react";

function Navbar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const [searchFocused, setSearchFocused] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    // Clear auth data from localStorage
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    
    // Redirect to login page
    navigate("/login");
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`
          fixed top-3 sm:top-4 md:top-5 
          right-3 sm:right-4 md:right-5 
          left-3 sm:left-4 md:left-5 
          lg:left-[280px] 
          z-40
          transition-all duration-300
        `}
      >
        <div className=" lg:ml-4 flex h-16 sm:h-18 md:h-20 items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,.45)] bg-[#111113]/80 backdrop-blur-xl border border-white/10">

          {/* Left - Mobile Menu Button (Hidden on Desktop) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Search - Desktop */}
          <div className="hidden md:block relative flex-1 max-w-sm lg:max-w-md xl:max-w-lg ml-2 lg:ml-0">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search notes, projects, resources..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`
                w-full rounded-xl border py-2.5 pl-11 pr-16 
                text-sm text-white placeholder:text-gray-500 
                outline-none transition-all duration-300
                ${searchFocused
                  ? 'border-[#C8A96A] bg-black/40 shadow-lg shadow-[#C8A96A]/10'
                  : 'border-white/10 bg-black/20 hover:border-white/20'
                }
              `}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-gray-400 hidden xl:block">
              ⌘K
            </div>
          </div>

          {/* Search - Mobile */}
          <div className="md:hidden flex-1 mx-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-xl border border-white/10 bg-black/20 py-2 pl-9 pr-3 text-sm text-white placeholder:text-gray-500 outline-none focus:border-[#C8A96A]"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 flex-shrink-0">
           

            {/* Logout Button */}
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center gap-1.5 sm:gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-red-400 transition hover:scale-[1.02] hover:bg-red-500/20"
            >
              <LogOut size={14} sm:size={16} />
              <span className=" xs:inline">Logout</span>
            </button>

            {/* User */}
            <button className="flex items-center gap-2 sm:gap-3 rounded-xl border border-white/10 bg-white/5 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 transition-all duration-300 hover:border-[#C8A96A]">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-[#C8A96A] font-semibold text-black text-sm sm:text-base">
                L
              </div>
              <div className="hidden sm:block text-left">
                <p className="font-medium text-white text-sm">Laiba</p>
                <p className="text-[10px] md:text-xs text-gray-400">Student</p>
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md rounded-2xl sm:rounded-3xl border border-yellow-500/30 bg-[#0B0B0C] p-6 sm:p-8 shadow-2xl"
          >
            <div className="text-center">
              <div className="mx-auto mb-3 sm:mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-yellow-500/20">
                <LogOut size={28} sm:size={32} className="text-yellow-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Logout?</h2>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-400">
                Are you sure you want to logout from PrepVault?
              </p>
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 rounded-xl border border-white/10 bg-transparent py-2.5 sm:py-3 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 rounded-xl bg-yellow-500 py-2.5 sm:py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-yellow-400"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default Navbar;