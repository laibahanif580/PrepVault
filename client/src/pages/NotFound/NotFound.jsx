import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, FileQuestion } from "lucide-react";

function NotFound() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0B0B0C] flex items-center justify-center">
      {/* Glow Effects */}
      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-[#C8A96A]/10 blur-[170px]" />
      <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-white/5 blur-[170px]" />

      <div className="relative z-10 w-full max-w-2xl px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <div className="relative">
            <h1 className="hero-font text-[100px] sm:text-[120px] md:text-[150px] font-bold leading-none text-white/10 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <FileQuestion size={50} sm:size={60} md:size={80} className="text-[#C8A96A] opacity-50" />
            </div>
          </div>

          {/* Message */}
          <div className="mt-[-10px] sm:mt-[-20px]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Page Not Found</h2>
            <p className="mt-2 sm:mt-4 text-base sm:text-lg text-gray-400 max-w-md mx-auto">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Suggestions */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-gray-300 transition hover:border-[#C8A96A]/30 hover:bg-white/10"
            >
              <ArrowLeft size={16} sm:size={18} />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default NotFound;