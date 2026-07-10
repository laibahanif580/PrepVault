import { motion } from "framer-motion";
import {
  FileText,
  FolderKanban,
  Bot,
  CalendarDays,
  Clock3,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Users,
  Award,
  Flame,
  Quote,
} from "lucide-react";

// Import images
import bannerImage from "../../assets/images/greetings.avif";
import noteImage from "../../assets/images/flashcards.jpg";
import projectImage from "../../assets/images/code.jpg";
import aiImage from "../../assets/images/coding.jpg";
import quoteImage from "../../assets/images/motivation.jpg";

function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const activityAccents = {
    gold: { bg: "bg-[#C8A96A]", glow: "shadow-[0_0_30px_rgba(200,169,106,.3)]", border: "hover:border-[#C8A96A]/30" },
    blue: { bg: "bg-[#4FC3F7]", glow: "shadow-[0_0_30px_rgba(79,195,247,.3)]", border: "hover:border-[#4FC3F7]/30" },
    green: { bg: "bg-[#81C784]", glow: "shadow-[0_0_30px_rgba(129,199,132,.3)]", border: "hover:border-[#81C784]/30" },
    orange: { bg: "bg-[#FFB74D]", glow: "shadow-[0_0_30px_rgba(255,183,77,.3)]", border: "hover:border-[#FFB74D]/30" },
  };

  const activityItems = [
    { title: "Added Notes", subtitle: "Operating System Deadlocks", time: "15 mins ago", icon: FileText, accent: "gold" },
    { title: "Created Project", subtitle: "Portfolio Website", time: "Yesterday", icon: FolderKanban, accent: "blue" },
    { title: "Completed Revision", subtitle: "Binary Search Trees", time: "2 days ago", icon: CheckCircle2, accent: "green" },
    { title: "AI Generated Summary", subtitle: "Computer Networks", time: "3 days ago", icon: Sparkles, accent: "orange" },
  ];

  const upcomingSessions = [
    { title: "Mock Interview", detail: "System Design Round", time: "Tomorrow, 4:00 PM", icon: Users },
    { title: "Study Group", detail: "Dynamic Programming Sprint", time: "Wed, 7:00 PM", icon: BookOpen },
    { title: "1:1 Review", detail: "Resume + Behavioral Prep", time: "Fri, 11:00 AM", icon: Clock3 },
  ];

  const quickActions = [
    {
      title: "New Subject",
      desc: "Organize Subjects well.",
      icon: FileText,
      image: noteImage,
    },
    {
      title: "New Project",
      desc: "Track projects and showcase them.",
      icon: FolderKanban,
      image: projectImage,
    },
    {
      title: "Mock Interview",
      desc: "Practice with interview questions.",
      icon: Bot,
      image: aiImage,
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8 lg:space-y-10"
    >
      {/* ============================================================ */}
      {/* GREETING — SPLIT LAYOUT WITH VISIBLE IMAGE PANEL */}
      {/* ============================================================ */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-[24px] sm:rounded-[30px] lg:rounded-[34px] bg-black/80"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]">
          {/* Text side */}
          <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 lg:p-12">
            <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full blur-[120px]" />

            <div className="relative flex flex-wrap items-center gap-3">
              <p className="uppercase tracking-[0.2rem] sm:tracking-[0.3rem] text-[#C8A96A] text-xs sm:text-sm">
                Dashboard
              </p>
              <div className="flex items-center gap-1.5 rounded-full border border-[#FFB74D]/30 bg-[#FFB74D]/10 px-3 py-1">
                <Flame size={13} className="text-[#FFB74D]" />
                <span className="text-xs font-semibold text-[#FFB74D]">7 day streak</span>
              </div>
            </div>

            <h1 className="hero-font relative mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-white leading-[1.1]">
              Good Evening, <br /> Laiba
            </h1>

            <p className="relative mt-3 sm:mt-4 max-w-md text-base sm:text-lg font-bold italic text-[#C8A96A] hero-font">
              Stay organized, revise smarter, and prepare confidently for your
              technical interviews.
            </p>
          </div>

          {/* Image side — clearly visible, masked edge only */}
          <div className="relative min-h-[180px] sm:min-h-[220px] lg:min-h-[280px]">
            <img
              src={bannerImage}
              alt="PrepVault"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent lg:bg-gradient-to-r lg:from-black lg:via-transparent lg:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
          </div>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* QUICK ACTIONS — EQUAL-SIZED CARDS, IMAGES VISIBLE */}
      {/* ============================================================ */}
      <motion.div variants={itemVariants}>
        <h2 className="mb-4 sm:mb-6 text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-400">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {quickActions.map((action) => (
            <motion.button
              key={action.title}
              whileHover={{ y: -6 }}
              className="group relative aspect-[5/4] sm:aspect-[5/4.5] lg:aspect-[5/5] overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 text-left transition duration-300 hover:border-[#C8A96A]/50 hover:shadow-[0_20px_50px_rgba(200,169,106,.2)]"
            >
              <img
                src={action.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

              <div className="relative z-10 flex h-full flex-col justify-end p-4 sm:p-5 lg:p-7">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-[#C8A96A] shadow-[0_0_20px_rgba(200,169,106,.4)] transition group-hover:scale-110">
                    <action.icon className="text-black" size={18} sm:size={20} lg:size={22} />
                  </div>
                  <ArrowUpRight
                    size={16} sm:size={18} lg:size={20}
                    className="text-[#C8A96A] opacity-0 transition-all duration-300 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                  />
                </div>
                <h3 className="mt-2 sm:mt-3 text-base sm:text-lg lg:text-xl font-semibold text-white">{action.title}</h3>
                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-300">{action.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* RECENT ACTIVITY + UPCOMING SESSIONS */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 items-start">
        {/* RECENT ACTIVITY - Takes 2/3 of the grid */}
        <motion.div
          variants={itemVariants}
          className="rounded-[24px] sm:rounded-[30px] lg:rounded-[34px] backdrop-blur-xl lg:col-span-2"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="hero-font text-2xl sm:text-3xl lg:text-4xl italic text-white">Recent Activity</h2>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-500">Everything you've worked on recently.</p>
            </div>
            <TrendingUp className="text-[#C8A96A]" size={20} sm:size={22} lg:size={24} />
          </div>

          <div className="relative mt-6 sm:mt-8">
            <div className="absolute left-[18px] top-0 h-full w-px bg-gradient-to-b from-[#C8A96A]/50 via-white/10 to-transparent" />

            {activityItems.map((item, index) => {
              const accent = activityAccents[item.accent];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ x: 8 }}
                  className="relative mb-4 flex gap-4 sm:gap-5 lg:gap-6 last:mb-0"
                >
                  <div className={`relative z-10 flex h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full ${accent.bg} ${accent.glow}`}>
                    <item.icon size={14} sm:size={16} lg:size={18} className="text-black" />
                  </div>

                  <div className={`flex-1 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 transition ${accent.border}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="font-semibold text-white text-sm sm:text-base">{item.title}</h3>
                      <span className="text-xs sm:text-sm text-gray-500">{item.time}</span>
                    </div>
                    <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-400">{item.subtitle}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* UPCOMING - Auto height (self-start) */}
        <motion.div
          variants={itemVariants}
          className="rounded-[24px] sm:rounded-[30px] lg:rounded-[34px] backdrop-blur-xl self-start"
        >
          <div className="flex items-center justify-between">
            <h2 className="hero-font text-xl sm:text-2xl italic text-white">Upcoming</h2>
            <CalendarDays className="text-[#C8A96A]" size={18} sm:size={20} />
          </div>

          <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3">
            {upcomingSessions.map((session, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start gap-3 sm:gap-4 rounded-xl sm:rounded-2xl p-3 sm:p-4 transition hover:border-[#C8A96A]/30"
              >
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 flex-shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[#C8A96A]/15">
                  <session.icon size={15} sm:size={17} className="text-[#C8A96A]" />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-xs sm:text-sm font-semibold text-white">{session.title}</h3>
                  <p className="mt-0.5 truncate text-[10px] sm:text-xs text-gray-400">{session.detail}</p>
                  <p className="mt-1 text-[10px] sm:text-xs text-[#C8A96A]">{session.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* DAILY MOTIVATION — IMAGE VISIBLE BEHIND, QUOTE MARK SIGNATURE */}
      {/* ============================================================ */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-[24px] sm:rounded-[30px] lg:rounded-[34px] border border-[#C8A96A]/20"
      >
        <img
          src={quoteImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#C8A96A]/10 blur-[120px]" />

        <div className="relative z-10 p-6 sm:p-8 lg:p-12">
          <div className="flex items-center gap-3">
            <Award size={20} sm:size={24} className="text-[#C8A96A]" />
            <p className="uppercase tracking-[0.2rem] sm:tracking-[0.35rem] text-[#C8A96A] text-xs sm:text-sm">
              Daily Motivation
            </p>
          </div>

          <div className="relative mt-4 sm:mt-6 max-w-3xl">
            <Quote size={32} sm:size={48} className="absolute -left-2 -top-4 sm:-top-6 text-[#C8A96A]/20" />
            <h2 className="hero-font relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic leading-tight text-white">
              Small improvements every day eventually lead to remarkable
              results.
            </h2>
          </div>

          <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg text-gray-300">
            Consistency beats intensity. Keep building, keep revising, and
            every interview becomes easier.
          </p>

          <div className="mt-6 sm:mt-8 flex items-center gap-4">
            <div className="h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 rounded-full bg-[#C8A96A]/20 flex items-center justify-center">
              <Flame size={20} sm:size={24} className="text-[#C8A96A]" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Stay Consistent</p>
              <p className="text-xs text-gray-400">You're doing great!</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;