import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Home, PanelLeftClose, PanelLeft, X } from "lucide-react";
import { clsx } from "clsx";
import { schools } from "../../../lib/schools";
import { SidebarItem } from "./SidebarItem";
import { SidebarSection } from "./SidebarSection";

const LOGO_URL =
  "https://res.cloudinary.com/dk79pc0vp/image/upload/v1771619759/Recurso_1_vcntst.png";

export interface SpatialSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function SpatialSidebar({
  isOpen,
  onClose,
  onCollapsedChange,
}: SpatialSidebarProps) {
  const location = useLocation();
  const themeAccent = useMemo(() => {
    const match = schools.find((s) =>
      location.pathname.startsWith(`/school/${s.id}`),
    );
    return match?.accentColor ?? "#3b82f6";
  }, [location.pathname]);

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed((c) => {
      const next = !c;
      onCollapsedChange?.(next);
      return next;
    });
  };
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const visible = isDesktop || isOpen;
  const width = collapsed ? 80 : 280;

  const handleNavigate = () => {
    if (!isDesktop) onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[55] bg-slate-900/25 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          x: visible ? 0 : -width - 32,
          width,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        className={clsx(
          "fixed z-[60] flex flex-col overflow-hidden",
          "top-3 bottom-3 left-3 lg:top-4 lg:bottom-4 lg:left-4",
          "rounded-[1.75rem] border border-white/70",
          "bg-white/72 backdrop-blur-2xl backdrop-saturate-150",
          "shadow-[0_20px_60px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.95)]",
          "transition-[border-color,box-shadow] duration-500",
        )}
        style={{
          borderColor: `${themeAccent}40`,
          boxShadow: `0 20px 50px rgba(15,23,42,0.1), 0 0 32px -8px ${themeAccent}25, inset 0 1px 0 rgba(255,255,255,0.95)`,
        }}
      >
        {/* Brillo superior */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/90 to-transparent" />

        <motion.div
          key={themeAccent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute inset-x-0 top-0 h-32"
          style={{
            background: `linear-gradient(to bottom, ${themeAccent}14, transparent)`,
          }}
        />
        <motion.div
          key={`glow-${themeAccent}`}
          className="pointer-events-none absolute -top-12 -left-12 h-32 w-32 rounded-full blur-[45px] opacity-60"
          style={{ backgroundColor: `${themeAccent}25` }}
        />

        <header
          className={clsx(
            "relative z-10 flex shrink-0 items-center border-b border-slate-200/70",
            collapsed ? "flex-col gap-3 py-5 px-2" : "justify-between gap-2 px-4 py-5",
          )}
        >
          <div
            className={clsx(
              "flex items-center justify-center rounded-2xl border border-white/80 bg-white/90 p-2 shadow-sm transition-shadow duration-500",
              collapsed ? "w-12 h-12" : "h-11 w-11",
            )}
            style={{ boxShadow: `0 4px 20px ${themeAccent}25` }}
          >
            <img
              src={LOGO_URL}
              alt="Luminachat"
              className={clsx(
                "object-contain brightness-0 opacity-90",
                collapsed ? "h-6 w-6" : "h-7 w-auto",
              )}
            />
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-800 tracking-tight truncate">
                Luminachat
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                Campus Virtual
              </p>
            </div>
          )}

          <div className={clsx("flex gap-1", collapsed && "flex-col")}>
            {isDesktop && (
              <button
                type="button"
                onClick={toggleCollapsed}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-white/80 transition-colors"
                title={collapsed ? "Expandir menú" : "Colapsar menú"}
                aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
              >
                {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
              </button>
            )}
            {!isDesktop && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-white/80 transition-colors"
                aria-label="Cerrar menú"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </header>

        <nav className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar px-2 py-4">
          <SidebarSection title="Principal" collapsed={collapsed} className="mb-4">
            <SidebarItem
              to="/"
              end
              label="Inicio"
              icon={Home}
              accentColor="#3b82f6"
              collapsed={collapsed}
              onNavigate={handleNavigate}
            />
          </SidebarSection>

          <SidebarSection title="Escuelas" collapsed={collapsed}>
            {schools.map((school) => (
              <SidebarItem
                key={school.id}
                to={`/school/${school.id}`}
                label={school.name}
                icon={school.icon}
                accentColor={school.accentColor}
                collapsed={collapsed}
                onNavigate={handleNavigate}
              />
            ))}
          </SidebarSection>
        </nav>

        <footer
          className={clsx(
            "relative z-10 shrink-0 border-t border-slate-200/70 px-4 py-4",
            collapsed && "px-2 text-center",
          )}
        >
          {!collapsed ? (
            <p className="text-[10px] text-slate-400 text-center tracking-wide">
              © 2026 Campus Virtual CUN
            </p>
          ) : (
            <span className="text-[9px] text-slate-400 font-bold">©26</span>
          )}
        </footer>
      </motion.aside>
    </>
  );
}
