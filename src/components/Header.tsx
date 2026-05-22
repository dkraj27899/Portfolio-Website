import { Terminal } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export default function Header({ currentTab, setTab }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#15121b]/40 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(208,188,255,0.08)]">
      <div className="flex justify-between items-center px-6 md:px-12 py-5 max-w-7xl mx-auto">
        {/* Brand Title */}
        <div 
          onClick={() => setTab("intro")}
          className="flex items-center gap-3 cursor-pointer group"
          id="brand-logo-trigger"
        >
          <Terminal className="w-6 h-6 text-[#d0bcff] group-hover:rotate-6 transition-transform duration-300" />
          <h1 className="font-sans font-extrabold text-xl md:text-2xl tracking-tighter text-[#d0bcff] uppercase">
            DIKSHANT.CORE
          </h1>
        </div>

        {/* Global Navigation links (hidden on very small responsive scales, handled by bottom sticky bar) */}
        <nav className="hidden md:flex gap-8 items-center" id="desktop-nav-menu">
          <button
            onClick={() => setTab("intro")}
            className={`font-mono text-xs tracking-widest uppercase transition-all duration-300 border-b-2 py-1 ${
              currentTab === "intro"
                ? "text-[#5de6ff] border-[#5de6ff]"
                : "text-[#cbc3d7] border-transparent hover:text-[#d0bcff]"
            }`}
          >
            HOME // INTRO
          </button>

          <button
            onClick={() => setTab("projects")}
            className={`font-mono text-xs tracking-widest uppercase transition-all duration-300 border-b-2 py-1 ${
              currentTab === "projects"
                ? "text-[#5de6ff] border-[#5de6ff]"
                : "text-[#cbc3d7] border-transparent hover:text-[#d0bcff]"
            }`}
            id="nav-btn-projects"
          >
            PROJECTS
          </button>

          <button
            onClick={() => setTab("timeline")}
            className={`font-mono text-xs tracking-widest uppercase transition-all duration-300 border-b-2 py-1 ${
              currentTab === "timeline"
                ? "text-[#5de6ff] border-[#5de6ff]"
                : "text-[#cbc3d7] border-transparent hover:text-[#d0bcff]"
            }`}
            id="nav-btn-timeline"
          >
            TIMELINE
          </button>
          
          <button
            onClick={() => setTab("stack")}
            className={`font-mono text-xs tracking-widest uppercase transition-all duration-300 border-b-2 py-1 ${
              currentTab === "stack"
                ? "text-[#5de6ff] border-[#5de6ff]"
                : "text-[#cbc3d7] border-transparent hover:text-[#d0bcff]"
            }`}
            id="nav-btn-stack"
          >
            STACK // SKILLS
          </button>

          <button
            onClick={() => setTab("network")}
            className={`font-mono text-xs tracking-widest uppercase transition-all duration-300 border-b-2 py-1 ${
              currentTab === "network"
                ? "text-[#5de6ff] border-[#5de6ff]"
                : "text-[#cbc3d7] border-transparent hover:text-[#d0bcff]"
            }`}
            id="nav-btn-network"
          >
            NETWORK // STATUS
          </button>

          <button
            onClick={() => setTab("contact")}
            className={`font-mono text-xs tracking-widest uppercase transition-all duration-300 border-b-2 py-1 ${
              currentTab === "contact"
                ? "text-[#5de6ff] border-[#5de6ff]"
                : "text-[#cbc3d7] border-transparent hover:text-[#d0bcff]"
            }`}
            id="nav-btn-contact"
          >
            CONTACT ME
          </button>
        </nav>

        {/* Status Indicator Pill */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1d1a23] border border-[#d0bcff]/20">
          <span className="w-2 h-2 rounded-full bg-[#5de6ff] animate-ping" />
          <span className="font-mono text-[10px] tracking-wider text-[#cbc3d7] uppercase">
            SECURE STACK ONLINE
          </span>
        </div>
      </div>
    </header>
  );
}
