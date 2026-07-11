import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  ExternalLink,
  ArrowRight,
  X,
  Save,
  Globe,
  Code,
  Calendar,
  Clock,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import bg from "../../assets/images/greeting.avif";
import projectImage1 from "../../assets/images/coding.jpg";
import projectImage2 from "../../assets/images/flashcards.jpg";
import projectImage3 from "../../assets/images/resources.jpg";
// Mock project data
const initialProjects = [
  {
    id: 1,
    title: "PrepVault",
    description: "An all-in-one interview preparation platform with AI-powered assistance, note-taking, and revision planning.",
    image: projectImage1,
    challenges: "Building a scalable architecture for real-time collaboration and AI integration.",
    liveDemo: "https://prepvault-flax.vercel.app",
    github: "https://github.com/laibahanif580/PrepVault",
    linkedin: "https://linkedin.com/in/yourusername",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    createdAt: "Jan 15, 2025",
    updatedAt: "2 days ago",
  },
  {
    id: 2,
    title: "Task Manager Pro",
    description: "A full-featured task management application with team collaboration, real-time updates, and analytics dashboard.",
    image: projectImage2,
    challenges: "Implementing real-time sync across multiple users and devices.",
    liveDemo: "https://taskmanager.dev",
    github: "https://github.com/yourusername/taskmanager",
    linkedin: "",
    technologies: ["React", "Firebase", "Tailwind CSS"],
    createdAt: "Feb 1, 2025",
    updatedAt: "1 week ago",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website showcasing projects, skills, and experience with smooth animations.",
    image: projectImage3,
    challenges: "Creating smooth animations and optimizing performance.",
    liveDemo: "https://portfolio.dev",
    github: "https://github.com/yourusername/portfolio",
    linkedin: "https://linkedin.com/in/yourusername",
    technologies: ["React", "Framer Motion", "Tailwind CSS"],
    createdAt: "Mar 10, 2025",
    updatedAt: "3 days ago",
  },
];

function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    challenges: "",
    liveDemo: "",
    github: "",
    linkedin: "",
    technologies: "",
    image: projectImage1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const newProject = {
      id: projects.length + 1,
      title: formData.title,
      description: formData.description,
      challenges: formData.challenges || "No challenges added",
      liveDemo: formData.liveDemo || "",
      github: formData.github || "",
      linkedin: formData.linkedin || "",
      technologies: formData.technologies
        ? formData.technologies.split(",").map((t) => t.trim())
        : [],
      image: projectImage,
      createdAt: "Just now",
      updatedAt: "Just now",
    };
    setProjects((prev) => [newProject, ...prev]);
    setShowAddForm(false);
    setFormData({
      title: "",
      description: "",
      challenges: "",
      liveDemo: "",
      github: "",
      linkedin: "",
      technologies: "",
      image: projectImage,
    });
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#090909]/85" />

      {/* Glow */}
      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-[#C8A96A]/10 blur-[150px]" />

      <div className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="uppercase tracking-[0.2rem] sm:tracking-[0.3rem] text-[#C8A96A] text-xs sm:text-sm">PrepVault</p>
            <h1 className="hero-font mt-2 sm:mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-white">Projects</h1>
            <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-400">Showcase your work and track your progress.</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-[#C8A96A] px-4 sm:px-7 py-3 sm:py-4 text-sm sm:text-base font-semibold text-black shadow-lg shadow-[#C8A96A]/20 transition hover:scale-105"
          >
            {showAddForm ? <X size={18} sm:size={20} /> : <Plus size={18} sm:size={20} />}
            {showAddForm ? "Cancel" : "New Project"}
          </button>
        </div>

        {/* Search */}
        <div className="mt-4 sm:mt-6">
          <div className="relative max-w-full sm:max-w-md">
            <Search size={16} sm:size={18} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 sm:py-3 pl-9 sm:pl-12 pr-3 sm:pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#C8A96A]"
            />
          </div>
        </div>

        {/* ============================================================ */}
        {/* ADD PROJECT FORM - Inline */}
        {/* ============================================================ */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 sm:mt-6 rounded-xl sm:rounded-2xl border border-[#C8A96A]/30 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur-xl"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white">Add New Project</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Fill in the details below to add a new project.</p>

              <form onSubmit={handleAddProject} className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {/* Title - Required */}
                <div>
                  <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">
                    Project Title <span className="text-[#C8A96A]">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., PrepVault"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#C8A96A]"
                  />
                </div>

                {/* Description - Required */}
                <div>
                  <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">
                    Description <span className="text-[#C8A96A]">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of your project..."
                    rows={3}
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#C8A96A] resize-none"
                  />
                </div>

                {/* Challenges - Optional */}
                <div>
                  <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">
                    Challenges Faced <span className="text-gray-500">(Optional)</span>
                  </label>
                  <textarea
                    name="challenges"
                    value={formData.challenges}
                    onChange={handleInputChange}
                    placeholder="What challenges did you face during this project?"
                    rows={2}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#C8A96A] resize-none"
                  />
                </div>

                {/* Technologies - Required */}
                <div>
                  <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">
                    Technologies <span className="text-[#C8A96A]">*</span>
                  </label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    placeholder="React, Node.js, MongoDB (comma separated)"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#C8A96A]"
                  />
                </div>

                {/* Live Demo - Optional */}
                <div>
                  <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">
                    Live Demo URL <span className="text-gray-500">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Globe size={16} sm:size={18} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="url"
                      name="liveDemo"
                      value={formData.liveDemo}
                      onChange={handleInputChange}
                      placeholder="https://yourproject.com"
                      className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 sm:py-3 pl-9 sm:pl-12 pr-3 sm:pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#C8A96A]"
                    />
                  </div>
                </div>

                {/* GitHub - Optional */}
                <div>
                  <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">
                    GitHub URL <span className="text-gray-500">(Optional)</span>
                  </label>
                  <div className="relative">
                    <FaGithub size={16} sm:size={18} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      placeholder="https://github.com/yourusername/project"
                      className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 sm:py-3 pl-9 sm:pl-12 pr-3 sm:pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#C8A96A]"
                    />
                  </div>
                </div>

                {/* LinkedIn - Optional */}
                <div>
                  <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">
                    LinkedIn URL <span className="text-gray-500">(Optional)</span>
                  </label>
                  <div className="relative">
                    <FaLinkedin size={16} sm:size={18} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/yourusername"
                      className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 sm:py-3 pl-9 sm:pl-12 pr-3 sm:pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#C8A96A]"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="md:col-span-2 flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setFormData({
                        title: "",
                        description: "",
                        challenges: "",
                        liveDemo: "",
                        github: "",
                        linkedin: "",
                        technologies: "",
                        image: projectImage,
                      });
                    }}
                    className="flex-1 rounded-xl border border-white/10 bg-transparent py-2.5 sm:py-3 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-[#C8A96A] py-2.5 sm:py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-[#d8ba81] flex items-center justify-center gap-2"
                  >
                    <Save size={16} sm:size={18} />
                    Add Project
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============================================================ */}
        {/* PROJECT CARDS */}
        {/* ============================================================ */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition hover:border-[#C8A96A]/40 hover:shadow-lg hover:shadow-[#C8A96A]/5"
              >
                {/* Image */}
                <div className="relative h-36 sm:h-44 md:h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Tech tags on image */}
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 flex flex-wrap gap-1 sm:gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-black/60 px-1.5 sm:px-2.5 py-0.5 text-[8px] sm:text-xs text-gray-300 backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="rounded-full bg-black/60 px-1.5 sm:px-2.5 py-0.5 text-[8px] sm:text-xs text-gray-400 backdrop-blur-sm">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 md:p-5">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white group-hover:text-[#C8A96A] transition">
                    {project.title}
                  </h3>
                  <p className="mt-1 sm:mt-1.5 line-clamp-2 text-xs sm:text-sm text-gray-400">
                    {project.description}
                  </p>

                  <div className="mt-3 sm:mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 transition hover:text-[#C8A96A]"
                        >
                          <Globe size={14} sm:size={16} />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 transition hover:text-[#C8A96A]"
                        >
                          <FaGithub size={14} sm:size={16} />
                        </a>
                      )}
                      {project.linkedin && (
                        <a
                          href={project.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 transition hover:text-[#0077B5]"
                        >
                          <FaLinkedin size={14} sm:size={16} />
                        </a>
                      )}
                    </div>
                    <Link
                      to={`/projects/${project.id}`}
                      className="flex items-center gap-1 text-xs sm:text-sm text-[#C8A96A] transition hover:gap-2"
                    >
                      Details <ArrowRight size={12} sm:size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 sm:py-12">
              <p className="text-sm sm:text-base text-gray-400">No projects found. Add your first project!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Projects;