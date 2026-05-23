import { motion } from "motion/react";
import { projectsData } from "../data";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../types";

// Unique accent per phase — keeps each card visually distinct
const ACCENTS = ["#2dd4bf", "#a78bfa", "#60a5fa", "#fb923c"];

export default function TimelineView({
  onSelectProject,
}: {
  onSelectProject: (project: Project) => void;
}) {
  return (
    <div className="max-w-4xl mx-auto">

      {/* ══════════ Header ══════════ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-16"
      >
        <div className="flex items-center gap-2.5 mb-5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-teal-400 animate-ping opacity-60" />
            <span className="relative block h-2 w-2 rounded-full bg-teal-400" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-teal-400/60 uppercase">
            Sys.Timeline · Deploy Log
          </span>
        </div>

        <h1 className="font-sans font-black text-4xl md:text-5xl uppercase tracking-tight leading-none">
          <span className="text-white">Build </span>
          <span
            style={{
              backgroundImage: "linear-gradient(110deg, #0d9488 0%, #2dd4bf 50%, #14b8a6 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            History
          </span>
        </h1>

        <p className="font-mono text-[11px] text-white/30 mt-3 tracking-[0.25em] uppercase">
          {projectsData.length} milestones · Sorted by recency
        </p>
      </motion.div>

      {/* ══════════ Timeline ══════════ */}
      <div className="relative">

        {/* Gradient spine */}
        <div
          className="absolute left-5 top-5 bottom-16 w-px pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(45,212,191,0.8) 0%, rgba(167,139,250,0.5) 40%, rgba(96,165,250,0.3) 70%, transparent 100%)",
          }}
        />

        <div className="space-y-10">
          {projectsData.map((project, index) => {
            const accent   = ACCENTS[index] ?? "#2dd4bf";
            const phaseNum = String(index + 1).padStart(2, "0");
            const isLive   = project.date.toLowerCase().includes("present");

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.13, duration: 0.4, ease: "easeOut" }}
                className="flex gap-6 md:gap-8 items-start"
              >

                {/* ── Numbered node ── */}
                <div className="relative shrink-0 w-10 z-10">
                  {isLive && (
                    <span
                      className="absolute inset-[-4px] rounded-full animate-ping opacity-20"
                      style={{ border: `1px solid ${accent}` }}
                    />
                  )}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-black text-[11px] select-none"
                    style={{
                      background: `radial-gradient(circle at 38% 38%, ${accent}28 0%, ${accent}0a 100%)`,
                      border: `1.5px solid ${accent}55`,
                      color: accent,
                      boxShadow: `0 0 20px ${accent}22, inset 0 1px 0 rgba(255,255,255,0.1)`,
                    }}
                  >
                    {phaseNum}
                  </div>
                </div>

                {/* ── Project card ── */}
                <div
                  className="flex-1 rounded-2xl cursor-pointer group transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
                  style={{
                    background: "linear-gradient(160deg, rgba(17,24,39,0.75) 0%, rgba(5,7,15,0.6) 100%)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderTop: `2px solid ${accent}55`,
                    boxShadow: `0 4px 28px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.03)`,
                  }}
                  onClick={() => onSelectProject(project)}
                >

                  {/* Card header row */}
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <span className="font-mono text-[8.5px] tracking-[0.28em] text-white/20 uppercase">
                      Phase {phaseNum}
                    </span>
                    <div className="flex items-center gap-2">
                      {isLive && (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[8px] tracking-widest uppercase"
                          style={{
                            background: `${accent}15`,
                            border: `1px solid ${accent}35`,
                            color: accent,
                          }}
                        >
                          <span
                            className="w-1 h-1 rounded-full animate-pulse"
                            style={{ background: accent }}
                          />
                          Live
                        </span>
                      )}
                      <span
                        className="font-mono text-[9.5px]"
                        style={{ color: `${accent}bb` }}
                      >
                        {project.date}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="px-5 pt-2.5 pb-5">
                    <h3
                      className="font-sans font-black text-[1.2rem] md:text-[1.35rem] tracking-tight leading-tight mb-2 transition-colors duration-200 group-hover:text-white"
                      style={{ color: "rgba(255,255,255,0.88)" }}
                    >
                      {project.title}
                    </h3>

                    <p className="font-sans text-[13px] text-white/40 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md font-mono text-[9px] uppercase tracking-wider"
                          style={{
                            background: `${accent}0e`,
                            border: `1px solid ${accent}22`,
                            color: `${accent}bb`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer: score bar + CTA */}
                    <div className="flex items-center justify-between pt-3.5 border-t border-white/[0.05]">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[8px] text-white/20 uppercase tracking-wider">
                          Score
                        </span>
                        <div className="w-20 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${project.benchmarkScore}%`,
                              background: `linear-gradient(90deg, ${accent}70, ${accent})`,
                              boxShadow: `0 0 6px ${accent}50`,
                            }}
                          />
                        </div>
                        <span
                          className="font-mono text-[9px] font-bold"
                          style={{ color: accent }}
                        >
                          {project.benchmarkScore}%
                        </span>
                      </div>

                      <motion.div
                        className="flex items-center gap-2"
                        initial="rest"
                        whileHover="hover"
                      >
                        <motion.span
                          className="font-mono text-[9px] uppercase"
                          style={{ color: accent }}
                          variants={{
                            rest:  { opacity: 0.5, letterSpacing: "0.28em" },
                            hover: { opacity: 1,   letterSpacing: "0.44em" },
                          }}
                          transition={{ duration: 0.22 }}
                        >
                          Launch
                        </motion.span>

                        {/* Gamified arrow badge */}
                        <motion.div
                          className="relative w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `${accent}0e`, border: `1.5px solid ${accent}38` }}
                          variants={{
                            rest:  { boxShadow: `0 0 0px ${accent}00` },
                            hover: {
                              boxShadow: `0 0 0 2px ${accent}22, 0 0 20px ${accent}55, 0 0 40px ${accent}1a`,
                              background: `${accent}1c`,
                              border: `1.5px solid ${accent}`,
                            },
                          }}
                          transition={{ duration: 0.28 }}
                        >
                          {/* Ripple ring */}
                          <motion.div
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            style={{ border: `1px solid ${accent}` }}
                            variants={{
                              rest:  { scale: 1, opacity: 0 },
                              hover: {
                                scale: [1, 1.7],
                                opacity: [0.75, 0],
                                transition: { repeat: Infinity, duration: 0.88, ease: "easeOut" },
                              },
                            }}
                          />

                          {/* Second ripple — offset phase */}
                          <motion.div
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            style={{ border: `1px solid ${accent}` }}
                            variants={{
                              rest:  { scale: 1, opacity: 0 },
                              hover: {
                                scale: [1, 1.7],
                                opacity: [0.4, 0],
                                transition: { repeat: Infinity, duration: 0.88, ease: "easeOut", delay: 0.44 },
                              },
                            }}
                          />

                          {/* Diagonal bounce arrow */}
                          <motion.div
                            variants={{
                              rest:  { x: 0, y: 0 },
                              hover: {
                                x: [0, 3, 0],
                                y: [0, -3, 0],
                                transition: { repeat: Infinity, duration: 0.48, ease: "easeInOut" },
                              },
                            }}
                          >
                            <ArrowUpRight
                              className="w-3.75 h-3.75 relative z-10"
                              style={{ color: accent }}
                            />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Origin marker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: projectsData.length * 0.13 + 0.25 }}
          className="flex items-center gap-4 mt-10 ml-0.5"
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              className="w-3 h-3 rounded-sm"
              style={{ border: "1.5px solid rgba(255,255,255,0.2)" }}
            />
          </div>
          <div>
            <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.28em] block">
              Origin · Start of Journey
            </span>
            <span className="font-mono text-[8px] text-white/12 uppercase tracking-wider">
              IIT Kanpur · 2018
            </span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
