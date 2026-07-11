import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  X,
  Save,
  Link as LinkIcon,
  FileText,
  BookOpen,
  ExternalLink,
  Edit,
  Trash2,
  Globe,
  Hash,
  FolderOpen,
  Filter,
  Clock,
  Star,
  StarOff,
  ChevronDown,
} from "lucide-react";
import { FaYoutube, FaGithub, FaLinkedin, FaTwitter, FaMedium, FaDev, FaStackOverflow } from "react-icons/fa";

import bg from "../../assets/images/greeting.avif";

// Platform options
const platformOptions = [
  { value: "youtube", label: "YouTube", icon: FaYoutube, color: "#FF0000" },
  { value: "github", label: "GitHub", icon: FaGithub, color: "#ffffff" },
  { value: "linkedin", label: "LinkedIn", icon: FaLinkedin, color: "#0077B5" },
  { value: "twitter", label: "Twitter/X", icon: FaTwitter, color: "#1DA1F2" },
  { value: "medium", label: "Medium", icon: FaMedium, color: "#000000" },
  { value: "devto", label: "Dev.to", icon: FaDev, color: "#0A0A0A" },
  { value: "stackoverflow", label: "Stack Overflow", icon: FaStackOverflow, color: "#F48024" },
  { value: "other", label: "Other", icon: Globe, color: "#C8A96A" },
];

// Mock resources data
const initialResources = [
  {
    id: 1,
    title: "React Official Documentation",
    description: "Complete guide to React with hooks, components, and best practices.",
    url: "https://react.dev",
    platform: "other",
    category: "Documentation",
    tags: ["React", "Frontend", "JavaScript"],
    isFavorite: true,
    addedDate: "2025-01-15",
    notes: "Great for learning React from scratch",
  },
  {
    id: 2,
    title: "JavaScript Mastery - YouTube Channel",
    description: "Best channel for JavaScript, React, and full-stack projects.",
    url: "https://youtube.com/@javascriptmastery",
    platform: "youtube",
    category: "Video",
    tags: ["JavaScript", "React", "Full Stack"],
    isFavorite: true,
    addedDate: "2025-01-20",
    notes: "Excellent project-based tutorials",
  },
  {
    id: 3,
    title: "LeetCode GitHub Solutions",
    description: "Collection of LeetCode problem solutions in multiple languages.",
    url: "https://github.com/leetcode-pp/leetcode",
    platform: "github",
    category: "Code Repository",
    tags: ["DSA", "Algorithms", "Python"],
    isFavorite: false,
    addedDate: "2025-01-25",
    notes: "Useful for interview preparation",
  },
  {
    id: 4,
    title: "LinkedIn Learning - Interview Prep",
    description: "Comprehensive course on technical interview preparation.",
    url: "https://linkedin.com/learning/interview-prep",
    platform: "linkedin",
    category: "Course",
    tags: ["Interview", "Career", "Soft Skills"],
    isFavorite: false,
    addedDate: "2025-02-01",
    notes: "Includes behavioral and technical aspects",
  },
  {
    id: 5,
    title: "System Design Interview Guide",
    description: "Complete guide to system design interviews with examples.",
    url: "https://github.com/donnemartin/system-design-primer",
    platform: "github",
    category: "Documentation",
    tags: ["System Design", "Architecture", "Interview"],
    isFavorite: true,
    addedDate: "2025-02-10",
    notes: "Must-read for senior positions",
  },
  {
    id: 6,
    title: "Code with Harry - YouTube",
    description: "Hindi/Urdu programming tutorials for beginners to advanced.",
    url: "https://youtube.com/@CodeWithHarry",
    platform: "youtube",
    category: "Video",
    tags: ["Programming", "Hindi", "Tutorial"],
    isFavorite: false,
    addedDate: "2025-02-15",
    notes: "Great for beginners",
  },
];

function Resources() {
  const [resources, setResources] = useState(initialResources);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    platform: "other",
    category: "Documentation",
    tags: "",
    notes: "",
    isFavorite: false,
  });

  const categories = ["All", "Documentation", "Video", "Course", "Code Repository", "Article", "Blog", "Tool"];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddResource = (e) => {
    e.preventDefault();
    const newResource = {
      id: resources.length + 1,
      title: formData.title,
      description: formData.description,
      url: formData.url,
      platform: formData.platform,
      category: formData.category,
      tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      notes: formData.notes,
      isFavorite: formData.isFavorite,
      addedDate: new Date().toISOString().split("T")[0],
    };
    setResources((prev) => [newResource, ...prev]);
    setShowAddForm(false);
    setFormData({
      title: "",
      description: "",
      url: "",
      platform: "other",
      category: "Documentation",
      tags: "",
      notes: "",
      isFavorite: false,
    });
  };

  const handleEditResource = (resource) => {
    setEditingId(resource.id);
    setFormData({
      title: resource.title,
      description: resource.description || "",
      url: resource.url,
      platform: resource.platform,
      category: resource.category,
      tags: resource.tags.join(", "),
      notes: resource.notes || "",
      isFavorite: resource.isFavorite,
    });
  };

  const handleUpdateResource = (e) => {
    e.preventDefault();
    setResources((prev) =>
      prev.map((resource) =>
        resource.id === editingId
          ? {
              ...resource,
              title: formData.title,
              description: formData.description,
              url: formData.url,
              platform: formData.platform,
              category: formData.category,
              tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
              notes: formData.notes,
              isFavorite: formData.isFavorite,
            }
          : resource
      )
    );
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      url: "",
      platform: "other",
      category: "Documentation",
      tags: "",
      notes: "",
      isFavorite: false,
    });
  };

  const handleDeleteResource = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setResources((prev) => prev.filter((resource) => resource.id !== id));
    }
  };

  const handleToggleFavorite = (id) => {
    setResources((prev) =>
      prev.map((resource) =>
        resource.id === id
          ? { ...resource, isFavorite: !resource.isFavorite }
          : resource
      )
    );
  };

  const getPlatformIcon = (platform) => {
    const found = platformOptions.find((p) => p.value === platform);
    if (found) {
      const Icon = found.icon;
      return <Icon size={18} style={{ color: found.color }} />;
    }
    return <Globe size={18} className="text-gray-500" />;
  };

  const getPlatformColor = (platform) => {
    const found = platformOptions.find((p) => p.value === platform);
    return found?.color || "#C8A96A";
  };

  const filteredResources = resources
    .filter((resource) => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPlatform = selectedPlatform === "all" || resource.platform === selectedPlatform;
      const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
      return matchesSearch && matchesPlatform && matchesCategory;
    });

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-[#090909]/85" />
      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-[#C8A96A]/10 blur-[150px]" />

      <div className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="uppercase tracking-[0.2rem] sm:tracking-[0.3rem] text-[#C8A96A] text-xs sm:text-sm">PrepVault</p>
            <h1 className="hero-font mt-2 sm:mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-white">Resources</h1>
            <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-400">Save and organize your learning resources.</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-[#C8A96A] px-4 sm:px-7 py-3 sm:py-4 text-sm sm:text-base font-semibold text-black shadow-lg shadow-[#C8A96A]/20 transition hover:scale-105"
          >
            {showAddForm ? <X size={18} sm:size={20} /> : <Plus size={18} sm:size={20} />}
            {showAddForm ? "Cancel" : "Add Resource"}
          </button>
        </div>

        {/* Filters & Search */}
        <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="relative flex-1 min-w-[180px] sm:max-w-sm">
            <Search size={16} sm:size={18} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 sm:py-3 pl-9 sm:pl-12 pr-3 sm:pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#C8A96A]"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 sm:gap-2">
              <Filter size={16} sm:size={18} className="text-gray-500" />
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-white outline-none transition focus:border-[#C8A96A]"
              >
                <option value="all">All Platforms</option>
                {platformOptions.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <FolderOpen size={16} sm:size={18} className="text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-white outline-none transition focus:border-[#C8A96A]"
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c !== "All").map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ADD RESOURCE FORM */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 sm:mt-6 rounded-xl sm:rounded-2xl border border-[#C8A96A]/30 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur-xl"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white">Add New Resource</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Save a useful link or resource.</p>

              <form onSubmit={handleAddResource} className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">
                    Title <span className="text-[#C8A96A]">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Resource title"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#C8A96A]"
                  />
                </div>

                <div>
                  <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">
                    URL <span className="text-[#C8A96A]">*</span>
                  </label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#C8A96A]"
                  />
                </div>

                <div>
                  <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">Platform</label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white outline-none transition focus:border-[#C8A96A]"
                  >
                    {platformOptions.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white outline-none transition focus:border-[#C8A96A]"
                  >
                    {categories.filter(c => c !== "All").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of the resource..."
                    rows={2}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3 sm:px-4 py-2 sm:py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#C8A96A] resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">
                    Tags <span className="text-gray-500">(comma separated)</span>
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="React, JavaScript, Interview"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#C8A96A]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Personal notes about this resource..."
                    rows={2}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-3 sm:px-4 py-2 sm:py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#C8A96A] resize-none"
                  />
                </div>

                <div className="md:col-span-2 flex items-center gap-2 sm:gap-3">
                  <input
                    type="checkbox"
                    name="isFavorite"
                    checked={formData.isFavorite}
                    onChange={handleInputChange}
                    className="accent-[#C8A96A] h-4 w-4 sm:h-5 sm:w-5"
                  />
                  <label className="text-xs sm:text-sm text-gray-300">Mark as Favorite</label>
                </div>

                <div className="md:col-span-2 flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setFormData({
                        title: "",
                        description: "",
                        url: "",
                        platform: "other",
                        category: "Documentation",
                        tags: "",
                        notes: "",
                        isFavorite: false,
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
                    Add Resource
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RESOURCES GRID */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`group rounded-xl sm:rounded-2xl border p-4 sm:p-5 md:p-6 transition ${
                  resource.isFavorite
                    ? "border-[#C8A96A]/30 bg-[#C8A96A]/5"
                    : "border-white/10 bg-white/5 hover:border-[#C8A96A]/30"
                }`}
              >
                {editingId === resource.id ? (
                  <form onSubmit={handleUpdateResource} className="space-y-3">
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-3 sm:px-4 py-2 text-sm text-white outline-none focus:border-[#C8A96A]"
                      required
                    />
                    <input
                      type="url"
                      name="url"
                      value={formData.url}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-3 sm:px-4 py-2 text-sm text-white outline-none focus:border-[#C8A96A]"
                      required
                    />
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-3 sm:px-4 py-2 text-sm text-white outline-none focus:border-[#C8A96A] resize-none"
                    />
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        type="submit"
                        className="rounded-xl bg-[#C8A96A] px-4 py-2 text-sm font-semibold text-black transition hover:scale-105"
                      >
                        <Save size={16} className="inline mr-1" />
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
                      >
                        <X size={16} className="inline mr-1" />
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="rounded-xl bg-white/5 p-2 sm:p-2.5 flex-shrink-0">
                          {getPlatformIcon(resource.platform)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#C8A96A] transition break-words">
                            {resource.title}
                          </h3>
                          <p className="text-[10px] sm:text-xs text-gray-400">{resource.category}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggleFavorite(resource.id)}
                        className="text-gray-500 transition hover:scale-110 flex-shrink-0 ml-2"
                      >
                        {resource.isFavorite ? (
                          <Star size={16} sm:size={18} className="fill-[#C8A96A] text-[#C8A96A]" />
                        ) : (
                          <StarOff size={16} sm:size={18} />
                        )}
                      </button>
                    </div>

                    {/* Description */}
                    {resource.description && (
                      <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-300 line-clamp-2 break-words">
                        {resource.description}
                      </p>
                    )}

                    {/* Tags */}
                    {resource.tags.length > 0 && (
                      <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-1.5">
                        {resource.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/5 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="mt-3 sm:mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock size={10} sm:size={12} />
                          {resource.addedDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-1 sm:p-1.5 text-gray-400 transition hover:text-[#C8A96A]"
                        >
                          <ExternalLink size={14} sm:size={16} />
                        </a>
                        <button
                          onClick={() => handleEditResource(resource)}
                          className="rounded-lg p-1 sm:p-1.5 text-gray-400 transition hover:bg-[#C8A96A]/20 hover:text-[#C8A96A]"
                        >
                          <Edit size={12} sm:size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteResource(resource.id, resource.title)}
                          className="rounded-lg p-1 sm:p-1.5 text-gray-400 transition hover:bg-red-500/20 hover:text-red-400"
                        >
                          <Trash2 size={12} sm:size={14} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 sm:py-12">
              <p className="text-sm sm:text-base text-gray-400">No resources found. Add your first resource!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Resources;