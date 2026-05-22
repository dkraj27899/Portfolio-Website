import { User, Folder, Rocket, Terminal, Mail, History } from "lucide-react";

interface BottomNavBarProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export default function BottomNavBar({ currentTab, setTab }: BottomNavBarProps) {
  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full w-[90%] max-w-[400px] bg-[#111827]/80 backdrop-blur-2xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.8)] z-50 flex items-center justify-between px-4 py-2.5" id="mobile-floating-navigation-bar">
      {/* Tab: INTRO */}
      <button
        onClick={() => setTab("intro")}
        className={`p-2.5 rounded-full transition-all duration-200 active:scale-95 ${
          currentTab === "intro"
            ? "bg-[#14b8a6]/20 text-[#14b8a6] shadow-[0_0_15px_rgba(208,188,255,0.4)] border border-[#14b8a6]/20"
            : "text-[#cbd5e1] hover:text-[#2dd4bf]"
        }`}
        title="Home"
      >
        <User className="w-5 h-5" />
      </button>

      {/* Tab: PROJECTS */}
      <button
        onClick={() => setTab("projects")}
        className={`p-2.5 rounded-full transition-all duration-200 active:scale-95 ${
          currentTab === "projects"
            ? "bg-[#14b8a6]/20 text-[#14b8a6] shadow-[0_0_15px_rgba(208,188,255,0.4)] border border-[#14b8a6]/20"
            : "text-[#cbd5e1] hover:text-[#2dd4bf]"
        }`}
        title="Featured Projects"
        id="mobile-nav-projects"
      >
        <Folder className="w-5 h-5" />
      </button>

      {/* Tab: TIMELINE */}
      <button
        onClick={() => setTab("timeline")}
        className={`p-2.5 rounded-full transition-all duration-200 active:scale-95 ${
          currentTab === "timeline"
            ? "bg-[#14b8a6]/20 text-[#14b8a6] shadow-[0_0_15px_rgba(208,188,255,0.4)] border border-[#14b8a6]/20"
            : "text-[#cbd5e1] hover:text-[#2dd4bf]"
        }`}
        title="Project Timeline"
        id="mobile-nav-timeline"
      >
        <History className="w-5 h-5" />
      </button>

      {/* Tab: STACK */}
      <button
        onClick={() => setTab("stack")}
        className={`p-2.5 rounded-full transition-all duration-200 active:scale-95 ${
          currentTab === "stack"
            ? "bg-[#14b8a6]/20 text-[#14b8a6] shadow-[0_0_15px_rgba(208,188,255,0.4)] border border-[#14b8a6]/20"
            : "text-[#cbd5e1] hover:text-[#2dd4bf]"
        }`}
        title="Technical Stack"
        id="mobile-nav-stack"
      >
        <Rocket className="w-5 h-5" />
      </button>

      {/* Tab: NETWORK */}
      <button
        onClick={() => setTab("network")}
        className={`p-2.5 rounded-full transition-all duration-200 active:scale-95 ${
          currentTab === "network"
            ? "bg-[#14b8a6]/20 text-[#14b8a6] shadow-[0_0_15px_rgba(208,188,255,0.4)] border border-[#14b8a6]/20"
            : "text-[#cbd5e1] hover:text-[#2dd4bf]"
        }`}
        title="Network Telemetry"
        id="mobile-nav-network"
      >
        <Terminal className="w-5 h-5" />
      </button>

      {/* Tab: CONTACT */}
      <button
        onClick={() => setTab("contact")}
        className={`p-2.5 rounded-full transition-all duration-200 active:scale-95 ${
          currentTab === "contact"
            ? "bg-[#14b8a6]/20 text-[#14b8a6] shadow-[0_0_15px_rgba(208,188,255,0.4)] border border-[#14b8a6]/20"
            : "text-[#cbd5e1] hover:text-[#2dd4bf]"
        }`}
        title="Contact Me"
        id="mobile-nav-contact"
      >
        <Mail className="w-5 h-5" />
      </button>
    </nav>
  );
}
