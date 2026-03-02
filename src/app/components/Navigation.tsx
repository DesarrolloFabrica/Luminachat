import { NavLink } from "react-router";
import { schools } from "../../lib/schools";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "motion/react";
import { Home, X } from "lucide-react";

// ==============================================================================
// CONFIGURACIÓN DE LOGO
// ==============================================================================
const LOGO_URL = "https://res.cloudinary.com/dk79pc0vp/image/upload/v1771619759/Recurso_1_vcntst.png"; // Reemplazar con la URL de tu logo
const LOGO_ALT = "Lumina Logo";

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Navigation({ isOpen, onClose }: NavigationProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
      
      <motion.nav 
        initial={false}
        animate={{ x: isOpen ? 0 : -320, opacity: isOpen ? 1 : 0 }}
        transition={{ type: "spring", stiffness:300, damping: 30 }}
        className="fixed left-0 top-0 bottom-0 z-50 flex flex-col py-8 w-72 bg-white/95 backdrop-blur-xl border-r border-gray-100 shadow-2xl h-screen"
      >
        <div className="flex items-center justify-between px-6 mb-8">
           {/* Logo Editable */}
           <div className="w-20 mx-10">
             <img 
               src={LOGO_URL} 
               alt={LOGO_ALT} 
               className="w-full h-auto object-contain brightness-0" // Logo negro
             />
           </div>
           
           {/* Close Button (Visible on Mobile) */}
           <button 
             onClick={onClose}
             className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-all lg:visibility"
           >
             <X size={25} />
           </button>
        </div>

        <div className="px-4 mb-2">
          <NavLink 
            to="/" 
            onClick={() => { if(window.innerWidth < 1024) onClose(); }}
            className={({ isActive }) => clsx(
              "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
              isActive ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {({ isActive }) => (
              <>
                <Home size={24} />
                <span className="font-medium text-sm uppercase tracking-wide">Inicio</span>
                
                {/* Active Indicator Background */}
                {isActive && (
                   <div className="absolute inset-0 bg-blue-100/30 opacity-50 pointer-events-none" />
                )}
              </>
            )}
          </NavLink>
        </div>

        <div className="flex flex-col gap-2 w-full px-4 overflow-y-auto custom-scrollbar flex-1">
          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4 mb-2">
            Escuelas
          </div>
          
          {schools.map((school) => (
            <NavLink
              key={school.id}
              to={`/school/${school.id}`}
              onClick={() => { if(window.innerWidth < 1024) onClose(); }}
              className={({ isActive }) => clsx(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                isActive 
                  ? "bg-white text-gray-900 font-semibold" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              )}
              style={({ isActive }) => isActive ? { 
                boxShadow: `inset 4px 0 0 ${school.accentColor}, 0 4px 15px -5px ${school.accentColor}40`,
                backgroundColor: `${school.accentColor}10`
              } : {}}
            >
              {({ isActive }) => {
                const Icon = school.icon;
                return (
                  <>
                    <Icon 
                      size={20} 
                      className="shrink-0 transition-colors duration-300"
                      style={{ color: isActive ? school.accentColor : 'currentColor' }}
                    />
                    
                    <span className={clsx("text-sm leading-tight", isActive ? "text-gray-900" : "group-hover:text-gray-900")}>
                      {school.name}
                    </span>

                    {/* Hover Glow Effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                      style={{ backgroundColor: school.accentColor }}
                    />
                  </>
                );
              }}
            </NavLink>
          ))}
        </div>
        
        {/* Footer info */}
        <div className="px-6 pt-4 border-t border-gray-100 text-[10px] text-gray-400 text-center">
          © 2026 Campus Virtual
        </div>
      </motion.nav>
    </>
  );
}
