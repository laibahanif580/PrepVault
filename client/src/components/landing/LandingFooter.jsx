import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, ArrowUpRight } from "lucide-react";
import logo from "../../assets/images/logo.png";

function LandingFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0B0B0C]">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#C8A96A]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid gap-8 sm:gap-12 md:gap-16 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="text-center md:text-left">
            <img
              src={logo}
              alt="PrepVault"
              className="h-10 sm:h-12 mx-auto md:mx-0"
            />
            <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-7 sm:leading-8 text-gray-400 max-w-sm mx-auto md:mx-0">
              PrepVault is your all-in-one workspace for mastering technical interviews,
              organizing CS subjects, managing projects, and preparing smarter.
            </p>
          </div>

          {/* Product */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 sm:mb-6 text-lg font-semibold text-white">
              Product
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-gray-400">
              <li>
                <Link to="/subjects" className="transition hover:text-[#C8A96A]">
                  Subjects
                </Link>
              </li>
              <li>
                <Link to="/projects" className="transition hover:text-[#C8A96A]">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/resources" className="transition hover:text-[#C8A96A]">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/planner" className="transition hover:text-[#C8A96A]">
                  Revision Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 sm:mb-6 text-lg font-semibold text-white">
              Connect
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <a
                href="mailto:hello@prepvault.com"
                className="flex items-center justify-center md:justify-start gap-3 text-gray-400 transition hover:text-[#C8A96A]"
              >
                <Mail size={18} />
                <span className="text-sm sm:text-base">hello@prepvault.com</span>
              </a>
              <a
                href="https://github.com/laibahanif580"
                className="flex items-center justify-center md:justify-start gap-3 text-gray-400 transition hover:text-[#C8A96A]"
              >
                <FaGithub size={20} />
                <span className="text-sm sm:text-base">GitHub</span>
                <ArrowUpRight size={16} />
              </a>
              <a
                href="#"
                className="flex items-center justify-center md:justify-start gap-3 text-gray-400 transition hover:text-[#C8A96A]"
              >
                <FaLinkedin size={20} />
                <span className="text-sm sm:text-base">LinkedIn</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 sm:mt-16 lg:mt-20 flex flex-col items-center justify-center border-t border-white/10 pt-6 sm:pt-8 text-sm text-gray-500">
          <p className="text-center">
            © {new Date().getFullYear()} PrepVault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;