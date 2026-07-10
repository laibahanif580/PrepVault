import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Search,
  FileText,
  Clock,
  Edit,
  Trash2,
  X,
  Save,
  Code,
  StickyNote,
  Copy,
  Check,
  SquarePen,
} from "lucide-react";

import bg from "../../assets/images/greeting.avif";

// Mock data for topics
const topicData = {
  1: {
    id: 1,
    title: "Arrays and Strings",
    description: "Arrays are collections of elements stored at contiguous memory locations. Strings are sequences of characters. Both are fundamental data structures used in almost every programming problem.",
    subject: "Data Structures",
    subjectId: 1,
    createdAt: "Jan 15, 2025",
    lastUpdated: "2 hours ago",
    code: `// Two Sum Problem - LeetCode #1
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

// Example usage
const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target)); // Output: [0, 1]`,
    notes: [
      {
        id: 1,
        title: "Key Concepts",
        content: "• Arrays are zero-indexed\n• Time complexity for access is O(1)\n• String immutability in JavaScript\n• Common string methods: split(), join(), slice()",
        date: "Today",
      },
      {
        id: 2,
        title: "Common Patterns",
        content: "• Two-pointer technique for sorted arrays\n• Sliding window for subarray problems\n• Hash map for complement finding",
        date: "Yesterday",
      },
      {
        id: 3,
        title: "Important Tips",
        content: "• Always check for edge cases (empty array, single element)\n• Consider space-time tradeoffs\n• Practice with different approaches",
        date: "2 days ago",
      },
    ],
    resources: [
      { id: 1, title: "LeetCode Arrays", type: "Link" },
      { id: 2, title: "String Methods", type: "PDF" },
    ],
  },
};

function TopicDetails() {
  const { topicId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  // Get topic data based on id
  const [topic, setTopic] = useState(topicData[topicId] || topicData[1]);

  // State for inline editing
  const [editingCode, setEditingCode] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [codeValue, setCodeValue] = useState(topic.code);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [editingNoteTitle, setEditingNoteTitle] = useState("");
  const [editingNoteContent, setEditingNoteContent] = useState("");
  const [showAddNote, setShowAddNote] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(topic.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Save code inline
  const handleSaveCode = () => {
    setTopic((prev) => ({
      ...prev,
      code: codeValue,
      lastUpdated: "Just now",
    }));
    setEditingCode(false);
  };

  // Cancel code edit
  const handleCancelCode = () => {
    setCodeValue(topic.code);
    setEditingCode(false);
  };

  // Add note inline
  const handleAddNote = () => {
    if (newNoteTitle.trim()) {
      const newNote = {
        id: topic.notes.length + 1,
        title: newNoteTitle,
        content: newNoteContent || "No content",
        date: "Just now",
      };
      setTopic((prev) => ({
        ...prev,
        notes: [...prev.notes, newNote],
        lastUpdated: "Just now",
      }));
      setNewNoteTitle("");
      setNewNoteContent("");
      setShowAddNote(false);
    }
  };

  // Start editing a note
  const handleStartEditNote = (note) => {
    setEditingNoteId(note.id);
    setEditingNoteTitle(note.title);
    setEditingNoteContent(note.content);
  };

  // Save edited note
  const handleSaveEditNote = (noteId) => {
    setTopic((prev) => ({
      ...prev,
      notes: prev.notes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              title: editingNoteTitle,
              content: editingNoteContent,
              date: "Updated just now",
            }
          : note
      ),
      lastUpdated: "Just now",
    }));
    setEditingNoteId(null);
    setEditingNoteTitle("");
    setEditingNoteContent("");
  };

  // Cancel note edit
  const handleCancelEditNote = () => {
    setEditingNoteId(null);
    setEditingNoteTitle("");
    setEditingNoteContent("");
  };

  const handleDeleteNote = (noteId, noteTitle) => {
    if (window.confirm(`Are you sure you want to delete "${noteTitle}"?`)) {
      setTopic((prev) => ({
        ...prev,
        notes: prev.notes.filter((note) => note.id !== noteId),
        lastUpdated: "Just now",
      }));
    }
  };

  const filteredNotes = topic.notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-[#090909]/85" />
      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-[#C8A96A]/10 blur-[150px]" />

      <div className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8">
        {/* Back Button */}
        <Link
          to={`/subjects/${topic.subjectId || 1}`}
          className="inline-flex items-center gap-2 text-gray-400 transition hover:text-[#C8A96A] mb-4 sm:mb-6"
        >
          <ArrowLeft size={18} sm:size={20} />
          <span className="text-sm sm:text-base">Back to Subject Details</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="uppercase tracking-[0.2rem] sm:tracking-[0.3rem] text-[#C8A96A] text-xs sm:text-sm">
              {topic.subject}
            </p>
            <h1 className="hero-font mt-2 text-3xl sm:text-4xl md:text-5xl italic text-white">
              {topic.title}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-400 max-w-2xl">
              {topic.description}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-6 py-2 sm:py-3 backdrop-blur-xl">
            <StickyNote size={16} sm:size={20} className="text-[#C8A96A]" />
            <div>
              <p className="text-sm sm:text-base font-semibold text-white">{topic.notes.length}</p>
              <p className="text-[10px] sm:text-xs text-gray-400">Total Notes</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-6 py-2 sm:py-3 backdrop-blur-xl">
            <Clock size={16} sm:size={20} className="text-[#C8A96A]" />
            <div>
              <p className="text-sm sm:text-base font-semibold text-white">{topic.lastUpdated}</p>
              <p className="text-[10px] sm:text-xs text-gray-400">Last Updated</p>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CODE SECTION - INLINE EDITING */}
        {/* ============================================================ */}
        <div className="mt-6 sm:mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
              <Code size={18} sm:size={20} className="text-[#C8A96A]" />
              Code
            </h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {!editingCode ? (
                <>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 sm:gap-2 rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-300 transition hover:border-[#C8A96A]/30 hover:bg-white/10"
                  >
                    {copied ? <Check size={14} sm:size={16} className="text-green-400" /> : <Copy size={14} sm:size={16} />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={() => setEditingCode(true)}
                    className="flex items-center gap-1.5 sm:gap-2 rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-300 transition hover:border-[#C8A96A]/30 hover:bg-white/10"
                  >
                    <Edit size={14} sm:size={16} />
                    Edit
                  </button>
                </>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleSaveCode}
                    className="flex items-center gap-1.5 sm:gap-2 rounded-xl bg-[#C8A96A] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-black transition hover:scale-105"
                  >
                    <Save size={14} sm:size={16} />
                    Save
                  </button>
                  <button
                    onClick={handleCancelCode}
                    className="flex items-center gap-1.5 sm:gap-2 rounded-xl border border-white/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
                  >
                    <X size={14} sm:size={16} />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {!editingCode ? (
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-black/90 p-4 sm:p-5 md:p-6 overflow-x-auto">
              <pre className="text-xs sm:text-sm text-white font-mono whitespace-pre-wrap">
                <code>{topic.code}</code>
              </pre>
            </div>
          ) : (
            <div className="rounded-xl sm:rounded-2xl border border-[#C8A96A]/30 bg-black/90 p-3 sm:p-4 overflow-x-auto">
              <textarea
                value={codeValue}
                onChange={(e) => setCodeValue(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-white font-mono outline-none resize-none min-h-[150px] sm:min-h-[200px]"
                spellCheck="false"
              />
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* NOTES SECTION - WITH ADD NOTE BUTTON */}
        {/* ============================================================ */}
        <div className="mt-6 sm:mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
              <StickyNote size={18} sm:size={20} className="text-[#C8A96A]" />
              Notes
            </h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                onClick={() => setShowAddNote(!showAddNote)}
                className="flex items-center gap-1.5 sm:gap-2 rounded-xl bg-[#C8A96A] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-black transition hover:scale-105"
              >
                {showAddNote ? <X size={14} sm:size={16} /> : <Plus size={14} sm:size={16} />}
                {showAddNote ? "Cancel" : "Add Note"}
              </button>
              <div className="relative">
                <Search size={14} sm:size={16} className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notes..."
                  className="w-32 sm:w-40 md:w-48 rounded-xl border border-white/10 bg-white/5 px-7 sm:px-9 py-1.5 sm:py-2 text-xs sm:text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#C8A96A]"
                />
              </div>
            </div>
          </div>

          {/* Add Note Inline */}
          {showAddNote && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-3 sm:mb-4 rounded-xl border border-[#C8A96A]/30 bg-white/5 p-3 sm:p-4"
            >
              <input
                type="text"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                placeholder="Note title..."
                className="w-full bg-transparent text-white outline-none text-base sm:text-lg font-semibold mb-1.5 sm:mb-2 placeholder:text-gray-500"
              />
              <textarea
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                placeholder="Write your note content here..."
                rows={3}
                className="w-full bg-transparent text-gray-300 outline-none resize-none text-sm sm:text-base placeholder:text-gray-500"
              />
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <button
                  onClick={handleAddNote}
                  className="rounded-xl bg-[#C8A96A] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-black transition hover:scale-105"
                >
                  Save Note
                </button>
                <button
                  onClick={() => {
                    setShowAddNote(false);
                    setNewNoteTitle("");
                    setNewNoteContent("");
                  }}
                  className="rounded-xl border border-white/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {/* Notes List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  whileHover={{ y: -4 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5 transition hover:border-[#C8A96A]/30 hover:bg-white/10"
                >
                  {editingNoteId === note.id ? (
                    // Edit Note Inline
                    <div>
                      <input
                        type="text"
                        value={editingNoteTitle}
                        onChange={(e) => setEditingNoteTitle(e.target.value)}
                        className="w-full bg-transparent text-white outline-none text-base sm:text-lg font-semibold mb-1.5 sm:mb-2"
                      />
                      <textarea
                        value={editingNoteContent}
                        onChange={(e) => setEditingNoteContent(e.target.value)}
                        rows={4}
                        className="w-full bg-transparent text-gray-300 outline-none resize-none text-sm sm:text-base"
                      />
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <button
                          onClick={() => handleSaveEditNote(note.id)}
                          className="rounded-xl bg-[#C8A96A] px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold text-black transition hover:scale-105"
                        >
                          <Save size={12} sm:size={14} className="inline mr-1" />
                          Save
                        </button>
                        <button
                          onClick={handleCancelEditNote}
                          className="rounded-xl border border-white/10 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs text-gray-400 transition hover:bg-white/5 hover:text-white"
                        >
                          <X size={12} sm:size={14} className="inline mr-1" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Note
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base font-semibold text-white truncate">{note.title}</h3>
                          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-300 whitespace-pre-wrap break-words">
                            {note.content}
                          </p>
                          <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-gray-500">Added {note.date}</p>
                        </div>
                        <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0 ml-2">
                          <button
                            onClick={() => handleStartEditNote(note)}
                            className="rounded-lg p-1 sm:p-1.5 text-gray-400 transition hover:bg-[#C8A96A]/20 hover:text-[#C8A96A]"
                          >
                            <SquarePen size={12} sm:size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteNote(note.id, note.title)}
                            className="rounded-lg p-1 sm:p-1.5 text-gray-400 transition hover:bg-red-500/20 hover:text-red-400"
                          >
                            <Trash2 size={12} sm:size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-400 col-span-2 py-6 sm:py-8 text-sm sm:text-base">
                No notes found. Add your first note!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopicDetails;