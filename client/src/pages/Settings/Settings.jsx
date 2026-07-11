import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Lock,
  Shield,
  Trash2,
  LogOut,
  AlertTriangle,
  CheckCircle,
  X,
  Save,
  Edit,
  Eye,
  EyeOff,
  UserPlus,
  Users,
} from "lucide-react";

function Settings() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [profile, setProfile] = useState({
    name: "Laiba",
    email: "laiba@prepvault.com",
    phone: "+92 300 1234567",
  });

  const [editData, setEditData] = useState({ ...profile });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setProfile(editData);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancelEdit = () => {
    setEditData({ ...profile });
    setIsEditing(false);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }
    alert("Password changed successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // ✅ Logout - Redirect to Login
  const handleLogout = () => {
    // Clear auth data from localStorage
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    
    // Redirect to login page
    navigate("/login");
    setShowLogoutConfirm(false);
  };

  // ✅ Delete Account - Redirect to Landing
  const handleDeleteAccount = () => {
    // Clear all user data
    localStorage.clear();
    
    // Redirect to landing page
    navigate("/");
    setShowDeleteConfirm(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0B0B0C]">
      {/* Glow Effects */}
      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-[#C8A96A]/10 blur-[170px]" />
      <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-white/5 blur-[170px]" />

      <div className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
            <p className="uppercase tracking-[0.2rem] sm:tracking-[0.3rem] text-[#C8A96A] text-xs sm:text-sm">PrepVault</p>
            <h1 className="hero-font mt-2 sm:mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-white">Settings</h1>
            <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-400">Manage your account settings.</p>
          </motion.div>

          {/* Success Message */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-green-500/30 bg-green-500/10 p-3 sm:p-4"
            >
              <CheckCircle size={18} sm:size={20} className="text-green-400" />
              <span className="text-xs sm:text-sm text-green-400">Profile updated successfully!</span>
            </motion.div>
          )}

          {/* Settings Sections */}
          <div className="space-y-4 sm:space-y-6">
            {/* Profile Information */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                  <User size={18} sm:size={20} className="text-[#C8A96A]" />
                  Profile Information
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 rounded-xl bg-[#C8A96A] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-black transition hover:scale-105"
                  >
                    <Edit size={14} sm:size={16} />
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelEdit}
                      className="rounded-xl border border-white/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 rounded-xl bg-[#C8A96A] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-black transition hover:scale-105"
                    >
                      <Save size={14} sm:size={16} />
                      Save
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3 rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3">
                  <User size={16} sm:size={18} className="text-[#C8A96A] flex-shrink-0" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                      className="flex-1 bg-transparent text-xs sm:text-sm text-white outline-none"
                    />
                  ) : (
                    <span className="text-xs sm:text-sm text-gray-300 truncate">{profile.name}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 sm:gap-3 rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3">
                  <Mail size={16} sm:size={18} className="text-[#C8A96A] flex-shrink-0" />
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleEditChange}
                      className="flex-1 bg-transparent text-xs sm:text-sm text-white outline-none"
                    />
                  ) : (
                    <span className="text-xs sm:text-sm text-gray-300 truncate">{profile.email}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 sm:gap-3 rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3">
                  <Phone size={16} sm:size={18} className="text-[#C8A96A] flex-shrink-0" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={editData.phone}
                      onChange={handleEditChange}
                      className="flex-1 bg-transparent text-xs sm:text-sm text-white outline-none"
                    />
                  ) : (
                    <span className="text-xs sm:text-sm text-gray-300 truncate">{profile.phone}</span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Change Password */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur-xl"
            >
              <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                <Lock size={18} sm:size={20} className="text-[#C8A96A]" />
                Change Password
              </h3>
              <form onSubmit={handleChangePassword} className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                <div className="relative rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3">
                  <Lock size={16} sm:size={18} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#C8A96A]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Current Password"
                    required
                    className="w-full bg-transparent pl-9 sm:pl-10 pr-8 sm:pr-10 text-xs sm:text-sm text-white outline-none placeholder:text-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={14} sm:size={16} /> : <Eye size={14} sm:size={16} />}
                  </button>
                </div>
                <div className="relative rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3">
                  <Lock size={16} sm:size={18} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#C8A96A]" />
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="New Password"
                    required
                    minLength={6}
                    className="w-full bg-transparent pl-9 sm:pl-10 pr-3 sm:pr-4 text-xs sm:text-sm text-white outline-none placeholder:text-gray-500"
                  />
                </div>
                <div className="relative rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3">
                  <Lock size={16} sm:size={18} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#C8A96A]" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm New Password"
                    required
                    className="w-full bg-transparent pl-9 sm:pl-10 pr-3 sm:pr-4 text-xs sm:text-sm text-white outline-none placeholder:text-gray-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#C8A96A] py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-black transition hover:scale-[1.02] hover:bg-[#d8ba81]"
                >
                  Update Password
                </button>
              </form>
            </motion.div>

            {/* Account Actions */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur-xl"
            >
              <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                <Shield size={18} sm:size={20} className="text-[#C8A96A]" />
                Account Actions
              </h3>
              <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                {/* Add Another Account */}
                <button
                  onClick={() => alert("Add another account feature coming soon!")}
                  className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3 transition hover:border-[#C8A96A]/30"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <UserPlus size={16} sm:size={18} className="text-[#C8A96A] flex-shrink-0" />
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-medium text-white">Add Another Account</p>
                      <p className="text-[10px] sm:text-xs text-gray-400">Switch between multiple accounts</p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm text-[#C8A96A]">+</span>
                </button>

                {/* Logout */}
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="flex w-full items-center justify-between rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-2 sm:p-3 transition hover:border-yellow-500/30"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <LogOut size={16} sm:size={18} className="text-yellow-400 flex-shrink-0" />
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-medium text-white">Logout</p>
                      <p className="text-[10px] sm:text-xs text-gray-400">Sign out of your account</p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm text-yellow-400">→</span>
                </button>

                {/* Delete Account */}
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex w-full items-center justify-between rounded-xl border border-red-500/20 bg-red-500/5 p-2 sm:p-3 transition hover:border-red-500/30"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Trash2 size={16} sm:size={18} className="text-red-400 flex-shrink-0" />
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-medium text-white">Delete Account</p>
                      <p className="text-[10px] sm:text-xs text-gray-400">Permanently delete your account</p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm text-red-400">→</span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

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

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md rounded-2xl sm:rounded-3xl border border-red-500/30 bg-[#0B0B0C] p-6 sm:p-8 shadow-2xl"
          >
            <div className="text-center">
              <div className="mx-auto mb-3 sm:mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-red-500/20">
                <AlertTriangle size={28} sm:size={32} className="text-red-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Delete Account?</h2>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-400">
                This action cannot be undone. All your data will be permanently deleted.
              </p>
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 rounded-xl border border-white/10 bg-transparent py-2.5 sm:py-3 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 rounded-xl bg-red-500 py-2.5 sm:py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-red-600"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default Settings;