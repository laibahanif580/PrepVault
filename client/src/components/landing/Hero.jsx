import { motion } from "framer-motion";
import heroImage from "../../assets/images/resources.jpg";
import { ArrowRight, CreditCard, Infinity, BookOpen } from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B0B0C] pt-24 sm:pt-28 md:pt-32">
      {/* Background Glows */}
      <div className="absolute left-0 top-20 h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px] rounded-full bg-[#C8A96A]/10 blur-[120px] md:blur-[180px]" />
      <div className="absolute right-0 bottom-0 h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px] rounded-full bg-white/5 blur-[120px] md:blur-[180px]" />

      <div className="mx-auto flex min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh] max-w-[1500px] flex-col items-center justify-center gap-12 sm:gap-16 md:gap-20 px-4 sm:px-6 lg:px-8 xl:flex-row">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-center xl:text-left"
        >
          <span className="inline-block rounded-full border border-[#C8A96A]/30 bg-[#C8A96A]/10 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm uppercase tracking-[0.25rem] sm:tracking-[0.35rem] text-[#C8A96A]">
            Built for students & engineers
          </span>

          <h1 className="hero-font mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6.5rem] italic leading-[1.05] sm:leading-[0.95] text-white">
            Master Your
            <br />
            Technical
            <br />
            Interviews
          </h1>

          <p className="mt-4 sm:mt-6 md:mt-8 max-w-xl mx-auto xl:mx-0 text-base sm:text-lg leading-7 sm:leading-8 text-gray-400">
            Organize every subject, build projects,
            revise smarter, prepare with AI,
            and ace your technical interviews—
            all from one premium workspace.
          </p>

          {/* Buttons */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap justify-center xl:justify-start gap-4 sm:gap-5">
            <button className="rounded-xl bg-[#C8A96A] px-6 sm:px-8 md:px-9 py-3 sm:py-4 font-semibold text-black shadow-[0_15px_40px_rgba(200,169,106,0.35)] transition-all duration-300 hover:scale-105 text-sm sm:text-base">
              Get Started
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 sm:px-8 md:px-9 py-3 sm:py-4 text-white backdrop-blur-xl transition-all duration-300 hover:border-[#C8A96A]/30 hover:bg-white/10 text-sm sm:text-base">
              Explore
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full max-w-[90%] sm:max-w-[80%] md:max-w-full"
        >
          {/* Glow */}
          <div className="absolute -inset-4 sm:-inset-6 md:-inset-8 rounded-[30px] sm:rounded-[40px] bg-[#C8A96A]/10 blur-2xl sm:blur-3xl"></div>

          {/* Browser */}
          <div className="relative overflow-hidden rounded-[24px] sm:rounded-[30px] md:rounded-[34px] border border-white/10 bg-[rgba(18,18,20,.8)] shadow-[0_20px_60px_rgba(0,0,0,.5)] md:shadow-[0_30px_80px_rgba(0,0,0,.5)] backdrop-blur-2xl">
            {/* Browser Header */}
            <div className="flex items-center gap-2 sm:gap-3 border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4">
              <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-red-500"></div>
              <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-yellow-500"></div>
              <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500"></div>
            </div>

            {/* Image */}
            <img
              src={heroImage}
              alt="Coding Workspace"
              className="w-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="mt-12 sm:mt-14 md:mt-16 flex justify-center px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 rounded-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <CreditCard size={16} sm:size={18} className="text-[#C8A96A]" />
            <span>No credit card</span>
          </div>
          <div className="hidden sm:block h-5 w-px bg-white/10"></div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <Infinity size={16} sm:size={18} className="text-[#C8A96A]" />
            <span>Free forever</span>
          </div>
          <div className="hidden sm:block h-5 w-px bg-white/10"></div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <BookOpen size={16} sm:size={18} className="text-[#C8A96A]" />
            <span>All subjects included</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;