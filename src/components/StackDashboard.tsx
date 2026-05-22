import { useState } from "react";
import { techStackData } from "../data";
import { Search } from "lucide-react";
import {
  SiTypescript, SiPython, SiCplusplus,
  SiReact, SiNodedotjs, SiPandas,
  SiDocker, SiGit,
  SiMongodb, SiFirebase, SiMysql,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

// Maps each stack item name → { icon, color }
const TECH_ICON_MAP: Record<string, { icon: React.ReactElement; color: string }> = {
  "TypeScript / JS":   { icon: <SiTypescript size={22} />,        color: "#3178C6" },
  "Python":            { icon: <SiPython size={22} />,             color: "#3776AB" },
  "C++ / C":           { icon: <SiCplusplus size={22} />,          color: "#00599C" },
  "React / Redux / Vue":{ icon: <SiReact size={22} />,             color: "#61DAFB" },
  "Node.js / Express": { icon: <SiNodedotjs size={22} />,          color: "#339933" },
  "Pandas / SciPy":    { icon: <SiPandas size={22} />,             color: "#150458" },
  "Docker / Compose":  { icon: <SiDocker size={22} />,             color: "#2496ED" },
  "AWS":               { icon: <FaAws size={22} />,                color: "#FF9900" },
  "Git / LATEX / Jest":{ icon: <SiGit size={22} />,                color: "#F05032" },
  "MongoDB / Realm":   { icon: <SiMongodb size={22} />,            color: "#47A248" },
  "Firebase / Firestore":{ icon: <SiFirebase size={22} />,         color: "#FFCA28" },
  "MySQL / GraphQL":   { icon: <SiMysql size={22} />,              color: "#4479A1" },
};

export default function StackDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = techStackData.filter((item) => {
    const matchesCategory = selectedCategory === "all" ? true : item.category === selectedCategory;
    const matchesSearch   = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12" id="stack-dashboard-container">

      {/* Title */}
      <section className="text-center">
        <h2 className="font-sans font-black text-4xl md:text-5xl text-[#14b8a6] mb-4 tracking-tight uppercase">
          DIKSHANT.STACK
        </h2>
        <p className="max-w-xl mx-auto text-[#cbd5e1] font-sans text-xs md:text-sm">
          Languages I think in. Frameworks I ship with. Infrastructure I trust in production.
        </p>
      </section>

      {/* Control Pane */}
      <div className="glass-card p-4 rounded-xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between" id="stack-search-bar">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#cbd5e1]" />
          <input
            type="text"
            placeholder="Search tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#05070f]/60 text-white pl-9 pr-4 py-2 text-xs font-mono rounded-lg border border-white/10 focus:border-[#2dd4bf] focus:outline-none"
            id="stack-search-input"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full md:w-auto overflow-x-auto">
          {["all", "languages", "frameworks", "infrastructure", "databases"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-mono tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#2dd4bf]/10 text-[#2dd4bf] border border-[#2dd4bf]/35 shadow-[0_0_15px_rgba(45,212,191,0.1)]"
                  : "bg-white/5 text-[#cbd5e1] border border-white/5 hover:border-white/10"
              }`}
              id={`filter-stack-btn-${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stack cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto" id="stack-items-grid">
        {filteredItems.map((item, idx) => {
          const techIcon = TECH_ICON_MAP[item.name];
          const iconColor = techIcon?.color ?? "#2dd4bf";

          return (
            <div
              key={idx}
              className="glass-card inner-glow p-5 rounded-xl border border-white/5 group hover:border-white/15 transition-all duration-300"
              style={{ "--icon-color": iconColor } as React.CSSProperties}
            >
              <div className="flex justify-between items-start mb-4">

                {/* Icon + name */}
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-xl flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${iconColor}18`,
                      border: `1px solid ${iconColor}30`,
                      color: iconColor,
                      boxShadow: `0 0 12px ${iconColor}18`,
                    }}
                  >
                    {techIcon?.icon ?? <span className="w-[22px] h-[22px] block" />}
                  </div>
                  <div>
                    <h4 className="font-mono font-bold text-sm text-white group-hover:text-white transition-colors leading-tight">
                      {item.name}
                    </h4>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#64748b]">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Proficiency badge */}
                <span
                  className="font-mono font-bold text-[10px] px-2 py-1 rounded-lg flex-shrink-0"
                  style={{
                    color: iconColor,
                    background: `${iconColor}12`,
                    border: `1px solid ${iconColor}25`,
                  }}
                >
                  {item.proficiency}%
                </span>
              </div>

              {/* Progress bar — colored with brand color */}
              <div className="w-full bg-[#05070f] h-1.5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${item.proficiency}%`,
                    background: `linear-gradient(90deg, ${iconColor}99, ${iconColor})`,
                    boxShadow: `0 0 8px ${iconColor}60`,
                  }}
                />
              </div>

              {/* Metric description */}
              <p className="text-[#cbd5e1] font-sans text-xs pt-3 border-t border-white/5 mt-3 leading-relaxed text-left flex items-start gap-1.5">
                <span style={{ color: iconColor }} className="select-none flex-shrink-0">▶</span>
                {item.metric}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
