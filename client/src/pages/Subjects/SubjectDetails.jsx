import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Plus,
  Search,
  FileText,
  Clock,
  ChevronRight,
  Edit,
  Trash2,
  X,
  Save,
  Layers,
} from "lucide-react";

import bg from "../../assets/images/greeting.avif";

function SubjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false);
  const [isEditTopicModalOpen, setIsEditTopicModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTopicId, setEditingTopicId] = useState(null);
  const [topicData, setTopicData] = useState({
    title: "",
    description: "",
  });

  const [subject, setSubject] = useState({
    id: 1,
    title: "Data Structures",
    description: "Arrays, Linked Lists, Trees, Graphs, Sorting, Searching",
    level: "Intermediate",
    totalTopics: 6,
    createdAt: "Jan 15, 2025",
    lastUpdated: "2 hours ago",
    topics: [
      { id: 1, title: "Arrays and Strings", description: "Basic operations, 2D arrays, String manipulation", date: "Today" },
      { id: 2, title: "Linked Lists", description: "Singly, Doubly, Circular linked lists", date: "Yesterday" },
      { id: 3, title: "Binary Trees", description: "Traversals, BST, AVL Trees", date: "2 days ago" },
      { id: 4, title: "Graph Algorithms", description: "BFS, DFS, Dijkstra, MST", date: "3 days ago" },
      { id: 5, title: "Sorting Techniques", description: "Quick, Merge, Heap, Bubble sort", date: "4 days ago" },
      { id: 6, title: "Searching Algorithms", description: "Binary Search, Linear Search, Hashing", date: "5 days ago" },
    ],
    resources: [
      { id: 1, title: "DSA Cheat Sheet", type: "PDF" },
      { id: 2, title: "LeetCode Solutions", type: "Link" },
      { id: 3, title: "Video Tutorial", type: "Video" },
    ],
  });

  const handleTopicInputChange = (e) => {
    const { name, value } = e.target;
    setTopicData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTopic = (e) => {
    e.preventDefault();
    const newTopic = {
      id: subject.topics.length + 1,
      title: topicData.title,
      description: topicData.description || "No description",
      date: "Just now",
    };
    setSubject((prev) => ({
      ...prev,
      topics: [...prev.topics, newTopic],
      totalTopics: prev.totalTopics + 1,
      lastUpdated: "Just now",
    }));
    setIsAddTopicModalOpen(false);
    setTopicData({ title: "", description: "" });
  };

  const handleEditTopic = (topic) => {
    setEditingTopicId(topic.id);
    setTopicData({
      title: topic.title,
      description: topic.description,
    });
    setIsEditTopicModalOpen(true);
  };

  const handleUpdateTopic = (e) => {
    e.preventDefault();
    setSubject((prev) => ({
      ...prev,
      topics: prev.topics.map((topic) =>
        topic.id === editingTopicId
          ? {
              ...topic,
              title: topicData.title,
              description: topicData.description || "No description",
              date: "Updated just now",
            }
          : topic
      ),
      lastUpdated: "Just now",
    }));
    setIsEditTopicModalOpen(false);
    setTopicData({ title: "", description: "" });
    setEditingTopicId(null);
  };

  const handleDeleteTopic = (topicId, topicTitle) => {
    if (window.confirm(`Are you sure you want to delete "${topicTitle}"? This action cannot be undone.`)) {
      setSubject((prev) => ({
        ...prev,
        topics: prev.topics.filter((topic) => topic.id !== topicId),
        totalTopics: prev.totalTopics - 1,
        lastUpdated: "Just now",
      }));
    }
  };

  const handleDeleteSubject = () => {
    if (window.confirm(`Are you sure you want to delete "${subject.title}"? This action cannot be undone.`)) {
      navigate("/subjects");
    }
  };

  const filteredTopics = subject.topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
      <div className="absolute inset-0 bg-[#090909]/85" />
      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-[#C8A96A]/10 blur-[150px]" />

      <div className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8">
        {/* Back Button */}
        <Link to="/subjects" className="inline-flex items-center gap-2 text-gray-400 transition hover:text-[#C8A96A] mb-4 sm:mb-6">
          <ArrowLeft size={18} sm:size={20} />
          <span className="text-sm sm:text-base">Back to Subjects</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="uppercase tracking-[0.2rem] sm:tracking-[0.3rem] text-[#C8A96A] text-xs sm:text-sm">Subject Details</p>
            <h1 className="hero-font mt-2 text-3xl sm:text-4xl md:text-5xl italic text-white">{subject.title}</h1>
            <p className="mt-2 text-sm sm:text-base text-gray-400 max-w-2xl">{subject.description}</p>
          </div>
          <span className="rounded-full border border-[#C8A96A]/20 bg-[#C8A96A]/10 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-[#C8A96A] whitespace-nowrap">
            {subject.level}
          </span>
        </div>

        {/* Topics & Resources */}
        <div className="mt-6 sm:mt-10 grid gap-6 sm:gap-8 lg:grid-cols-3">
          {/* Topics List */}
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-white">Topics</h2>
              <div className="relative w-full sm:w-auto">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search topics..."
                  className="w-full sm:w-48 md:w-56 rounded-xl border border-white/10 bg-white/5 px-8 sm:px-9 py-2 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#C8A96A]"
                />
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {filteredTopics.length > 0 ? (
                filteredTopics.map((topic) => (
                  <motion.div
                    key={topic.id}
                    whileHover={{ x: 4 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 transition hover:border-[#C8A96A]/30 hover:bg-white/10 gap-2"
                  >
                    <Link to={`/topics/${topic.id}`} className="flex items-start gap-2 sm:gap-3 flex-1">
                      <div className="rounded-lg bg-[#C8A96A]/20 p-1.5 sm:p-2 mt-0.5">
                        <FileText size={14} sm:size={16} className="text-[#C8A96A]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm sm:text-base font-medium text-white hover:text-[#C8A96A] transition truncate">{topic.title}</p>
                        <p className="text-xs sm:text-sm text-gray-400 line-clamp-1">{topic.description}</p>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Added {topic.date}</p>
                      </div>
                    </Link>
                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                      <button onClick={() => handleEditTopic(topic)} className="rounded-lg p-1.5 sm:p-2 text-gray-400 transition hover:bg-[#C8A96A]/20 hover:text-[#C8A96A]">
                        <Edit size={14} sm:size={16} />
                      </button>
                      <button onClick={() => handleDeleteTopic(topic.id, topic.title)} className="rounded-lg p-1.5 sm:p-2 text-gray-400 transition hover:bg-red-500/20 hover:text-red-400">
                        <Trash2 size={14} sm:size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-400 py-8 text-sm sm:text-base">No topics found. Add your first topic!</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur-xl">
              <h3 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">Quick Actions</h3>
              <div className="flex flex-col gap-2 sm:gap-3">
                <button onClick={() => setIsAddTopicModalOpen(true)} className="flex items-center justify-center gap-2 rounded-xl bg-[#C8A96A] px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-semibold text-black transition hover:scale-105">
                  <Plus size={16} sm:size={18} />
                  Add Topic
                </button>
                <button onClick={handleDeleteSubject} className="flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-semibold text-red-400 transition hover:scale-105 hover:bg-red-500/20">
                  <Trash2 size={16} sm:size={18} />
                  Delete Subject
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ADD TOPIC MODAL */}
      <AnimatePresence>
        {isAddTopicModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddTopicModalOpen(false)} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="relative w-full max-w-md rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0B0B0C] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
                <button onClick={() => setIsAddTopicModalOpen(false)} className="absolute right-3 sm:right-4 top-3 sm:top-4 rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white">
                  <X size={18} sm:size={20} />
                </button>
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Add New Topic</h2>
                  <p className="mt-1 text-xs sm:text-sm text-gray-400">Create a new topic for {subject.title}</p>
                </div>
                <form onSubmit={handleAddTopic} className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">Topic Title</label>
                    <input type="text" name="title" value={topicData.title} onChange={handleTopicInputChange} placeholder="e.g., Binary Search Trees" required className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#C8A96A]" />
                  </div>
                  <div>
                    <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">Description (Optional)</label>
                    <textarea name="description" value={topicData.description} onChange={handleTopicInputChange} placeholder="Brief description of the topic..." rows={3} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#C8A96A] resize-none" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                    <button type="button" onClick={() => setIsAddTopicModalOpen(false)} className="flex-1 rounded-xl border border-white/10 bg-transparent py-2.5 sm:py-3 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white">Cancel</button>
                    <button type="submit" className="flex-1 rounded-xl bg-[#C8A96A] py-2.5 sm:py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-[#d8ba81] flex items-center justify-center gap-2">
                      <Save size={16} sm:size={18} /> Add Topic
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* EDIT TOPIC MODAL */}
      <AnimatePresence>
        {isEditTopicModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditTopicModalOpen(false)} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="relative w-full max-w-md rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0B0B0C] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
                <button onClick={() => setIsEditTopicModalOpen(false)} className="absolute right-3 sm:right-4 top-3 sm:top-4 rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white">
                  <X size={18} sm:size={20} />
                </button>
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Edit Topic</h2>
                  <p className="mt-1 text-xs sm:text-sm text-gray-400">Update the topic details</p>
                </div>
                <form onSubmit={handleUpdateTopic} className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">Topic Title</label>
                    <input type="text" name="title" value={topicData.title} onChange={handleTopicInputChange} required className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white outline-none transition focus:border-[#C8A96A]" />
                  </div>
                  <div>
                    <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">Description (Optional)</label>
                    <textarea name="description" value={topicData.description} onChange={handleTopicInputChange} rows={3} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white outline-none transition focus:border-[#C8A96A] resize-none" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                    <button type="button" onClick={() => setIsEditTopicModalOpen(false)} className="flex-1 rounded-xl border border-white/10 bg-transparent py-2.5 sm:py-3 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white">Cancel</button>
                    <button type="submit" className="flex-1 rounded-xl bg-[#C8A96A] py-2.5 sm:py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-[#d8ba81] flex items-center justify-center gap-2">
                      <Save size={16} sm:size={18} /> Update Topic
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

export default SubjectDetails;