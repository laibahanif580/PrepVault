import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function SidebarItem({ icon: Icon, text, to, isActive, compact }) {
  return (
    <NavLink to={to}>
      {({ isActive: navActive }) => {
        const active = isActive !== undefined ? isActive : navActive;
        return (
          <motion.div
            whileHover={{
              x: compact ? 4 : 6,
              scale: compact ? 1.01 : 1.02,
            }}
            transition={{ duration: 0.2 }}
            className={`
              group flex items-center gap-3 lg:gap-4 
              rounded-xl px-3 lg:px-4 
              ${compact ? 'py-2' : 'py-2.5 lg:py-3'} 
              transition-all duration-300
              ${active
                ? "bg-[#C8A96A]/15 border border-[#C8A96A]/40 shadow-[0_0_20px_rgba(200,169,106,.15)]"
                : "hover:bg-white/5 border border-transparent"
              }
            `}
          >
            <Icon
              size={compact ? 17 : 19}
              className={`
                transition flex-shrink-0
                ${active
                  ? "text-[#C8A96A]"
                  : "text-gray-400 group-hover:text-white"
                }
              `}
            />

            <span
              className={`
                font-medium text-sm transition truncate
                ${active
                  ? "text-white"
                  : "text-gray-400 group-hover:text-white"
                }
              `}
            >
              {text}
            </span>
          </motion.div>
        );
      }}
    </NavLink>
  );
}

export default SidebarItem;