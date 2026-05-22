import { useState } from "react";
import { Terminal } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

const NAV_TABS = [
  { id: "intro",    label: "HOME"     },
  { id: "projects", label: "PROJECTS" },
  { id: "timeline", label: "TIMELINE" },
  { id: "stack",    label: "STACK"    },
  { id: "network",  label: "NETWORK"  },
  { id: "contact",  label: "CONTACT"  },
];

export default function Header({ currentTab, setTab }: HeaderProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <header className="fixed top-0 w-full z-50">

      {/* ── Layered background ── */}
      <div className="absolute inset-0 bg-[#05070f]/75 backdrop-blur-2xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#14b8a6]/[0.04] to-transparent pointer-events-none" />

      {/* Glowing bottom edge line */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
           style={{ background: "linear-gradient(90deg, transparent 0%, rgba(45,212,191,0.35) 30%, rgba(20,184,166,0.5) 50%, rgba(45,212,191,0.35) 70%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-6 pointer-events-none"
           style={{ background: "radial-gradient(ellipse, rgba(45,212,191,0.07) 0%, transparent 70%)" }} />

      {/* ── Content row ── */}
      <div className="relative flex justify-between items-center px-6 md:px-12 py-3.5 max-w-7xl mx-auto">

        {/* ── Logo ── */}
        <div
          onClick={() => setTab("intro")}
          className="flex items-center gap-3 cursor-pointer group"
          id="brand-logo-trigger"
        >
          {/* Icon with 3D card */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 rounded-xl blur-xl scale-[2.5] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                 style={{ background: "radial-gradient(circle, rgba(45,212,191,0.3) 0%, transparent 70%)" }} />
            <div
              className="relative rounded-xl p-[7px] transition-all duration-300 group-hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(145deg, #0b1120, #05070f)",
                border: "1px solid rgba(20,184,166,0.18)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.3)"
              }}
            >
              <Terminal className="w-[18px] h-[18px] text-[#14b8a6] group-hover:text-[#2dd4bf] transition-colors duration-300" />
            </div>
          </div>

          {/* Name + subtitle */}
          <div className="flex flex-col leading-none gap-[3px]">
            <h1
              className="font-sans font-black text-lg md:text-xl tracking-tighter uppercase logo-shimmer"
              style={{
                backgroundImage: "linear-gradient(90deg, #14b8a6 0%, #0d9488 40%, #2dd4bf 70%, #14b8a6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundSize: "200% auto",
              }}
            >
              DIKSHANT.CORE
            </h1>
            <span className="font-mono text-[9px] font-semibold tracking-[0.22em] uppercase text-[#2dd4bf]">
              SWE // IIT KANPUR
            </span>
          </div>
        </div>

        {/* ── Floating pill nav ── */}
        <nav
          className="hidden md:flex items-center gap-0.5 rounded-2xl px-1.5 py-1.5"
          style={{
            background: "linear-gradient(145deg, rgba(15,13,21,0.9), rgba(21,18,27,0.85))",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.4)"
          }}
          id="desktop-nav-menu"
        >
          {NAV_TABS.map((tab) => {
            const isActive  = currentTab === tab.id;
            const isHovered = hoveredTab  === tab.id && !isActive;

            return (
              <button
                key={tab.id}
                id={`nav-btn-${tab.id}`}
                onClick={() => setTab(tab.id)}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                className="relative px-4 py-[7px] rounded-xl font-mono text-[9px] tracking-widest uppercase transition-all duration-200 select-none"
                style={
                  isActive ? {
                    background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 45%, #2dd4bf 100%)",
                    color: "#030509",
                    fontWeight: 700,
                    transform: "translateY(-1px)",
                    boxShadow: "0 0 16px rgba(45,212,191,0.45), 0 4px 16px rgba(13,148,136,0.3), 0 2px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.35)"
                  } : isHovered ? {
                    background: "rgba(255,255,255,0.055)",
                    color: "#e7e0ed",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)"
                  } : {
                    color: "#7a7389",
                  }
                }
              >
                {/* Top-edge gloss on active */}
                {isActive && (
                  <span
                    className="absolute inset-x-0 top-0 h-[40%] rounded-t-xl pointer-events-none"
                    style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)" }}
                  />
                )}
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* ── Status pill ── */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{
            background: "linear-gradient(145deg, rgba(15,13,21,0.9), rgba(21,18,27,0.8))",
            border: "1px solid rgba(45,212,191,0.18)",
            boxShadow: "0 0 18px rgba(45,212,191,0.07), inset 0 1px 0 rgba(255,255,255,0.04)"
          }}
        >
          {/* Double-ring pulse */}
          <div className="relative w-2 h-2 flex-shrink-0">
            <span className="absolute inset-[-3px] rounded-full border border-[#2dd4bf]/25 animate-ping" />
            <span className="absolute inset-[-1px] rounded-full bg-[#2dd4bf]/20 animate-pulse" />
            <span className="relative block w-full h-full rounded-full bg-[#2dd4bf]" />
          </div>
          <span className="font-mono text-[9px] tracking-wider text-[#2dd4bf] uppercase">
            ONLINE
          </span>
        </div>

      </div>
    </header>
  );
}
