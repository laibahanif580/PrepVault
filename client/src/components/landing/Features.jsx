import { motion } from "framer-motion";
import subjectsImg from "../../assets/images/subjects.jpg";
import notesImg from "../../assets/images/notes.jpg";
import flashcardsImg from "../../assets/images/flashcards.jpg";
import projectsImg from "../../assets/images/projects.jpg";
import resourcesImg from "../../assets/images/resources.jpg";
import plannerImg from "../../assets/images/planner.jpg";

const features = [
  {
    title: "Subjects",
    subtitle: "Built-in CS Subjects",
    badge: "20+",
    image: subjectsImg,
  },
  {
    title: "Notes",
    subtitle: "Distraction-free Editor",
    badge: "∞",
    image: notesImg,
  },
  {
    title: "Code",
    subtitle: "Important Snippets",
    badge: "Write & Save",
    image: flashcardsImg,
  },
  {
    title: "Projects",
    subtitle: "Document & Showcase",
    badge: "Easy",
    image: projectsImg,
  },
  {
    title: "Resources",
    subtitle: "Links & Articles",
    badge: "All",
    image: resourcesImg,
  },
  {
    title: "Mock Interview",
    subtitle: "Test yourself with mock interviews",
    badge: "Plan",
    image: plannerImg,
  },
];

function Features() {
  return (
    <section  id="features"  className="bg-[#0B0B0C] py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 sm:mb-16 md:mb-20 text-center">
          <p className="mb-2 sm:mb-3 uppercase tracking-[0.2rem] sm:tracking-[0.35rem] text-[#C8A96A] text-xs sm:text-sm">
            Everything you need
          </p>
          <h2 className="hero-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-white">
            One Workspace.
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {features.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="group relative h-[220px] sm:h-[250px] md:h-[280px] lg:h-[300px] overflow-hidden rounded-2xl sm:rounded-3xl"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

              {/* Gold Hover */}
              <div className="absolute inset-0 bg-[#C8A96A]/0 transition duration-500 group-hover:bg-[#C8A96A]/10"></div>

              {/* Badge */}
              <div className="absolute right-3 sm:right-4 md:right-5 top-3 sm:top-4 md:top-5 rounded-full border border-[#C8A96A]/40 bg-black/60 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-semibold text-[#C8A96A] backdrop-blur-xl">
                {item.badge}
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 left-4 sm:left-5 md:left-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-300">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#0B0B0C] py-16 sm:py-20 md:py-24">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6 lg:px-8">
          {/* Features */}
          <div className="text-center">
            <h2 className="hero-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic text-[#C8A96A]">
              Multiple
            </h2>
            <p className="mt-2 sm:mt-3 text-base sm:text-lg font-medium tracking-wide text-gray-300">
              Features
            </p>
          </div>

          <div className="hidden sm:block h-16 sm:h-20 md:h-24 w-px bg-white/10"></div>

          {/* Free */}
          <div className="text-center">
            <h2 className="hero-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic text-[#C8A96A]">
              100%
            </h2>
            <p className="mt-2 sm:mt-3 text-base sm:text-lg font-medium tracking-wide text-gray-300">
              Free
            </p>
          </div>

          <div className="hidden sm:block h-16 sm:h-20 md:h-24 w-px bg-white/10"></div>

          {/* Notes */}
          <div className="text-center">
            <h2 className="hero-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic text-[#C8A96A]">
              ∞
            </h2>
            <p className="mt-2 sm:mt-3 text-base sm:text-lg font-medium tracking-wide text-gray-300">
              Notes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;