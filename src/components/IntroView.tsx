import { useState, useEffect, useRef } from "react";
import { Terminal, ArrowRight, Download, Github, Linkedin } from "lucide-react";

export default function IntroView({ setTab }: { setTab: (tab: string) => void }) {
  // Journey Logs
  const [journeyLogs, setJourneyLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const logsContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setJourneyLogs(fullLogs.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === fullLogs.length) {
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [journeyLogs]);

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-center min-h-[75vh]">
      {/* Left side: Hero / Intro */}
      <div className="flex-1 space-y-8 text-center lg:text-left">
        <div className="space-y-4">
          <div className="inline-block border border-[#5de6ff]/30 bg-[#5de6ff]/10 px-3 py-1 rounded-full text-xs font-mono text-[#5de6ff] uppercase tracking-widest mb-4">
            Available For Hire
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-black text-[#d0bcff] tracking-tighter uppercase leading-tight">
            Dikshant Raj <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5de6ff] to-[#a078ff]">Meena</span>
          </h1>
          <p className="font-mono text-[#cbc3d7] text-sm md:text-base max-w-lg mx-auto lg:mx-0 leading-relaxed">
            IIT Kanpur Computer Science Graduate. Full-Stack Engineer specializing in scalable web pipelines, quantitative trading tech, and modern frontend architecture. 
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
          <button
            onClick={() => setTab("projects")}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#d0bcff] to-[#5de6ff] text-[#15121b] font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            View Projects <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="/resume.pdf"
            download="Dikshant_Raj_Meena_Resume.pdf"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#211e27] border border-white/10 text-[#cbc3d7] font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Download className="w-4 h-4" /> Download CV
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-3 justify-center lg:justify-start">
          <a
            href="https://github.com/dkraj27899"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg font-mono text-[10px] text-[#cbc3d7] hover:text-[#5de6ff] hover:border-[#5de6ff]/30 transition-all uppercase tracking-widest"
          >
            <Github className="w-3.5 h-3.5" /> dkraj27899
          </a>
          <a
            href="https://www.linkedin.com/in/dikshant-raj-meena-04a41b209/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg font-mono text-[10px] text-[#cbc3d7] hover:text-[#5de6ff] hover:border-[#5de6ff]/30 transition-all uppercase tracking-widest"
          >
            <Linkedin className="w-3.5 h-3.5" /> dkraj27899
          </a>
        </div>
      </div>

      {/* Right side: Journey Terminal */}
      <div className="flex-1 w-full max-w-2xl">
        <div className="glass-card inner-glow p-5 rounded-2xl border border-white/5 min-h-[450px] flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.8)] relative overflow-hidden group">
          <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)] opacity-50 z-10" />
          
          <div className="space-y-4 h-full flex flex-col relative z-20">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <span className="font-mono text-[9px] text-[#5de6ff] tracking-widest uppercase flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#5de6ff]" /> dikshant@portfolio:~$
              </span>
              <span className="font-mono text-[8px] text-[#958ea0] flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> ONLINE
              </span>
            </div>

            <div ref={logsContainerRef} className="bg-[#0f0d15] p-5 rounded-xl border border-gray-800/50 flex-1 overflow-y-auto font-mono text-xs leading-relaxed text-[#cbc3d7] space-y-1 shadow-inner h-[380px]">
              {journeyLogs.map((log, lIdx) => {
                const isCommand = log.startsWith(">");
                
                return (
                  <div key={lIdx} className={`flex gap-2 items-start ${isCommand ? 'text-[#5de6ff] mt-2' : ''}`}>
                    <p className="text-left whitespace-pre-wrap flex-1">
                      {isCommand ? 
                        <span className="font-bold">{log}</span> : 
                        <span>
                          {log.split(/(\[.*?\])/).map((part, i) => {
                             if (part.includes("[SUCCESS]")) return <span key={i} className="text-green-400 font-bold">{part}</span>;
                             if (part.includes("[INFO]")) return <span key={i} className="text-blue-400 font-bold">{part}</span>;
                             if (part.match(/\[.*?\]/)) return <span key={i} className="text-[#ffb869] font-bold">{part}</span>;
                             return part;
                          })}
                        </span>
                      }
                    </p>
                  </div>
                );
              })}
              {/* Blinking cursor */}
              <div className="w-2 h-4 bg-[#5de6ff] animate-pulse mt-1 ml-1 inline-block align-middle" />
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
