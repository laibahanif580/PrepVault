import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/images/logo.png";

function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={logo}
            alt="PrepVault"
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3 sm:gap-4">
          <Link
            to="/login"
            className="rounded-xl border border-white/10 bg-black px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-white transition hover:border-[#C8A96A]"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-xl bg-[#C8A96A] px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-black transition hover:scale-105 hover:bg-[#d8ba81]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-white hover:text-[#C8A96A] transition"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl p-4 space-y-3">
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-center text-white transition hover:border-[#C8A96A]"
          >
            Login
          </Link>
          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="block w-full rounded-xl bg-[#C8A96A] px-4 py-3 text-center font-semibold text-black transition hover:scale-105 hover:bg-[#d8ba81]"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}

export default LandingNavbar;