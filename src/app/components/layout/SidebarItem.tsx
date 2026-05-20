import { NavLink } from "react-router";
import { motion } from "motion/react";
import { clsx } from "clsx";
import type { LucideIcon } from "lucide-react";

export interface SidebarItemProps {
  to: string;
  label: string;
  icon: LucideIcon;
  accentColor?: string;
  collapsed?: boolean;
  onNavigate?: () => void;
  end?: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0 },
};

export function SidebarItem({
  to,
  label,
  icon: Icon,
  accentColor = "#6366f1",
  collapsed = false,
  onNavigate,
  end,
}: SidebarItemProps) {
  return (
    <motion.li variants={itemVariants} className="list-none">
      <NavLink
        to={to}
        end={end}
        onClick={onNavigate}
        title={collapsed ? label : undefined}
        className={() =>
          clsx(
            "group relative flex items-center rounded-2xl transition-all duration-300",
            collapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5",
          )
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={clsx(
                "absolute inset-0 rounded-2xl transition-all duration-300",
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
              )}
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${accentColor}18, rgba(255,255,255,0.95))`
                  : "rgba(255,255,255,0.65)",
                boxShadow: isActive
                  ? `0 4px 20px -4px ${accentColor}40, inset 0 1px 0 rgba(255,255,255,0.9)`
                  : "0 2px 8px rgba(15,23,42,0.04)",
                border: isActive
                  ? `1px solid ${accentColor}45`
                  : "1px solid rgba(148,163,184,0.2)",
              }}
            />

            {isActive && !collapsed && (
              <span
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[65%] rounded-full"
                style={{
                  background: accentColor,
                  boxShadow: `0 0 10px ${accentColor}80`,
                }}
              />
            )}

            <span
              className={clsx(
                "relative z-10 flex shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105",
                collapsed ? "h-10 w-10" : "h-9 w-9",
                isActive ? "border-white/90 bg-white shadow-sm" : "border-slate-200/80 bg-white/80",
              )}
              style={{
                color: isActive ? accentColor : "#64748b",
                boxShadow: isActive ? `0 0 14px ${accentColor}30` : undefined,
              }}
            >
              <Icon size={collapsed ? 20 : 18} strokeWidth={isActive ? 2.25 : 1.75} />
            </span>

            {!collapsed && (
              <span
                className={clsx(
                  "relative z-10 text-sm leading-snug tracking-tight pr-1 transition-colors",
                  isActive
                    ? "font-semibold"
                    : "font-medium text-slate-600 group-hover:text-slate-900",
                )}
                style={isActive ? { color: accentColor } : undefined}
              >
                {label}
              </span>
            )}

            {collapsed && (
              <span
                className="
                  pointer-events-none absolute left-full ml-3 z-[60]
                  whitespace-nowrap rounded-xl border border-slate-200
                  bg-white/95 px-3 py-1.5 text-xs font-medium text-slate-800
                  opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-200 shadow-lg backdrop-blur-xl
                "
              >
                {label}
              </span>
            )}
          </>
        )}
      </NavLink>
    </motion.li>
  );
}
