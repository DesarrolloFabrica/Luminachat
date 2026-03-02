import { Outlet, useLocation } from "react-router";
import { Navigation } from "./Navigation";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "motion/react";
import { schools } from "../../lib/schools";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Layout() {
  const location = useLocation();
  const currentSchoolId = location.pathname.split("/")[2];
  const currentSchool = schools.find((s) => s.id === currentSchoolId);

  // Responsive Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Auto-close on mobile, open on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans selection:bg-blue-500/20 selection:text-blue-900 overflow-x-hidden relative">
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-100/50 rounded-full blur-[120px]" />
        
        {/* Dynamic School Gradient Overlay */}
        <AnimatePresence mode="wait">
          {currentSchool && (
            <motion.div
              key={currentSchool.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-0 bg-gradient-radial opacity-20 mix-blend-multiply"
              style={{
                background: `radial-gradient(circle at 70% 50%, ${currentSchool.accentColor}44 0%, transparent 60%)`
              }}
            />
          )}
        </AnimatePresence>
      </div>

      <Navigation 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <motion.main 
        initial={false}
        animate={{ marginLeft: isSidebarOpen && window.innerWidth >= 1024 ? 288 : 0 }} // 288px = 72 (w-72)
        className="min-h-screen relative z-10 flex flex-col transition-all duration-300"
      >
        {/* Mobile / Toggle Header */}
        <header className="sticky top-0 z-40 p-4 flex items-center gap-4 lg:hidden bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
           <button 
             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             className="p-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
           >
             {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
           <span className="font-bold text-gray-800 tracking-wider">CAMPUS VIRTUAL</span>
        </header>

          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="
              fixed top-6 left-10 z-50
              p-3
              bg-white border border-gray-200
              rounded-full
              text-gray-600
              hover:text-blue-600 hover:bg-blue-50
              transition-all
              hidden lg:flex
              items-center justify-center
              shadow-lg
            "
            title="Abrir Menú"
          >
            <Menu size={20} />
          </button>
        <div className="flex-1 p-4 md:p-8 lg:p-10 max-w-[1920px] mx-auto w-full">
           <Outlet />
        </div>
      </motion.main>
    </div>
  );
}
