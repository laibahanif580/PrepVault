import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  ArrowRight,
  BookOpen,
  X,
  Save,
} from "lucide-react";

import bg from "../../assets/images/greeting.avif";

const subjects = [
  { id: 1, title: "Data Structures", notes: 18, level: "Intermediate" },
  { id: 2, title: "DBMS", notes: 12, level: "Easy" },
  { id: 3, title: "Operating System", notes: 16, level: "Intermediate" },
  { id: 4, title: "Computer Networks", notes: 14, level: "Medium" },
  { id: 5, title: "OOP", notes: 9, level: "Easy" },
  { id: 6, title: "HR Interview", notes: 30, level: "All" },
];

function Subjects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    notes: "",
    level: "Easy",
  });

  const levels = ["Easy", "Medium", "Intermediate", "Advanced", "All"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Subject:", formData);
    setIsModalOpen(false);
    setFormData({ title: "", notes: "", level: "Easy" });
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-[#090909]/85" />
      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-[#C8A96A]/10 blur-[150px]" />

      <div className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="uppercase tracking-[0.2rem] sm:tracking-[0.3rem] text-[#C8A96A] text-xs sm:text-sm">PrepVault</p>
            <h1 className="hero-font mt-2 sm:mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-white">Subjects</h1>
            <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-400">Organize every subject beautifully.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-[#C8A96A] px-4 sm:px-7 py-3 sm:py-4 text-sm sm:text-base font-semibold text-black shadow-lg shadow-[#C8A96A]/20 transition hover:scale-105"
          >
            <Plus size={18} sm:size={20} />
            Add Subject
          </button>
        </div>

        {/* Cards */}
        <div className="mt-6 sm:mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {subjects.map((subject, index) => (
            <Link to={`/subjects/${subject.id}`} key={subject.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 hover:border-[#C8A96A]/40 transition-all duration-300 h-40 sm:h-44 md:h-48 cursor-pointer bg-white/5"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500  from-[#C8A96A]/5 via-transparent to-transparent" />

                <div className="flex h-full flex-col justify-between p-4 sm:p-5 md:p-6 relative z-10">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white group-hover:text-[#C8A96A] transition-colors duration-300">
                      {subject.title}
                    </h2>
                    <motion.div
                      whileHover={{ scale: 1.3, x: 4 }}
                      className="flex-shrink-0 mt-1"
                    >
                      <ArrowRight
                        className="text-[#C8A96A] opacity-0 group-hover:opacity-100 transition-all duration-300"
                        size={20} sm:size={22} md:size={24}
                      />
                    </motion.div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <BookOpen size={14} sm:size={16} className="text-[#C8A96A]" />
                      <span className="text-xs sm:text-sm text-gray-300">{subject.notes} Notes</span>
                    </div>
                    <span className="rounded-full border border-[#C8A96A]/20 bg-[#C8A96A]/10 px-2 sm:px-3 py-0.5 text-[10px] sm:text-xs text-[#C8A96A] backdrop-blur-sm">
                      {subject.level}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* ADD SUBJECT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-md rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0B0B0C] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-3 sm:right-4 top-3 sm:top-4 rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                >
                  <X size={18} sm:size={20} />
                </button>

                <div className="mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Add New Subject</h2>
                  <p className="mt-1 text-xs sm:text-sm text-gray-400">Create a new subject to organize your notes</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">Subject Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Machine Learning"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#C8A96A]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">Difficulty Level</label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white outline-none transition focus:border-[#C8A96A]"
                    >
                      {levels.map((level) => (
                        <option key={level} value={level} className="bg-[#0B0B0C]">{level}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 rounded-xl border border-white/10 bg-transparent py-2.5 sm:py-3 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-xl bg-[#C8A96A] py-2.5 sm:py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-[#d8ba81] flex items-center justify-center gap-2"
                    >
                      <Save size={16} sm:size={18} />
                      Add Subject
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

export default Subjects;