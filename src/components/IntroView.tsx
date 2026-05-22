import { useState, useEffect, useRef } from "react";
import { ArrowRight, Download, MapPin, GraduationCap, Building2 } from "lucide-react";

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

const CAREER = [
  {
    id: "iitk",
    logo: { text: "IIT", sub: "K", bg: "linear-gradient(145deg, #1e3a8a 0%, #2563eb 100%)", glow: "rgba(37,99,235,0.3)" },
    company: "IIT Kanpur",
    role: "B.Tech · Computer Science",
    period: "2018 – 2023",
    accent: "#3b82f6",
    points: [
      "AIR 32 in JEE Advanced (ST Category)",
      "B.Tech in Computer Science & Engineering, Class of 2023",
    ],
    tags: ["C++", "Algorithms", "Data Structures", "ML"],
    current: false,
  },
  {
    id: "tst",
    logo: { text: "TST", sub: "", bg: "linear-gradient(145deg, #78350f 0%, #d97706 100%)", glow: "rgba(217,119,6,0.28)" },
    company: "The Smart Traveller",
    role: "Web Developer",
    period: "Jun 2022",
    accent: "#f59e0b",
    points: [
      "Built React/Redux interfaces with Google Maps integration",
      "Implemented Firebase Cloud Messaging for push notifications",
    ],
    tags: ["React", "Redux", "Firebase", "G-Maps"],
    current: false,
  },
  {
    id: "gz1",
    logo: { text: "GZ", sub: "", bg: "linear-gradient(145deg, #134e4a 0%, #0d9488 100%)", glow: "rgba(13,148,136,0.28)" },
    company: "Goalzen Capital Services",
    role: "Software Developer",
    period: "Sep 2024",
    accent: "#14b8a6",
    points: [
      "Built Smallcase Tracking & Analytics with Node.js & React",
      "Designed quantitative optimization pipelines in Python",
    ],
    tags: ["Node.js", "React", "Analytics", "Python"],
    current: false,
  },
  {
    id: "gz2",
    logo: { text: "GZ", sub: "↑", bg: "linear-gradient(145deg, #0d9488 0%, #2dd4bf 100%)", glow: "rgba(45,212,191,0.32)" },
    company: "Goalzen Capital Services",
    role: "Senior Software Developer",
    period: "Jul 2025 – Present",
    accent: "#2dd4bf",
    points: [
      "ETL pipelines for 47+ AMCs, tracking 2,000+ mutual fund schemes",
      "Node.js/Express backend powering real-time MF analytics",
    ],
    tags: ["Pandas", "ETL", "Express", "MF Analytics"],
    current: true,
  },
];

export default function IntroView({ setTab }: { setTab: (tab: string) => void }) {
  const [cursorOn,     setCursorOn]     = useState(true);
  const [visibleCount, setVisibleCount] = useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Sequential card reveal
  useEffect(() => {
    let count = 0;
    const iv = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= CAREER.length) clearInterval(iv);
    }, 750);
    return () => clearInterval(iv);
  }, []);

  // Scroll cards container as new cards appear
  useEffect(() => {
    if (cardsRef.current)
      cardsRef.current.scrollTop = cardsRef.current.scrollHeight;
  }, [visibleCount]);

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

      {/* ═══════════════ RIGHT — Experience Panel ═══════════════ */}
      <div className="flex-1 w-full max-w-xl">
        <div
          className="rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "linear-gradient(160deg, rgba(13,19,35,0.97) 0%, rgba(5,7,15,0.99) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03) inset, 0 1px 0 rgba(255,255,255,0.07) inset"
          }}
        >
          {/* ── Chrome header ── */}
          <div className="flex justify-between items-center px-5 py-3.5 border-b border-white/[0.06]"
            style={{ background: "rgba(255,255,255,0.015)" }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" style={{ boxShadow: "0 0 4px rgba(255,95,87,0.5)" }} />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" style={{ boxShadow: "0 0 4px rgba(254,188,46,0.5)" }} />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" style={{ boxShadow: "0 0 4px rgba(40,200,64,0.5)" }} />
              </div>
              <span className="font-sans font-semibold text-[12px] text-white/50 tracking-tight ml-1">Experience</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" style={{ boxShadow: "0 0 6px rgba(34,197,94,0.6)" }} />
              <span className="font-mono text-[9px] text-[#64748b] tracking-wider">{CAREER.length} entries</span>
            </div>
          </div>

          {/* ── Timeline entries ── */}
          <div ref={cardsRef} className="flex-1 overflow-y-auto" style={{ maxHeight: "460px" }}>
            {CAREER.slice(0, visibleCount).map((item, idx) => (
              <div
                key={item.id}
                className="relative"
                style={{ animation: "fadeSlideIn 0.4s ease forwards" }}
              >
                {/* Entry row */}
                <div
                  className="flex gap-4 px-5 py-4"
                  style={{
                    background: item.current
                      ? "linear-gradient(90deg, rgba(45,212,191,0.04) 0%, transparent 100%)"
                      : "transparent",
                    borderLeft: item.current ? "2px solid rgba(45,212,191,0.35)" : "2px solid transparent",
                  }}
                >
                  {/* Company logo mark */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
                    <div
                      className="w-11 h-11 rounded-xl flex flex-col items-center justify-center select-none"
                      style={{
                        background: item.logo.bg,
                        boxShadow: `0 6px 20px ${item.logo.glow}, 0 0 0 1px rgba(255,255,255,0.12) inset`,
                      }}
                    >
                      <span className="text-white font-black text-[11px] leading-none tracking-tight">{item.logo.text}</span>
                      {item.logo.sub && (
                        <span className="text-white/80 font-bold text-[9px] leading-none mt-0.5">{item.logo.sub}</span>
                      )}
                    </div>
                    {/* Connector line to next entry */}
                    {idx < CAREER.length - 1 && visibleCount > idx + 1 && (
                      <div className="w-px flex-1 min-h-[12px]"
                        style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)" }} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pb-1">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-sans font-bold text-[14px] text-white leading-tight tracking-tight">
                            {item.company}
                          </h4>
                          {item.current && (
                            <span
                              className="inline-flex items-center gap-1 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-md"
                              style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }}
                            >
                              <span className="w-1 h-1 rounded-full bg-[#22c55e] animate-pulse" />
                              NOW
                            </span>
                          )}
                        </div>
                        <p className="text-[12px] text-[#94a3b8] mt-0.5 font-sans">{item.role}</p>
                      </div>
                      <span className="flex-shrink-0 font-mono text-[9px] text-[#475569] mt-0.5 whitespace-nowrap">
                        {item.period}
                      </span>
                    </div>

                    {/* Achievement bullets */}
                    <ul className="space-y-1 mb-2.5">
                      {item.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span
                            className="flex-shrink-0 w-[5px] h-[5px] rounded-full mt-[5px]"
                            style={{ background: item.accent, boxShadow: `0 0 4px ${item.accent}80` }}
                          />
                          <span className="text-[11px] text-[#94a3b8] leading-relaxed">{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map(t => (
                        <span
                          key={t}
                          className="font-mono text-[9px] px-2 py-0.5 rounded-md"
                          style={{
                            color: "#64748b",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)"
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {idx < visibleCount - 1 && (
                  <div className="mx-5 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                )}
              </div>
            ))}

            {/* Skeleton loader for next entry */}
            {visibleCount < CAREER.length && (
              <div className="flex gap-4 px-5 py-4">
                <div className="w-11 h-11 rounded-xl flex-shrink-0 animate-pulse"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }} />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-3.5 rounded-md animate-pulse w-36" style={{ background: "rgba(255,255,255,0.05)" }} />
                  <div className="h-2.5 rounded-md animate-pulse w-24" style={{ background: "rgba(255,255,255,0.03)" }} />
                  <div className="h-2 rounded-md animate-pulse w-48" style={{ background: "rgba(255,255,255,0.03)" }} />
                </div>
              </div>
            )}
          </div>

          {/* ── Footer ── */}
          <div className="border-t border-white/[0.06] px-5 py-3 flex items-center justify-between"
            style={{ background: "rgba(255,255,255,0.01)" }}>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              <span className="font-sans text-[11px] text-[#475569]">Currently · Goalzen Capital Services</span>
            </div>
            <span className="font-mono text-[9px] text-[#334155]">Hyderabad, IN</span>
          </div>
        </div>
      </div>

    </div>
  );
}
