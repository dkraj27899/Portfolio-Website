import { motion } from "motion/react";
import { projectsData } from "../data";

export default function TimelineView({ 
  onSelectProject 
}: { 
  onSelectProject: (project: import("../types").Project) => void 
}) {
  return (
    <div className="flex-1 overflow-y-auto pt-8 md:pt-12 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-b border-white/10 pb-4"
        >
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 bg-[#2dd4bf] animate-pulse"></div>
            <h2 className="font-mono text-xs tracking-wider text-[#2dd4bf]">SYS.TIMELINE</h2>
          </div>
          <h1 className="text-2xl font-mono text-[#14b8a6] mt-2">CHRONOLOGICAL HISTORY</h1>
          <p className="text-[#cbd5e1] font-mono text-xs mt-2 uppercase">Custom SVG visualization of deployment phases</p>
        </motion.div>

        <div className="relative ml-4 md:ml-8">
           {/* Continuous background line segment */}
           <div className="absolute left-0 top-6 bottom-0 w-px bg-white/10 border-l border-dashed border-white/20" />

          <div className="relative z-10 w-full">
            {projectsData.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="mb-16 relative group"
              >
                {/* SVG Node graphic placed precisely on the timeline axis */}
                <div className="absolute -left-[16px] top-1.5 w-[32px] h-[32px]">
                   <svg width="32" height="32" viewBox="0 0 32 32" className="overflow-visible">
                      <circle cx="16" cy="16" r="14" fill="rgba(93, 230, 255, 0.1)" className="animate-ping" style={{ transformOrigin: "center" }}/>
                      <circle cx="16" cy="16" r="6" fill="#15121b" stroke="#2dd4bf" strokeWidth="2" className="transition-transform duration-300 group-hover:scale-125" style={{ transformOrigin: "center" }}/>
                      <circle cx="16" cy="16" r="2.5" fill="#14b8a6" className="transition-transform duration-300 group-hover:scale-110" style={{ transformOrigin: "center" }}/>
                   </svg>
                </div>

                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 pl-12 md:pl-16">
                  <div className="w-48 flex-shrink-0 pt-2 relative">
                    <div className="font-mono text-sm text-[#2dd4bf] relative inline-block">
                       {project.date}
                       {/* Contextual SVG data connector line */}
                       <svg className="absolute -left-12 top-2.5 w-10 h-0.5" preserveAspectRatio="none">
                          <line x1="0" y1="0" x2="100%" y2="0" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.4" />
                       </svg>
                    </div>
                    <div className="font-mono text-[10px] text-[#cbd5e1] mt-1 uppercase tracking-widest">Phase {projectsData.length - index}</div>
                  </div>
                  
                  <div 
                    className="flex-1 bg-[#111827]/40 backdrop-blur-md border border-white/5 p-6 hover:border-[#2dd4bf]/50 hover:bg-[#111827]/80 transition-all cursor-pointer rounded-sm"
                    onClick={() => onSelectProject(project)}
                  >
                    <h3 className="font-mono text-lg text-[#14b8a6] mb-2 group-hover:text-[#2dd4bf] transition-colors">{project.title}</h3>
                    <p className="font-sans text-sm text-[#cbd5e1] mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-[#15121b] border border-white/10 font-mono text-[10px] text-[#cbd5e1] uppercase rounded-sm">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 bg-[#15121b] border border-white/10 font-mono text-[10px] text-[#cbd5e1] uppercase rounded-sm">
                          +{project.tags.length - 3} MORE
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* End marker spacer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: projectsData.length * 0.15 }}
              className="relative mt-8"
            >
               <div className="absolute -left-[16px] -top-2 w-[32px] h-[32px]">
                   <svg width="32" height="32" viewBox="0 0 32 32">
                      <rect x="12" y="12" width="8" height="8" fill="#15121b" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                   </svg>
               </div>
              <div className="pl-12 md:pl-16 font-mono text-xs text-[#cbd5e1] uppercase tracking-widest pt-1">INITIALIZATION ROOT</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
