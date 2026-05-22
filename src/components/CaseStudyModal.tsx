import { useState, useEffect, useRef } from "react";
import { Project, Node } from "../types";
import { 
  X, 
  Cpu, 
  Terminal, 
  Server, 
  RefreshCcw, 
  Layers, 
  CheckCircle, 
  Activity, 
  Network, 
  ShieldAlert,
  Zap,
  Check
} from "lucide-react";

interface CaseStudyModalProps {
  project: Project;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  // Simulator active node state
  const [selectedNode, setSelectedNode] = useState<Node | null>(project.architecture.nodes[0] || null);
  // Terminal Logs state
  const [liveLogs, setLiveLogs] = useState<string[]>(project.systemLogs);
  const [isRebooting, setIsRebooting] = useState(false);
  // Realtime fluctuating metrics state
  const [cpuLoad, setCpuLoad] = useState(48);
  const [fpsVal, setFpsVal] = useState(60);
  const [currentLatency, setCurrentLatency] = useState(1.2);

  const logsEndRef = useRef<HTMLDivElement>(null);

  // Fluctuating real-time telemetry noise
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuLoad((prev) => {
        const noise = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(12, Math.min(96, prev + noise));
      });
      setFpsVal((prev) => {
        const noise = Math.random() > 0.85 ? -1 : 0; // standard 60fps with occasional tiny jitter
        return Math.max(58, Math.min(60, prev + noise));
      });
      setCurrentLatency((_) => {
        const base = parseFloat(project.metrics[1]?.value || "1.2");
        const noise = (Math.random() - 0.5) * 0.4;
        return parseFloat(Math.max(0.1, base + noise).toFixed(2));
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [project]);

  // Scroll terminal logs to bottom on changes
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [liveLogs]);

  // Simulated Reboot Command sequence
  const handleRebootPipeline = () => {
    setIsRebooting(true);
    setLiveLogs(["SECURE SHELL INITIALIZING...", "STOPPING CORE CLUSTER INSTANCES..."]);
    
    setTimeout(() => {
      setLiveLogs((prev) => [...prev, "DE-ALLOCATING PERSISTENT HEAP ALLOCATIONS...", "CLEARING VIRTUAL FRAME REGISTERS..."]);
    }, 800);

    setTimeout(() => {
      setLiveLogs((prev) => [...prev, "SUCCESS: SHUTDOWN COMPLETE.", "DOCKER_POD COMPILE: RUNNING SYSTEM PRE-FLIGHT VERIFICATION..."]);
    }, 1400);

    setTimeout(() => {
      setLiveLogs((prev) => [
        ...prev, 
        "LAUNCHING KERNEL STACK THREADS...", 
        ...project.systemLogs.slice(0, 3)
      ]);
      setIsRebooting(false);
    }, 2200);
  };

  // Node helper icons mapping
  const getNodeIcon = (type: string) => {
    switch (type) {
      case "user": return <Activity className="w-4.5 h-4.5 text-[#2dd4bf]" />;
      case "balancer": return <RefreshCcw className="w-4.5 h-4.5 text-[#f59e0b]" />;
      case "gateway": return <Network className="w-4.5 h-4.5 text-[#14b8a6]" />;
      case "cache": return <Layers className="w-4.5 h-4.5 text-[#2dd4bf]" />;
      case "database": return <Server className="w-4.5 h-4.5 text-[#14b8a6]" />;
      default: return <Cpu className="w-4.5 h-4.5 text-white" />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
      id="case-study-modal-container"
    >
      <div 
        className="glass-card inner-glow w-full max-w-5xl rounded-2xl relative shadow-[0_0_50px_rgba(20,184,166,0.25)] flex flex-col max-h-[90vh] overflow-hidden animate-zoom-in"
        id="case-study-modal-viewport"
      >
        {/* Header Ribbon */}
        <div className="flex justify-between items-center border-b border-white/10 px-6 py-4 bg-[#05070f]/80">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#14b8a6] rounded-full" />
            <h4 className="font-sans font-black text-white text-base md:text-lg uppercase tracking-tight">
              Case Study // {project.title}
            </h4>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-[#cbd5e1] hover:text-white hover:bg-white/5 border border-white/5 transition-colors"
            id="close-modal-trigger"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Content Body Pane (Scrollable) */}
        <div className="overflow-y-auto flex-1 p-6 md:p-8 space-y-8">
          
          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left side: descriptions & core parameters */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Aspect thumbnail */}
              <div className="aspect-video w-full rounded-xl overflow-hidden relative border border-white/10">
                <img 
                  src={project.imageUrl} 
                  alt={project.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {project.tags.slice(0, 4).map(t => (
                    <span key={t} className="px-2.5 py-0.5 rounded bg-black/80 border border-white/10 text-[9px] font-mono tracking-wide text-[#2dd4bf]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core Descriptions */}
              <div className="space-y-4">
                <h5 className="font-mono text-xs tracking-widest text-[#14b8a6] uppercase">SYSTEM_OVERVIEW</h5>
                <h3 className="font-sans font-extrabold text-[#2dd4bf] text-2xl leading-tight">
                  {project.title} Architecture Overview
                </h3>
                <p className="text-[#cbd5e1] font-sans text-xs md:text-sm leading-relaxed text-justify">
                  {project.longDescription}
                </p>
              </div>

              {/* Advanced Performance Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-white/[0.02] border border-white/5 p-3 rounded-lg flex flex-col justify-between">
                    <span className="font-mono text-[9px] text-[#64748b] tracking-wider uppercase leading-none mb-2">
                      {metric.label}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono font-bold text-sm text-white">
                        {metric.value}
                      </span>
                      {metric.trend === "up" && (
                        <span className="text-[10px] text-[#2dd4bf] font-sans">▲</span>
                      )}
                      {metric.trend === "down" && (
                        <span className="text-[10px] text-[#f59e0b] font-sans">▼</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right side: visual metrics gauge & benchmark indices */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Benchmark Score Tracker widget */}
              <div className="bg-[#0b1120]/60 border border-white/5 p-5 rounded-xl flex items-center justify-between gap-4">
                <div>
                  <h5 className="font-mono text-[10px] text-[#14b8a6] tracking-widest uppercase mb-1">BENCHMARK_SCORE</h5>
                  <h4 className="font-sans font-extrabold text-xl text-white">OPTIMIZATION_RATING</h4>
                  <p className="text-[10px] text-[#cbd5e1] mt-1">Calculated via memory throughput allocation protocols.</p>
                </div>
                <div className="relative flex items-center justify-center w-20 h-20 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="34" className="stroke-white/5 fill-none" strokeWidth="4" />
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="34" 
                      className="stroke-[#2dd4bf] fill-none transition-all duration-1000" 
                      strokeWidth="4" 
                      strokeDasharray="213" 
                      strokeDashoffset={213 - (213 * project.benchmarkScore) / 100}
                    />
                  </svg>
                  <span className="absolute font-mono font-bold text-xs text-white">
                    {project.benchmarkScore}%
                  </span>
                </div>
              </div>

              {/* Dynamic live Telemetry panel */}
              <div className="glass-card inner-glow p-5 rounded-xl space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <h6 className="font-mono text-[10px] text-[#2dd4bf] tracking-widest uppercase flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 animate-pulse text-[#2dd4bf]" /> LIVE_DIAGNOSTICS
                  </h6>
                  <span className="font-mono text-[9px] text-[#64748b] tracking-wider uppercase">V-HOST RUNNING</span>
                </div>
                
                <div className="space-y-3 font-mono text-xs">
                  {/* CPU Load bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-[#cbd5e1]">PROCESSOR THREAD</span>
                      <span className="text-white font-bold">{cpuLoad}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-[#14b8a6] to-[#2dd4bf] h-full transition-all duration-300"
                        style={{ width: `${cpuLoad}%` }}
                      />
                    </div>
                  </div>

                  {/* Latency meter */}
                  <div className="flex justify-between border-b border-white/5 py-1 text-[10px]">
                    <span className="text-[#cbd5e1]">CLUSTER TELEMETRY JITTER</span>
                    <span className="text-white font-bold">{(currentLatency * 0.1).toFixed(3)}ms</span>
                  </div>

                  {/* Render FPS meter */}
                  <div className="flex justify-between py-1 text-[10px]">
                    <span className="text-[#cbd5e1]">STABILITY MARGIN (REFRESH RATE)</span>
                    <span className="text-[#2dd4bf] font-bold">{fpsVal}fps</span>
                  </div>
                </div>
              </div>

              {/* Interactive Topology Graph Component */}
              <div className="glass-card inner-glow p-5 rounded-xl space-y-4" id="topology-visualizer">
                <div className="flex justify-between items-center">
                  <h6 className="font-mono text-[10px] text-white tracking-widest uppercase flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-[#f59e0b]" /> INTERACTIVE_TOPOLOGY_GRAPH
                  </h6>
                  <span className="text-[9px] font-mono text-[#64748b]">SELECT NODE TO INSPECT</span>
                </div>

                {/* Vertical Interactive Node Stack */}
                <div className="space-y-2 pt-1">
                  {project.architecture.nodes.map((node) => (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`p-2.5 rounded border text-left cursor-pointer transition-all flex items-center justify-between ${
                        selectedNode?.id === node.id
                          ? "bg-[#2dd4bf]/5 border-[#2dd4bf]/60"
                          : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="bg-white/5 p-1.5 rounded">
                          {getNodeIcon(node.type)}
                        </div>
                        <div>
                          <div className="font-mono text-xs text-white leading-none mb-1">{node.name}</div>
                          <div className="font-mono text-[9px] text-[#64748b] uppercase leading-none">{node.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] animate-pulse" />
                        <span className="font-mono text-[8px] text-[#64748b]">ACTIVE</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expanded Node Spec sheet panel */}
                {selectedNode && (
                  <div className="bg-[#05070f]/80 border border-white/5 p-3 rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] text-[#2dd4bf] uppercase tracking-wider font-bold">NODE_SPEC_DATA</span>
                      <span className="font-mono text-[8px] text-white/55">HEALTH: 100%</span>
                    </div>
                    <div className="font-mono text-[11px] space-y-1">
                      <div><span className="text-[#64748b]">MODULE:</span> <span className="text-white">{selectedNode.name}</span></div>
                      <div><span className="text-[#64748b]">OBJECT ID:</span> <span className="text-[#f59e0b] text-[10px]">{selectedNode.id}</span></div>
                      <div><span className="text-[#64748b]">ALLOCATION:</span> <span className="text-white uppercase text-[10px]">{selectedNode.type} layer</span></div>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>

          {/* Diagnostic System console simulator */}
          <div className="glass-card inner-glow p-5 rounded-xl space-y-3" id="diagnostics-terminal">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#14b8a6]" />
                <h5 className="font-mono text-xs tracking-wider text-white uppercase">SYSTEM_DIAGNOSTICS_SHELL</h5>
              </div>
              <button 
                onClick={handleRebootPipeline}
                disabled={isRebooting}
                className="flex items-center gap-1 px-3 py-1 font-mono text-[9px] text-[#2dd4bf] bg-[#2dd4bf]/5 border border-[#2dd4bf]/20 rounded hover:bg-[#2dd4bf]/10 disabled:opacity-40 transition-colors uppercase cursor-pointer"
              >
                <RefreshCcw className={`w-3 h-3 ${isRebooting ? "animate-spin" : ""}`} /> Reboot Pipeline
              </button>
            </div>

            <div className="bg-[#030509] p-4 rounded border border-white/5 h-48 overflow-y-auto font-mono text-[11px] leading-relaxed text-[#2dd4bf]/90 space-y-1">
              {liveLogs.map((log, lIdx) => (
                <div key={lIdx} className="flex gap-2.5 items-start">
                  <span className="text-[#64748b] select-none">[{lIdx + 1}]</span>
                  <p className="text-left text-[#2dd4bf]">{log}</p>
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>

        </div>

        {/* Footer Ribbon */}
        <div className="flex justify-end gap-3 border-t border-white/10 px-6 py-4 bg-[#05070f]/80">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded border border-white/10 text-[#cbd5e1] font-mono text-xs hover:border-white/20 hover:text-white transition-colors uppercase cursor-pointer"
            id="close-modal-footer-btn"
          >
            DISMISS_TERM
          </button>
        </div>
      </div>
    </div>
  );
}
