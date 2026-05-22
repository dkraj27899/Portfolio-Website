import { useState, useEffect, useRef } from "react";
import { Terminal, ArrowRight, Download, MapPin, GraduationCap, Building2 } from "lucide-react";

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12 24 5.373 18.627 0 12 0z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const STATS = [
  { value: "47+",    label: "AMCs",    sub: "Processed" },
  { value: "2,000+", label: "Schemes", sub: "Tracked"   },
];

export default function IntroView({ setTab }: { setTab: (tab: string) => void }) {
  const [journeyLogs, setJourneyLogs]   = useState<string[]>([]);
  const [cursorOn, setCursorOn]         = useState(true);
  const logsContainerRef                = useRef<HTMLDivElement>(null);
  const logsEndRef                      = useRef<HTMLDivElement>(null);

  const fullLogs = [
    "> Executing profile_init.sh...",
    "> Loading academic records...",
    "  [SUCCESS] B.Tech in Computer Science, IIT Kanpur (Class of 2023)",
    "  [INFO] JEE Advanced 2018: AIR 32 (ST Category)",
    "  [INFO] JEE Advanced 2018: AIR 4754 Overall",
    "> Initializing professional experience...",
    "  [June 2022] Web Developer @ The Smart Traveller",
    "      - Designed UIs with React/Redux and integrated G-Maps.",
    "      - Implemented Firebase Cloud Messaging.",
    "  [Sep 2024] Software Developer @ Goalzen Capital Services",
    "      - Built Smallcase Tracking & Analytics with Node.js & React.",
    "      - Designed quantitative optimization pipelines.",
    "  [July 2025] Promoted to Senior Software Developer @ Goalzen",
    "      - Engineered scalable ETL pipelines using Pandas for 47+ AMCs.",
    "      - Developed Node.js/Express backend for mutual fund tracking.",
    "> Profile loaded successfully.",
    "> Current status: Open to new opportunities."
  ];

  // Typewriter
  useEffect(() => {
    let idx = 0;
    const iv = setInterval(() => {
      setJourneyLogs(fullLogs.slice(0, idx + 1));
      idx++;
      if (idx === fullLogs.length) clearInterval(iv);
    }, 450);
    return () => clearInterval(iv);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (logsContainerRef.current)
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
  }, [journeyLogs]);

  // Blinking cursor for role title
  useEffect(() => {
    const iv = setInterval(() => setCursorOn(p => !p), 600);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-center min-h-[78vh]">

      {/* ═══════════════ LEFT — Identity panel ═══════════════ */}
      <div className="flex-1 space-y-7 text-center lg:text-left">

        {/* ── Hire badge ── */}
        <div
          className="inline-flex items-center gap-3 px-4 py-2 rounded-lg font-mono text-[10px]"
          style={{
            background: "rgba(20,184,166,0.05)",
            border: "1px solid rgba(20,184,166,0.18)",
            borderLeft: "3px solid #14b8a6",
          }}
        >
          <span className="text-[#14b8a6] font-bold select-none">&gt;_</span>
          <span className="text-[#2dd4bf] font-semibold tracking-[0.2em] uppercase">Open to Work</span>
          <span className="text-white/20 select-none">·</span>
          <span className="text-[#94a3b8] tracking-wider uppercase">Full-Stack · Remote OK</span>
        </div>

        {/* ── Role title — the hero ── */}
        <div className="space-y-0 leading-none">
          <p className="font-sans font-black uppercase tracking-tighter text-[#cbd5e1]/50 text-base md:text-lg">
            Senior Software Engineer
          </p>
          <h1 className="font-sans font-black uppercase tracking-tighter leading-[0.9] mt-1">
            <span
              className="text-4xl md:text-[3.75rem] block"
              style={{
                backgroundImage: "linear-gradient(120deg, #14b8a6 0%, #0d9488 50%, #2dd4bf 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Full-Stack
            </span>
            <span className="text-4xl md:text-[3.75rem] text-white block">
              Engineer
              <span
                className="ml-1 text-[#2dd4bf]"
                style={{ opacity: cursorOn ? 1 : 0, transition: "opacity 0.1s" }}
              >_</span>
            </span>
          </h1>
        </div>

        {/* ── Name byline ── */}
        <div className="flex items-center gap-3 justify-center lg:justify-start">
          <span className="hidden lg:block w-8 h-px bg-gradient-to-r from-[#2dd4bf]/60 to-transparent" />
          <span className="font-mono text-sm tracking-[0.18em] text-[#14b8a6] uppercase">
            Dikshant Raj Meena
          </span>
        </div>

        {/* ── Meta chips ── */}
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
          {[
            { icon: <GraduationCap className="w-3 h-3" />, text: "IIT Kanpur · CS '23"       },
            { icon: <Building2     className="w-3 h-3" />, text: "Goalzen Capital Services"   },
            { icon: <MapPin        className="w-3 h-3" />, text: "Hyderabad, IN"              },
          ].map((m) => (
            <span
              key={m.text}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-[10px] text-[#cbd5e1] uppercase tracking-wider"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {m.icon} {m.text}
            </span>
          ))}
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto lg:mx-0">
          {STATS.map((s) => (
            <div
              key={s.value}
              className="flex flex-col items-center lg:items-start p-3 rounded-xl"
              style={{
                background: "linear-gradient(145deg, rgba(30,27,38,0.7), rgba(21,18,27,0.5))",
                border: "1px solid rgba(20,184,166,0.1)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
              }}
            >
              <span
                className="font-sans font-black text-lg md:text-xl tracking-tight"
                style={{
                  backgroundImage: "linear-gradient(120deg, #14b8a6, #2dd4bf)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                {s.value}
              </span>
              <span className="font-mono text-[8px] text-white/70 uppercase tracking-wider leading-none mt-0.5">{s.label}</span>
              <span className="font-mono text-[7px] text-white/35 uppercase tracking-wider leading-none mt-0.5">{s.sub}</span>
            </div>
          ))}
        </div>

        {/* ── CTAs ── */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
          <button
            onClick={() => setTab("projects")}
            className="w-full sm:w-auto px-7 py-3 font-bold text-[11px] uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #2dd4bf 100%)",
              color: "#030509",
              boxShadow: "0 0 20px rgba(13,148,136,0.3), 0 4px 12px rgba(0,0,0,0.3)"
            }}
          >
            View Projects <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <a
            href="/resume.pdf"
            download="Dikshant_Raj_Meena_Resume.pdf"
            className="w-full sm:w-auto px-7 py-3 font-bold text-[11px] uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all hover:border-white/20 hover:text-white"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#cbd5e1",
            }}
          >
            <Download className="w-3.5 h-3.5" /> Download CV
          </a>
        </div>

        {/* ── Social ── */}
        <div className="flex items-center gap-2.5 justify-center lg:justify-start">
          <a
            href="https://github.com/dkraj27899"
            target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-[9px] text-[#cbd5e1] hover:text-[#2dd4bf] hover:border-[#2dd4bf]/30 transition-all uppercase tracking-widest"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <GitHubIcon className="w-3.5 h-3.5" /> dkraj27899
          </a>
          <a
            href="https://www.linkedin.com/in/dikshant-raj-meena-04a41b209/"
            target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-[9px] text-[#cbd5e1] hover:text-[#2dd4bf] hover:border-[#2dd4bf]/30 transition-all uppercase tracking-widest"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <LinkedInIcon className="w-3.5 h-3.5" /> LinkedIn
          </a>
        </div>
      </div>

      {/* ═══════════════ RIGHT — Journey Terminal ═══════════════ */}
      <div className="flex-1 w-full max-w-xl">
        <div
          className="relative rounded-2xl overflow-hidden flex flex-col min-h-[460px]"
          style={{
            background: "linear-gradient(145deg, rgba(21,18,27,0.9), rgba(15,13,21,0.95))",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 0 60px rgba(0,0,0,0.7), 0 0 30px rgba(45,212,191,0.04), inset 0 1px 0 rgba(255,255,255,0.06)"
          }}
        >
          {/* CRT scanline overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-40 z-10"
               style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)" }} />

          {/* Window chrome */}
          <div className="relative z-20 flex justify-between items-center px-5 py-3.5 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-[9px] text-[#2dd4bf]/70 tracking-widest uppercase ml-2 flex items-center gap-1.5">
                <Terminal className="w-3 h-3" /> dikshant@portfolio:~$
              </span>
            </div>
            <span className="font-mono text-[8px] text-[#64748b] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> LIVE
            </span>
          </div>

          {/* Log output */}
          <div
            ref={logsContainerRef}
            className="relative z-20 flex-1 overflow-y-auto p-5 font-mono text-xs leading-relaxed text-[#cbd5e1] space-y-1"
            style={{ background: "rgba(10,8,18,0.6)", minHeight: "380px" }}
          >
            {journeyLogs.map((log, lIdx) => {
              const isCommand = log.startsWith(">");
              return (
                <div key={lIdx} className={`flex gap-2 items-start ${isCommand ? "text-[#2dd4bf] mt-2" : ""}`}>
                  <p className="text-left whitespace-pre-wrap flex-1">
                    {isCommand
                      ? <span className="font-bold">{log}</span>
                      : <span>
                          {log.split(/(\[.*?\])/).map((part, i) => {
                            if (part.includes("[SUCCESS]")) return <span key={i} className="text-green-400 font-bold">{part}</span>;
                            if (part.includes("[INFO]"))    return <span key={i} className="text-blue-400 font-bold">{part}</span>;
                            if (part.match(/\[.*?\]/))      return <span key={i} className="text-[#f59e0b] font-bold">{part}</span>;
                            return part;
                          })}
                        </span>
                    }
                  </p>
                </div>
              );
            })}
            <span
              className="inline-block w-2 h-[14px] bg-[#2dd4bf] ml-1 align-middle"
              style={{ opacity: cursorOn ? 1 : 0, transition: "opacity 0.1s" }}
            />
            <div ref={logsEndRef} />
          </div>
        </div>
      </div>

    </div>
  );
}
