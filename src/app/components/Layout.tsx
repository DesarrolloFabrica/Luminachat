import { Outlet, useLocation, useNavigate } from "react-router";
import { SpatialSidebar } from "./layout/SpatialSidebar";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "motion/react";
import { schools } from "../../lib/schools";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const SIDEBAR_WIDTH_EXPANDED = 304;
const SIDEBAR_WIDTH_COLLAPSED = 96;

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const currentSchoolId = location.pathname.split("/")[2];
  const currentSchool = schools.find((s) => s.id === currentSchoolId);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const pending = sessionStorage.getItem("lumina_pending_school");
    if (pending) {
      sessionStorage.removeItem("lumina_pending_school");
      navigate(`/school/${pending}`, { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      const desktop = mq.matches;
      setIsDesktop(desktop);
      if (location.pathname === "/") {
        setIsSidebarOpen(false);
      } else if (desktop) {
        setIsSidebarOpen(true);
      }
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [location.pathname]);

  const mainMargin =
    !isHome && isDesktop && isSidebarOpen
      ? sidebarCollapsed
        ? SIDEBAR_WIDTH_COLLAPSED
        : SIDEBAR_WIDTH_EXPANDED
      : 0;

  return (
    <div
      className={clsx(
        "min-h-screen font-sans overflow-x-hidden relative",
        isHome
          ? "bg-slate-950 text-white selection:bg-blue-500/30"
          : "bg-[#F8FAFC] text-[#1E293B] selection:bg-blue-500/20 selection:text-blue-900",
      )}
    >
      {!isHome && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-100/50 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-100/50 rounded-full blur-[120px]" />
          <AnimatePresence mode="wait">
            {currentSchool && (
              <motion.div
                key={currentSchool.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 z-0 opacity-20 mix-blend-multiply"
                style={{
                  background: `radial-gradient(circle at 70% 50%, ${currentSchool.accentColor}44 0%, transparent 60%)`,
                }}
              />
            )}
          </AnimatePresence>
        </div>
      )}

      {!isHome && (
        <SpatialSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onCollapsedChange={setSidebarCollapsed}
        />
      )}

      <motion.main
        initial={false}
        animate={{ marginLeft: mainMargin }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="min-h-screen relative z-10 flex flex-col"
      >
        {!isHome && (
          <header className="sticky top-0 z-40 p-4 flex items-center gap-4 lg:hidden border-b border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-sm">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 rounded-xl border border-white/15 bg-white/10 text-white hover:bg-white/15 transition-all"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <span className="font-bold text-white/90 tracking-wider text-sm">
              CAMPUS VIRTUAL
            </span>
          </header>
        )}

        {!isHome && !isDesktop && !isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-6 left-6 z-[45] p-3 rounded-full transition-all flex items-center justify-center shadow-lg border border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-xl"
            title="Abrir menú"
            aria-label="Abrir menú"
          >
            <Menu size={20} />
          </button>
        )}

        <div
          className={clsx(
            "flex-1 w-full",
            isHome ? "p-0 max-w-none" : "p-4 md:p-8 lg:p-10 max-w-[1920px] mx-auto",
          )}
        >
          <Outlet context={{ openSidebar: () => setIsSidebarOpen(true) }} />
        </div>
      </motion.main>
    </div>
  );
}
