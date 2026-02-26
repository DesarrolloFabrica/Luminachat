import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Play, Maximize2 } from "lucide-react";
import { clsx } from "clsx";
import { School } from "../../lib/schools";
import { useState, useRef, useEffect } from "react";

interface SchoolCardProps {
  school: School;
  index: number;
}

export function SchoolCard({ school, index }: SchoolCardProps) {
  const Icon = school.icon;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Mobile/Tablet Autoplay Logic
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only activate on touch devices or smaller screens where hover isn't primary
        if (window.matchMedia("(hover: none)").matches || window.innerWidth < 1024) {
          if (entry.isIntersecting) {
            setShowVideo(true);
            videoRef.current?.play().catch(() => {});
          } else {
            setShowVideo(false);
            videoRef.current?.pause();
          }
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowVideo(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowVideo(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg h-[320px] flex flex-col justify-between transition-all duration-300 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow: isHovered 
          ? `0 20px 40px -10px ${school.accentColor}50, 0 0 0 1px ${school.accentColor}20`
          : `0 10px 30px -10px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)`,
      } as React.CSSProperties}
    >
      {/* Background Video (GIF Effect) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={clsx(
          "absolute inset-0 bg-black/60 z-10 transition-colors duration-500",
          (isHovered || showVideo) ? "bg-black/40" : "bg-black/60"
        )} />
        
        {/* Placeholder Image (Always visible initially) */}
        <img 
          src={school.videoPlaceholder} 
          alt={school.name}
          className={clsx(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
            showVideo ? "opacity-0" : "opacity-100"
          )}
        />
        
        {/* Video Loop on Hover */}
        <video
          ref={videoRef}
          src={school.introVideoUrl}
          muted
          loop
          playsInline
          className={clsx(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
            showVideo ? "opacity-100" : "opacity-0"
          )}
        />
        
        {/* Gradient Overlay */}
        <div 
          className={clsx(
            "absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-black via-transparent to-transparent z-10",
            (isHovered || showVideo) ? "opacity-40" : "opacity-0",
            school.gradient
          )} 
        />
      </div>

      <div className="relative z-20 p-6 flex flex-col h-full pointer-events-none"> {/* Content pointer-events-none so hover stays on card */}
        <div className="flex items-start justify-between mb-4 pointer-events-auto">
          <div 
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-white group-hover:scale-110 transition-transform duration-300 backdrop-blur-md shadow-lg"
            style={{ color: school.accentColor, borderColor: isHovered ? school.accentColor : 'rgba(255,255,255,0.1)' }}
          >
            <Icon size={24} />
          </div>
          
          <div className={clsx(
            "transition-all duration-300 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
            "w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md text-white"
          )}>
             <Play size={12} fill="currentColor" className="ml-0.5" />
          </div>
        </div>

        <div className="mt-auto pointer-events-auto">
          <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-white transition-colors drop-shadow-md tracking-tight">
            {school.name}
          </h3>
          
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
            className="overflow-hidden"
          >
            <p className="text-white/80 text-sm leading-relaxed mb-4 drop-shadow-sm font-medium">
              {school.description}
            </p>
          </motion.div>

          <div className="pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors flex items-center justify-between">
            <Link 
              to={`/school/${school.id}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-white transition-all hover:gap-3 group-hover:text-white"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
            >
              Explorar
              <ArrowRight size={16} className="text-white/70 group-hover:text-white" />
            </Link>
            
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 border border-white/10 px-2 py-1 rounded bg-black/20 backdrop-blur-sm group-hover:bg-black/40 transition-colors">
              {school.shortName}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
