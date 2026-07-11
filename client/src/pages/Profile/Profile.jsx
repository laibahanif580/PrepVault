import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  Globe,
  Edit,
  Save,
  X,
  Camera,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Laiba",
    email: "laiba@example.com",
    phone: "+92 300 1234567",
    location: "Lahore,Pakistan",
    title: "Software Engineer",
    department: "Computer Science",
    university: "Fast university",
    graduationYear: "2026",
    bio: "Passionate software engineer with a strong interest in full-stack development, AI, and interview preparation. Always eager to learn new technologies and share knowledge with others.",
    github: "https://github.com/laiba",
    linkedin: "https://linkedin.com/in/laiba",
    twitter: "https://twitter.com/laiba",
    website: "https://laiba.dev",
    joinDate: "January 2025",
    stats: {
      subjects: 6,
      notes: 24,
      projects: 8,
      resources: 15,
      sessions: 12,
      completed: 18,
    },
    skills: ["React", "Node.js", "JavaScript", "Python", "Tailwind CSS", "MongoDB", "Express", "TypeScript"],
  });

  const [editData, setEditData] = useState({ ...profile });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    setProfile(editData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData({ ...profile });
    setIsEditing(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-[#C8A96A]/10 blur-[170px]" />
      <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-white/5 blur-[170px]" />

      <div className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-6xl"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="uppercase tracking-[0.2rem] sm:tracking-[0.3rem] text-[#C8A96A] text-xs sm:text-sm">PrepVault</p>
              <h1 className="hero-font mt-2 sm:mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-white">Profile</h1>
              <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-400">Manage your personal information and preferences.</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 rounded-xl bg-[#C8A96A] px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-black transition hover:scale-105"
                >
                  <Edit size={16} sm:size={18} />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-gray-400 transition hover:bg-white/5 hover:text-white"
                  >
                    <X size={16} sm:size={18} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="flex items-center gap-2 rounded-xl bg-[#C8A96A] px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-black transition hover:scale-105"
                  >
                    <Save size={16} sm:size={18} />
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            variants={itemVariants}
            className="overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
          >
            {/* Profile Header */}
            <div className="relative border-b border-white/10 p-4 sm:p-6 md:p-8">
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4 sm:gap-6">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full bg-gradient-to-br from-[#C8A96A] to-[#d8ba81] flex items-center justify-center text-3xl sm:text-4xl font-bold text-black shadow-lg shadow-[#C8A96A]/20">
                    {profile.name.charAt(0)}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 rounded-full bg-[#C8A96A] p-1.5 sm:p-2 text-black transition hover:scale-110">
                      <Camera size={14} sm:size={16} />
                    </button>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 text-center sm:text-left">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                      className="text-xl sm:text-2xl font-bold bg-transparent border-b border-white/20 text-white outline-none focus:border-[#C8A96A] w-full sm:w-auto"
                    />
                  ) : (
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">{profile.name}</h2>
                  )}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 mt-2">
                    {isEditing ? (
                      <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleEditChange}
                        className="text-xs sm:text-sm bg-transparent border-b border-white/20 text-gray-400 outline-none focus:border-[#C8A96A] w-full sm:w-auto"
                      />
                    ) : (
                      <p className="text-xs sm:text-sm text-[#C8A96A]">{profile.title}</p>
                    )}
                    <span className="h-1 w-1 rounded-full bg-gray-500 hidden sm:block" />
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                      <Calendar size={12} sm:size={14} />
                      <span>Joined {profile.joinDate}</span>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-2 sm:gap-3">
                  {profile.github && (
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="rounded-lg p-1.5 sm:p-2 text-gray-400 transition hover:bg-white/5 hover:text-[#C8A96A]">
                      <FaGithub size={16} sm:size={20} />
                    </a>
                  )}
                  {profile.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-lg p-1.5 sm:p-2 text-gray-400 transition hover:bg-white/5 hover:text-[#0077B5]">
                      <FaLinkedin size={16} sm:size={20} />
                    </a>
                  )}
                  {profile.twitter && (
                    <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="rounded-lg p-1.5 sm:p-2 text-gray-400 transition hover:bg-white/5 hover:text-[#1DA1F2]">
                      <FaTwitter size={16} sm:size={20} />
                    </a>
                  )}
                  {profile.website && (
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="rounded-lg p-1.5 sm:p-2 text-gray-400 transition hover:bg-white/5 hover:text-[#C8A96A]">
                      <Globe size={16} sm:size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Body */}
            <div className="grid gap-6 sm:gap-8 p-4 sm:p-6 md:p-8 md:grid-cols-3">
              <div className="md:col-span-2 space-y-4 sm:space-y-6">
                {/* Bio */}
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-400">About</h3>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={editData.bio}
                      onChange={handleEditChange}
                      rows={3}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white outline-none transition focus:border-[#C8A96A] resize-none"
                    />
                  ) : (
                    <p className="mt-2 text-sm sm:text-base text-gray-300 leading-relaxed">{profile.bio}</p>
                  )}
                </div>

                {/* Personal Details */}
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-400">Personal Details</h3>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3">
                      <Mail size={16} sm:size={18} className="text-[#C8A96A] flex-shrink-0" />
                      {isEditing ? (
                        <input type="email" name="email" value={editData.email} onChange={handleEditChange} className="flex-1 bg-transparent text-xs sm:text-sm text-white outline-none" />
                      ) : (
                        <span className="text-xs sm:text-sm text-gray-300 truncate">{profile.email}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3">
                      <Phone size={16} sm:size={18} className="text-[#C8A96A] flex-shrink-0" />
                      {isEditing ? (
                        <input type="text" name="phone" value={editData.phone} onChange={handleEditChange} className="flex-1 bg-transparent text-xs sm:text-sm text-white outline-none" />
                      ) : (
                        <span className="text-xs sm:text-sm text-gray-300">{profile.phone}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3">
                      <MapPin size={16} sm:size={18} className="text-[#C8A96A] flex-shrink-0" />
                      {isEditing ? (
                        <input type="text" name="location" value={editData.location} onChange={handleEditChange} className="flex-1 bg-transparent text-xs sm:text-sm text-white outline-none" />
                      ) : (
                        <span className="text-xs sm:text-sm text-gray-300 truncate">{profile.location}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3">
                      <Briefcase size={16} sm:size={18} className="text-[#C8A96A] flex-shrink-0" />
                      {isEditing ? (
                        <input type="text" name="title" value={editData.title} onChange={handleEditChange} className="flex-1 bg-transparent text-xs sm:text-sm text-white outline-none" />
                      ) : (
                        <span className="text-xs sm:text-sm text-gray-300 truncate">{profile.title}</span>
                      )}
                    </div>
                    <div className="sm:col-span-2 flex items-center gap-2 sm:gap-3 rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3">
                      <GraduationCap size={16} sm:size={18} className="text-[#C8A96A] flex-shrink-0" />
                      <div className="flex-1">
                        {isEditing ? (
                          <>
                            <input type="text" name="university" value={editData.university} onChange={handleEditChange} placeholder="University" className="w-full bg-transparent text-xs sm:text-sm text-white outline-none" />
                            <input type="text" name="graduationYear" value={editData.graduationYear} onChange={handleEditChange} placeholder="Year" className="w-full bg-transparent text-xs text-gray-400 outline-none" />
                          </>
                        ) : (
                          <>
                            <span className="text-xs sm:text-sm text-gray-300">{profile.university}</span>
                            <span className="block text-xs text-gray-500">Class of {profile.graduationYear}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-400">Skills</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
                    {isEditing ? (
                      <input
                        type="text"
                        name="skills"
                        value={editData.skills.join(", ")}
                        onChange={(e) => setEditData((prev) => ({ ...prev, skills: e.target.value.split(",").map((s) => s.trim()) }))}
                        placeholder="React, Node.js, Python"
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-3 sm:px-4 py-2 sm:py-3 text-sm text-white outline-none transition focus:border-[#C8A96A]"
                      />
                    ) : (
                      profile.skills.map((skill) => (
                        <span key={skill} className="rounded-full border border-[#C8A96A]/20 bg-[#C8A96A]/10 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-[#C8A96A]">
                          {skill}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-400">Statistics</h3>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3 text-center">
                      <p className="text-xl sm:text-2xl font-bold text-[#C8A96A]">{profile.stats.subjects}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400">Subjects</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3 text-center">
                      <p className="text-xl sm:text-2xl font-bold text-[#C8A96A]">{profile.stats.notes}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400">Notes</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3 text-center">
                      <p className="text-xl sm:text-2xl font-bold text-[#C8A96A]">{profile.stats.projects}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400">Projects</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3 text-center">
                      <p className="text-xl sm:text-2xl font-bold text-[#C8A96A]">{profile.stats.resources}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400">Resources</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3 text-center">
                      <p className="text-xl sm:text-2xl font-bold text-[#C8A96A]">{profile.stats.sessions}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400">Sessions</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-2 sm:p-3 text-center">
                      <p className="text-xl sm:text-2xl font-bold text-[#C8A96A]">{profile.stats.completed}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400">Completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Profile;