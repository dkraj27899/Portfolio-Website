import { useState } from "react";
import { Project } from "../types";
import { projectsData } from "../data";
import { ArrowRight, Search, SlidersHorizontal, Layers, Sparkles } from "lucide-react";

interface ProjectListProps {
  onSelectProject: (project: Project) => void;
}

export default function ProjectList({ onSelectProject }: ProjectListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags across projects
  const allTags = Array.from(
    new Set(projectsData.flatMap((project) => project.tags))
  );

  // Filter projects based on query and tag
  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag = selectedTag ? project.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  return (
    <div id="project-list-container">
      {/* Featured Header & Intro */}
      <section className="mb-16 text-center animate-fade-in">
        <h2 className="font-sans font-black text-4xl md:text-6xl text-[#14b8a6] mb-6 tracking-tight uppercase relative inline-block">
          FEATURED_BUILDS
          <div className="absolute -inset-1 rounded bg-[#14b8a6]/10 blur-xl opacity-50 z-[-1]" />
        </h2>
        <p className="max-w-2xl mx-auto text-[#cbd5e1] font-sans text-sm md:text-base leading-relaxed">
          A showcase of high-performance architectural solutions and experimental interfaces. Each project represents a milestone in technical precision and aesthetic execution.
        </p>
      </section>

      {/* Dynamic Search and Filter Bar */}
      <div className="mb-12 glass-card p-4 rounded-xl max-w-4xl mx-auto" id="search-filter-controls">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#cbd5e1]" />
            <input
              type="text"
              placeholder="Query kernel (tags, title, systems...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#05070f]/60 text-white pl-10 pr-4 py-2 text-xs font-mono rounded-lg border border-white/10 focus:border-[#2dd4bf] focus:ring-1 focus:ring-[#2dd4bf] focus:outline-none transition-all"
              id="search-input-field"
            />
          </div>

          {/* Tags Filtering */}
          <div className="flex flex-wrap gap-2 items-center w-full md:w-auto overflow-x-auto py-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#cbd5e1] flex items-center gap-1 mr-1">
              <SlidersHorizontal className="w-3" /> Filters:
            </span>
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all uppercase ${
                selectedTag === null
                  ? "bg-[#2dd4bf]/20 text-[#2dd4bf] border border-[#2dd4bf]/50"
                  : "bg-white/5 text-[#cbd5e1] border border-white/10 hover:border-white/20"
              }`}
              id="filter-tag-all"
            >
              ALL_BUILDS
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all uppercase ${
                  selectedTag === tag
                    ? "bg-[#2dd4bf]/20 text-[#2dd4bf] border border-[#2dd4bf]/50"
                    : "bg-white/5 text-[#cbd5e1] border border-white/10 hover:border-[#14b8a6]/30"
                }`}
                id={`filter-tag-${tag.toLowerCase()}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vertical Stack of Glassmorphic Alternating Cards */}
      <div className="flex flex-col gap-12 relative max-w-5xl mx-auto">
        {/* Glow leaks */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-[#14b8a6]/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 -right-16 w-64 h-64 bg-[#2dd4bf]/80 blur-[120px] rounded-full opacity-10 pointer-events-none" />

        {/* Dynamic empty state */}
        {filteredProjects.length === 0 && (
          <div className="glass-card text-center py-16 rounded-xl border border-white/10">
            <Layers className="w-12 h-12 text-[#64748b] mx-auto mb-4 animate-bounce" />
            <h4 className="font-mono text-xs tracking-widest text-white uppercase mb-2">No matching systems identified</h4>
            <p className="text-xs text-[#cbd5e1]">Relax filters or redefine query syntax parameters.</p>
          </div>
        )}

        {filteredProjects.map((project, index) => {
          const isOdd = index % 2 !== 0;
          return (
            <div
              key={project.id}
              className={`glass-card inner-glow rounded-xl p-6 md:p-10 group hover:border-[#14b8a6]/40 transition-all duration-500 transform hover:-translate-y-1.5 flex flex-col ${
                isOdd ? "md:flex-row-reverse" : "md:flex-row"
              } gap-8 md:gap-12 items-center`}
              id={`project-card-${project.id}`}
            >
              {/* Graphic container with scaling image preview */}
              <div className="w-full md:w-1/2 aspect-video rounded-lg overflow-hidden relative border border-white/5 shadow-2xl">
                <img
                  src={project.imageUrl}
                  alt={project.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  id={`project-image-${project.id}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070f]/80 to-transparent" />
                <div className="absolute top-3 left-3 bg-[#05070f]/80 border border-white/10 px-2.5 py-1 rounded font-mono text-[9px] text-[#2dd4bf]">
                  CORE_MODULE_0{index + 1}
                </div>
              </div>

              {/* Text content details */}
              <div className="w-full md:w-1/2 space-y-5">
                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full border border-[#2dd4bf]/20 bg-[#2dd4bf]/5 font-mono text-[10px] text-[#2dd4bf]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="font-sans font-extrabold text-2xl md:text-3xl text-white tracking-tight leading-none">
                  {project.title}
                </h3>

                {/* Abstract */}
                <p className="text-[#cbd5e1] font-sans text-xs md:text-sm leading-relaxed text-justify">
                  {project.description}
                </p>

                {/* Micro Metric indicators */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {project.metrics.slice(0, 2).map((metric, mIdx) => (
                    <div key={mIdx} className="bg-white/5 border border-white/5 p-2 rounded">
                      <div className="font-mono text-[9px] tracking-wider text-[#64748b] uppercase">
                        {metric.label}
                      </div>
                      <div className="font-mono font-bold text-xs text-white">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action button to expand dynamic overview */}
                <div>
                  <button
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest text-[#14b8a6] hover:text-[#2dd4bf] group-hover:gap-3.5 transition-all text-left uppercase"
                    id={`trigger-modal-${project.id}`}
                  >
                    VIEW CASE STUDY
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
