import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  ArrowLeft,
  User,
  CheckCircle,
} from "lucide-react";

import logo from "../../assets/images/logo.png";
import background from "../../assets/images/bg.webp";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }

    setLoading(true);
    
    // Simulate registration API call
    setTimeout(() => {
      setLoading(false);
      // Redirect to login page after successful registration
      navigate("/login");
    }, 1500);
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Gold Glow */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-[#C8A96A]/15 blur-[180px]" />
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-white/5 blur-[180px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-[1550px] items-center justify-between px-4 sm:px-6 md:px-10 lg:px-14">
        {/* LEFT - Hidden on mobile/tablet */}
        <div className="hidden lg:flex w-[45%] flex-col self-stretch pt-8">
          {/* Logo */}
          <img
            src={logo}
            alt="PrepVault"
            className="absolute left-4 h-16 w-auto object-contain"
          />

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-40"
          >
            <p className="ml-4 uppercase tracking-[0.35rem] text-[#C8A96A]">
              Join PrepVault
            </p>

            <h1 className="hero-font mt-6 text-5xl xl:text-7xl italic leading-none text-white">
              Start Your
              <br />
              <span className="text-[#C8A96A]">Journey Today.</span>
            </h1>

            <p className="ml-4 mt-8 max-w-lg text-base xl:text-lg leading-7 xl:leading-8 text-gray-300">
              Create your account and unlock AI-powered interview preparation,
              project management, and smarter revision tools —
              all in one beautiful workspace.
            </p>
          </motion.div>
        </div>

        {/* RIGHT - Register Form */}
        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full max-w-md mx-auto lg:mx-0 xl:mr-14"
        >
          <div className="h-auto min-h-[560px] sm:h-[580px] rounded-[30px] border border-white/10 bg-white/10 px-4 sm:px-5 md:px-6 py-5 backdrop-blur-3xl shadow-[0_30px_80px_rgba(0,0,0,.5)] overflow-y-auto">
            {/* Back */}
            <Link
              to="/"
              className="mb-2 sm:mb-3 inline-flex items-center gap-2 text-sm text-gray-300 transition hover:text-[#C8A96A]"
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>

            <h2 className="text-2xl sm:text-3xl font-bold text-white">Create Account</h2>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-400">Start your PrepVault journey</p>

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="relative mt-4 sm:mt-6">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 sm:py-3 pl-12 pr-4 text-sm sm:text-base text-white outline-none transition focus:border-[#C8A96A]"
                />
              </div>

              {/* Email */}
              <div className="relative mt-3 sm:mt-4">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 sm:py-3 pl-12 pr-4 text-sm sm:text-base text-white outline-none transition focus:border-[#C8A96A]"
                />
              </div>

              {/* Password */}
              <div className="relative mt-3 sm:mt-4">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 sm:py-3 pl-12 pr-12 text-sm sm:text-base text-white outline-none transition focus:border-[#C8A96A]"
                />
                <Eye
                  size={18}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 transition hover:text-white"
                />
              </div>

              {/* Confirm Password */}
              <div className="relative mt-3 sm:mt-4">
                <CheckCircle
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 sm:py-3 pl-12 pr-4 text-sm sm:text-base text-white outline-none transition focus:border-[#C8A96A]"
                />
                <Eye
                  size={18}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 transition hover:text-white"
                />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-4 sm:mt-5 w-full rounded-xl bg-[#C8A96A] py-2.5 sm:py-3 font-semibold text-black shadow-lg shadow-[#C8A96A]/30 transition duration-300 hover:scale-[1.02] hover:bg-[#d8ba81] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 sm:my-8 flex items-center">
              <div className="h-px flex-1 bg-white/10"></div>
              <span className="mx-4 text-xs sm:text-sm text-gray-500">OR</span>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>

            {/* Login Link */}
            <p className="text-center text-xs sm:text-sm md:text-base text-gray-400">
              Already have an account?
              <Link
                to="/login"
                className="ml-2 font-medium text-[#C8A96A] hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Register;