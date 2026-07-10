import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Globe,
  Calendar,
  Clock,
  Code,
  ExternalLink,
  Trash2,
  Edit,
  Save,
  X,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import bg from "../../assets/images/greeting.avif";
import projectImage from "../../assets/images/coding.jpg";

const projectData = {
  1: {
    id: 1,
    title: "PrepVault",
    description: "An all-in-one interview preparation platform with AI-powered assistance, note-taking, and revision planning.",
    image: projectImage,
    challenges: "Building a scalable architecture for real-time collaboration and AI integration was the biggest challenge. Ensuring data consistency across multiple users while maintaining performance required careful planning and optimization.",
    liveDemo: "https://prepvault.dev",
    github: "https://github.com/yourusername/prepvault",
    linkedin: "https://linkedin.com/in/yourusername",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Framer Motion"],
    createdAt: "Jan 15, 2025",
    updatedAt: "2 days ago",
  },
  2: {
    id: 2,
    title: "Task Manager Pro",
    description: "A full-featured task management application with team collaboration, real-time updates, and analytics dashboard.",
    image: projectImage,
    challenges: "Implementing real-time sync across multiple users and devices required efficient WebSocket management and conflict resolution strategies.",
    liveDemo: "https://taskmanager.dev",
    github: "https://github.com/yourusername/taskmanager",
    linkedin: "",
    technologies: ["React", "Firebase", "Tailwind CSS", "WebSockets"],
    createdAt: "Feb 1, 2025",
    updatedAt: "1 week ago",
  },
  3: {
    id: 3,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website showcasing projects, skills, and experience with smooth animations.",
    image: projectImage,
    challenges: "Creating smooth animations and optimizing performance for a seamless user experience.",
    liveDemo: "https://portfolio.dev",
    github: "https://github.com/yourusername/portfolio",
    linkedin: "https://linkedin.com/in/yourusername",
    technologies: ["React", "Framer Motion", "Tailwind CSS"],
    createdAt: "Mar 10, 2025",
    updatedAt: "3 days ago",
  },
};

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(projectData[id] || projectData[1]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...project });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    setProject(editData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData({ ...project });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      navigate("/projects");
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
      <div className="absolute inset-0 bg-[#090909]/85" />
      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-[#C8A96A]/10 blur-[150px]" />

      <div className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8">
        {/* Back Button */}
        <Link to="/projects" className="inline-flex items-center gap-2 text-gray-400 transition hover:text-[#C8A96A] mb-4 sm:mb-6">
          <ArrowLeft size={18} sm:size={20} />
          <span className="text-sm sm:text-base">Back to Projects</span>
        </Link>

        {/* Project Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <p className="uppercase tracking-[0.2rem] sm:tracking-[0.3rem] text-[#C8A96A] text-xs sm:text-sm">Project Details</p>
            <h1 className="hero-font mt-2 text-3xl sm:text-4xl md:text-5xl italic text-white">{project.title}</h1>
            <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-[#C8A96A]/20 bg-[#C8A96A]/10 px-2 sm:px-3 py-0.5 text-[10px] sm:text-xs text-[#C8A96A]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {project.liveDemo && (
              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 sm:gap-2 rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-300 transition hover:border-[#C8A96A]/30 hover:text-[#C8A96A]">
                <Globe size={14} sm:size={16} />
                <span className="hidden xs:inline">Live Demo</span>
                <ExternalLink size={12} sm:size={14} />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 sm:gap-2 rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-300 transition hover:border-[#C8A96A]/30 hover:text-[#C8A96A]">
                <FaGithub size={14} sm:size={16} />
                <span className="hidden xs:inline">GitHub</span>
              </a>
            )}
            <button onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-1 sm:gap-2 rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-300 transition hover:border-[#C8A96A]/30 hover:text-[#C8A96A]">
              <Edit size={14} sm:size={16} />
              <span className="hidden xs:inline">Edit</span>
            </button>
            <button onClick={handleDelete} className="flex items-center gap-1 sm:gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-red-400 transition hover:border-red-500/50 hover:bg-red-500/20">
              <Trash2 size={14} sm:size={16} />
              <span className="hidden xs:inline">Delete</span>
            </button>
          </div>
        </div>

        {/* Project Image */}
        <div className="mt-4 sm:mt-6 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10">
          <img src={project.image} alt={project.title} className="h-40 sm:h-48 md:h-56 lg:h-64 w-full object-cover" />
        </div>

        {/* Project Content */}
        <div className="mt-6 sm:mt-8 grid gap-6 sm:gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur-xl">
              <h2 className="text-base sm:text-lg font-semibold text-white">Description</h2>
              {isEditing ? (
                <textarea name="description" value={editData.description} onChange={handleEditChange} rows={4} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white outline-none transition focus:border-[#C8A96A] resize-none" />
              ) : (
                <p className="mt-2 text-sm sm:text-base text-gray-300">{project.description}</p>
              )}
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur-xl">
              <h2 className="text-base sm:text-lg font-semibold text-white">Challenges Faced</h2>
              {isEditing ? (
                <textarea name="challenges" value={editData.challenges} onChange={handleEditChange} rows={4} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white outline-none transition focus:border-[#C8A96A] resize-none" />
              ) : (
                <p className="mt-2 text-sm sm:text-base text-gray-300">{project.challenges || "No challenges added."}</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-3 sm:space-y-4">
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur-xl">
              <h3 className="text-sm sm:text-base font-semibold text-white">Project Info</h3>
              <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                  <Calendar size={14} sm:size={16} className="text-gray-500" />
                  <span className="text-gray-400">Created: {project.createdAt}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                  <Clock size={14} sm:size={16} className="text-gray-500" />
                  <span className="text-gray-400">Updated: {project.updatedAt}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                  <Code size={14} sm:size={16} className="text-gray-500" />
                  <span className="text-gray-400">{project.technologies.length} technologies</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur-xl">
              <h3 className="text-sm sm:text-base font-semibold text-white">Links</h3>
              <div className="mt-3 sm:mt-4 space-y-2">
                {project.liveDemo && (
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 sm:gap-3 rounded-lg border border-white/10 bg-black/20 p-2 sm:p-3 text-xs sm:text-sm text-gray-300 transition hover:border-[#C8A96A]/30 hover:text-[#C8A96A]">
                    <Globe size={14} sm:size={16} className="text-[#C8A96A]" />
                    <span className="flex-1">Live Demo</span>
                    <ExternalLink size={12} sm:size={14} className="flex-shrink-0" />
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 sm:gap-3 rounded-lg border border-white/10 bg-black/20 p-2 sm:p-3 text-xs sm:text-sm text-gray-300 transition hover:border-[#C8A96A]/30 hover:text-[#C8A96A]">
                    <FaGithub size={14} sm:size={16} className="text-[#C8A96A]" />
                    <span className="flex-1">GitHub Repository</span>
                    <ExternalLink size={12} sm:size={14} className="flex-shrink-0" />
                  </a>
                )}
                {project.linkedin && (
                  <a href={project.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 sm:gap-3 rounded-lg border border-white/10 bg-black/20 p-2 sm:p-3 text-xs sm:text-sm text-gray-300 transition hover:border-[#0077B5]/30 hover:text-[#0077B5]">
                    <FaLinkedin size={14} sm:size={16} className="text-[#0077B5]" />
                    <span className="flex-1">LinkedIn Post</span>
                    <ExternalLink size={12} sm:size={14} className="flex-shrink-0" />
                  </a>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="rounded-xl sm:rounded-2xl border border-[#C8A96A]/30 bg-white/5 p-3 sm:p-4 backdrop-blur-xl">
                <div className="flex gap-2 sm:gap-3">
                  <button onClick={handleSaveEdit} className="flex-1 rounded-xl bg-[#C8A96A] py-2 sm:py-2.5 text-sm font-semibold text-black transition hover:scale-105 flex items-center justify-center gap-2">
                    <Save size={14} sm:size={16} />
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="flex-1 rounded-xl border border-white/10 bg-transparent py-2 sm:py-2.5 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white flex items-center justify-center gap-2">
                    <X size={14} sm:size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetails;