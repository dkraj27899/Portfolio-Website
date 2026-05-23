import { useState } from "react";
import { motion } from "motion/react";
import { Project } from "../types";
import { projectsData } from "../data";
import { Search, ArrowUpRight } from "lucide-react";

const ACCENTS = ["#2dd4bf", "#a78bfa", "#60a5fa", "#fb923c"];

interface ProjectListProps {
  onSelectProject: (project: Project) => void;
}

export default function ProjectList({ onSelectProject }: ProjectListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag]  = useState<string | null>(null);

  const allTags = Array.from(new Set(projectsData.flatMap((p) => p.tags)));

  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = selectedTag ? project.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-5xl mx-auto">

      {/* ══════════ Header ══════════ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-14"
      >
        <div className="flex items-center gap-2.5 mb-5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-teal-400 animate-ping opacity-60" />
            <span className="relative block h-2 w-2 rounded-full bg-teal-400" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-teal-400/60 uppercase">
            Sys.Projects · Active Deployments
          </span>
        </div>

        <h1 className="font-sans font-black text-4xl md:text-5xl uppercase tracking-tight leading-none">
          <span className="text-white">Featured </span>
          <span
            style={{
              backgroundImage: "linear-gradient(110deg, #0d9488 0%, #2dd4bf 50%, #14b8a6 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Builds
          </span>
        </h1>

        <p className="font-mono text-[11px] text-white/30 mt-3 tracking-[0.25em] uppercase">
          {projectsData.length} systems · High-precision architecture
        </p>
      </motion.div>

      {/* ══════════ Search + Filters ══════════ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="mb-10 rounded-2xl p-4"
        style={{
          background: "linear-gradient(160deg, rgba(17,24,39,0.7) 0%, rgba(5,7,15,0.6) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        }}
      >
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-60 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
            <input
              type="text"
              placeholder="Search builds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.04] text-white text-[11px] font-mono pl-9 pr-4 py-2 rounded-xl border border-white/[0.08] focus:border-teal-400/50 focus:outline-none transition-colors placeholder:text-white/20"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setSelectedTag(null)}
              className="px-3 py-1 rounded-lg font-mono text-[9px] tracking-widest uppercase transition-all"
              style={
                selectedTag === null
                  ? { background: "rgba(45,212,191,0.15)", color: "#2dd4bf", border: "1px solid rgba(45,212,191,0.35)" }
                  : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.07)" }
              }
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className="px-3 py-1 rounded-lg font-mono text-[9px] tracking-widest uppercase transition-all"
                style={
                  selectedTag === tag
                    ? { background: "rgba(45,212,191,0.15)", color: "#2dd4bf", border: "1px solid rgba(45,212,191,0.35)" }
                    : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.07)" }
                }
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ══════════ Project Grid ══════════ */}
      {filteredProjects.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
          <p className="font-mono text-[11px] text-white/20 uppercase tracking-[0.3em]">
            No systems match query
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => {
            const accent   = ACCENTS[index % ACCENTS.length] ?? "#2dd4bf";
            const phaseNum = String(index + 1).padStart(2, "0");
            const isLive   = project.date.toLowerCase().includes("present");

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.45, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                className="rounded-2xl overflow-hidden cursor-pointer group"
                style={{
                  background: "linear-gradient(160deg, rgba(17,24,39,0.85) 0%, rgba(5,7,15,0.75) 100%)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderTop: `2px solid ${accent}50`,
                  boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.03)`,
                }}
                onClick={() => onSelectProject(project)}
              >
                {/* ── Hero image ── */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Color-wash overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(155deg, ${accent}15 0%, rgba(5,7,15,0.8) 100%)`,
                    }}
                  />
                  {/* Bottom fade into card body */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#07090f] to-transparent" />

                  {/* Top row: module badge + date + live */}
                  <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between">
                    <span
                      className="font-mono text-[8.5px] tracking-[0.28em] uppercase px-2.5 py-1 rounded-lg"
                      style={{
                        background: `${accent}18`,
                        border: `1px solid ${accent}30`,
                        color: accent,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      MODULE_{phaseNum}
                    </span>

                    <div className="flex items-center gap-2">
                      {isLive && (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[7.5px] tracking-widest uppercase"
                          style={{ background: `${accent}18`, border: `1px solid ${accent}35`, color: accent, backdropFilter: "blur(8px)" }}
                        >
                          <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: accent }} />
                          Live
                        </span>
                      )}
                      <span className="font-mono text-[9px]" style={{ color: `${accent}99` }}>
                        {project.date}
                      </span>
                    </div>
                  </div>

                  {/* Title at bottom of image */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
                    <h3
                      className="font-sans font-black text-[1.25rem] md:text-[1.4rem] tracking-tight leading-tight transition-colors duration-200 group-hover:text-white"
                      style={{ color: "rgba(255,255,255,0.9)" }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* ── Card body ── */}
                <div className="px-5 pb-5 pt-3.5">

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md font-mono text-[8.5px] uppercase tracking-wider"
                        style={{
                          background: `${accent}0d`,
                          border: `1px solid ${accent}22`,
                          color: `${accent}bb`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="font-sans text-[12.5px] text-white/38 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {project.metrics.slice(0, 4).map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="rounded-xl px-3 py-2.5"
                        style={{
                          background: `${accent}08`,
                          border: `1px solid ${accent}18`,
                        }}
                      >
                        <div className="font-mono text-[7.5px] text-white/22 uppercase tracking-wider mb-1">
                          {metric.label}
                        </div>
                        <div className="font-mono font-bold text-[12px]" style={{ color: accent }}>
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer: score bar + gamified CTA */}
                  <div
                    className="flex items-center justify-between pt-3.5"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    {/* Benchmark score */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[8px] text-white/20 uppercase tracking-wider">Score</span>
                      <div className="w-16 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${project.benchmarkScore}%`,
                            background: `linear-gradient(90deg, ${accent}70, ${accent})`,
                            boxShadow: `0 0 6px ${accent}50`,
                          }}
                        />
                      </div>
                      <span className="font-mono text-[9px] font-bold" style={{ color: accent }}>
                        {project.benchmarkScore}%
                      </span>
                    </div>

                    {/* Gamified arrow — same pattern as Timeline */}
                    <motion.div className="flex items-center gap-2" initial="rest" whileHover="hover">
                      <motion.span
                        className="font-mono text-[9px] uppercase"
                        style={{ color: accent }}
                        variants={{
                          rest:  { opacity: 0.5, letterSpacing: "0.28em" },
                          hover: { opacity: 1,   letterSpacing: "0.44em" },
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        Open
                      </motion.span>

                      <motion.div
                        className="relative w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${accent}0e`, border: `1.5px solid ${accent}38` }}
                        variants={{
                          rest:  { boxShadow: `0 0 0px ${accent}00` },
                          hover: {
                            boxShadow: `0 0 0 2px ${accent}22, 0 0 20px ${accent}55, 0 0 40px ${accent}1a`,
                            background: `${accent}1c`,
                          },
                        }}
                        transition={{ duration: 0.28 }}
                      >
                        {/* Ripple 1 */}
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
                        {/* Ripple 2 — offset */}
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
                        {/* Bouncing arrow */}
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
                          <ArrowUpRight className="w-3.75 h-3.75 relative z-10" style={{ color: accent }} />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
