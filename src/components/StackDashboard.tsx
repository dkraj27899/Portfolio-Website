import { useState } from "react";
import { techStackData } from "../data";
import { Sparkles, Terminal, Cpu, Database, Network, Search, Award } from "lucide-react";

export default function StackDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = techStackData.filter((item) => {
    const matchesCategory = selectedCategory === "all" ? true : item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "languages": return <Terminal className="w-4 h-4 text-[#5de6ff]" />;
      case "frameworks": return <Cpu className="w-4 h-4 text-[#d0bcff]" />;
      case "infrastructure": return <Network className="w-4 h-4 text-[#ffb869]" />;
      case "databases": return <Database className="w-4 h-4 text-[#e7e0ed]" />;
      default: return <Award className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className="space-y-12" id="stack-dashboard-container">
      {/* Title */}
      <section className="text-center">
        <h2 className="font-sans font-black text-4xl md:text-5xl text-[#d0bcff] mb-4 tracking-tight uppercase">
          DIKSHANT.STACK
        </h2>
        <p className="max-w-xl mx-auto text-[#cbc3d7] font-sans text-xs md:text-sm">
          A dynamic visual telemetry map displaying development competencies, verified compilation scores, and framework mastery indexes for Dikshant Raj Meena.
        </p>
      </section>

      {/* Control Pane */}
      <div className="glass-card p-4 rounded-xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between" id="stack-search-bar">
        {/* Search Input */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#cbc3d7]" />
          <input
            type="text"
            placeholder="Type language..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#15121b]/60 text-white pl-9 pr-4 py-2 text-xs font-mono rounded-lg border border-white/10 focus:border-[#5de6ff] focus:outline-none"
            id="stack-search-input"
          />
        </div>

        {/* Tab filters */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto overflow-x-auto">
          {["all", "languages", "frameworks", "infrastructure", "databases"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-mono tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#5de6ff]/10 text-[#5de6ff] border border-[#5de6ff]/35 shadow-[0_0_15px_rgba(93,230,255,0.1)]"
                  : "bg-white/5 text-[#cbc3d7] border border-white/5 hover:border-white/10"
              }`}
              id={`filter-stack-btn-${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto" id="stack-items-grid">
        {filteredItems.map((item, idx) => (
          <div 
            key={idx}
            className="glass-card inner-glow p-5 rounded-xl border border-white/5 group hover:border-[#5de6ff]/30 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/5 p-2 rounded-lg">
                  {getCategoryIcon(item.category)}
                </div>
                <div>
                  <h4 className="font-mono font-bold text-sm text-white group-hover:text-[#5de6ff] transition-colors">{item.name}</h4>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#958ea0]">{item.category}</span>
                </div>
              </div>
              <span className="font-mono font-bold text-xs text-[#5de6ff] bg-[#5de6ff]/5 px-2 py-1 rounded">
                COMPUTE_INDEX: {item.proficiency}%
              </span>
            </div>

            {/* Proficiency progress bar */}
            <div className="space-y-1">
              <div className="w-full bg-[#15121b] h-1.5 rounded-full overflow-hidden border border-white/5">
                <div 
                  className={`bg-gradient-to-r from-[#d0bcff] to-[#5de6ff] h-full rounded-full transition-all duration-1000`}
                  style={{ width: `${item.proficiency}%` }}
                />
              </div>
            </div>

            {/* Description list parameter details */}
            <p className="text-[#cbc3d7] font-sans text-xs pt-3 border-t border-white/5 mt-3 leading-relaxed text-left flex items-start gap-1.5">
              <span className="text-[#5de6ff] select-none">▶</span>
              {item.metric}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
