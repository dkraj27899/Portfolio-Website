import { useState, useEffect } from "react";
import { networkHostsData } from "../data";
import { NetworkHost } from "../types";
import { 
  Network, 
  Server, 
  Activity, 
  RefreshCw, 
  Layers, 
  AlertTriangle, 
  CheckCircle,
  ShieldCheck,
  Zap,
  Cpu,
  CornerDownRight
} from "lucide-react";

export default function NetworkHub() {
  const [hosts, setHosts] = useState<NetworkHost[]>(networkHostsData);
  const [selectedHost, setSelectedHost] = useState<NetworkHost | null>(networkHostsData[0]);
  const [tracerouteLogs, setTracerouteLogs] = useState<string[]>([]);
  const [isTracing, setIsTracing] = useState(false);
  const [networkLatency, setNetworkLatency] = useState(25); // global lat avg

  // Fluctuations of ping rates and loads
  useEffect(() => {
    const timer = setInterval(() => {
      setHosts((prevHosts) =>
        prevHosts.map((host) => {
          if (host.status === "offline") return host;

          const cpuDelta = Math.floor(Math.random() * 7) - 3; // -3 to +3
          const pingDelta = Math.floor(Math.random() * 5) - 2; // -2 to +2

          return {
            ...host,
            cpuLoad: Math.max(5, Math.min(98, host.cpuLoad + cpuDelta)),
            pingTime: Math.max(2, Math.min(220, host.pingTime + pingDelta)),
          };
        })
      );

      setNetworkLatency((prev) => {
        const jitter = Math.floor(Math.random() * 3) - 1;
        return Math.max(10, Math.min(65, prev + jitter));
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  // Update selected host details matching active list changes
  useEffect(() => {
    if (selectedHost) {
      const liveVer = hosts.find((h) => h.id === selectedHost.id);
      if (liveVer) setSelectedHost(liveVer);
    }
  }, [hosts]);

  // Handle Trace Route command simulation
  const handleTraceroute = (host: NetworkHost) => {
    if (isTracing) return;
    setIsTracing(true);
    setTracerouteLogs([
      `TRACEROUTE: Resolving DNS target route to host [${host.name}]...`,
      `IP ADDRESS: Dynamic resolution identified target IP [${host.ip}]`
    ]);

    let stepNum = 1;
    const interval = setInterval(() => {
      let logLine = "";
      if (stepNum === 1) {
        logLine = `HOP 1: Local gateway (10.0.0.1)  -->  Latency: ${Math.floor(Math.random() * 3) + 1}ms`;
      } else if (stepNum === 2) {
        logLine = `HOP 2: Regional Cloud router (172.16.1.1)  -->  Latency: ${Math.floor(Math.random() * 8) + 3}ms`;
      } else if (stepNum === 3) {
        logLine = `HOP 3: Primary ISP Backbone (203.0.113.88)  -->  Latency: ${Math.floor(Math.random() * 12) + 10}ms`;
      } else if (stepNum === 4) {
        logLine = `HOP 4: Regional Edge Balancer -- Routing boundary reached  |  Load: ${host.cpuLoad}%`;
      } else if (stepNum === 5) {
        logLine = `SUCCESS: Route completed in 5 Hops. Connection stabilized. [Ping: ${host.pingTime}ms]`;
        clearInterval(interval);
        setIsTracing(false);
      }

      setTracerouteLogs((prev) => [...prev, logLine]);
      stepNum++;
    }, 600);
  };

  // Initial trigger
  useEffect(() => {
    if (selectedHost) {
      handleTraceroute(selectedHost);
    }
  }, [selectedHost?.id]);

  return (
    <div className="space-y-12" id="network-hub-container">
      {/* Visual Title */}
      <section className="text-center">
        <h2 className="font-sans font-black text-4xl md:text-5xl text-[#14b8a6] mb-4 tracking-tight uppercase">
          DIKSHANT.NETWORK
        </h2>
        <p className="max-w-xl mx-auto text-[#cbd5e1] font-sans text-xs md:text-sm">
          Active representation of globally dispersed node clusters. Displays server specifications, region availability ratings, and dynamic traceroute diagnostics.
        </p>
      </section>

      {/* Primary diagnostic gauges ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        <div className="bg-[#0b1120]/60 border border-white/5 p-4 rounded-xl">
          <span className="font-mono text-[9px] tracking-wider text-[#64748b] uppercase">AVERAGE_LATENCY</span>
          <h3 className="font-mono text-xl md:text-2xl text-[#2dd4bf] font-bold mt-1">{networkLatency} ms</h3>
          <p className="text-[10px] text-[#cbd5e1] mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3" /> Optimum stability index
          </p>
        </div>

        <div className="bg-[#0b1120]/60 border border-white/5 p-4 rounded-xl">
          <span className="font-mono text-[9px] tracking-wider text-[#64748b] uppercase">ACTIVE_REGIONS</span>
          <h3 className="font-mono text-xl md:text-2xl text-white font-bold mt-1">5 / 6 ONLINE</h3>
          <p className="text-[10px] text-[#cbd5e1] mt-1 flex items-center gap-1 text-[#f59e0b]">
            <AlertTriangle className="w-3 text-[#f59e0b]" /> Cape Town offline
          </p>
        </div>

        <div className="bg-[#0b1120]/60 border border-white/5 p-4 rounded-xl">
          <span className="font-mono text-[9px] tracking-wider text-[#64748b] uppercase">GLOBAL_FIREWALL</span>
          <h3 className="font-mono text-xl md:text-2xl text-[#14b8a6] font-bold mt-1">ENCRYPTED</h3>
          <p className="text-[10px] text-white/55 mt-1">Zero Trust TLS 1.3 tunnels</p>
        </div>

        <div className="bg-[#0b1120]/60 border border-white/5 p-4 rounded-xl">
          <span className="font-mono text-[9px] tracking-wider text-[#64748b] uppercase">PACKET_LOSS_RATING</span>
          <h3 className="font-mono text-xl md:text-2xl text-[#2dd4bf] font-bold mt-1">0.02%</h3>
          <p className="text-[10px] text-[#cbd5e1] mt-1">Optimized traffic structures</p>
        </div>
      </div>

      {/* Main interactive window split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
        {/* Left column: Server node units selector */}
        <div className="lg:col-span-6 space-y-4">
          <h4 className="font-mono text-xs tracking-widest text-[#14b8a6] uppercase pl-1">VIRTUAL_SERVER_HOSTS</h4>
          
          <div className="space-y-3" id="server-nodes-list">
            {hosts.map((host) => (
              <div
                key={host.id}
                onClick={() => setSelectedHost(host)}
                className={`glass-card inner-glow p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 flex items-center justify-between ${
                  selectedHost?.id === host.id
                    ? "bg-[#2dd4bf]/5 border-[#2dd4bf]/60 shadow-[0_0_20px_rgba(45,212,191,0.08)]"
                    : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white/5 p-2 rounded-lg">
                    <Server className={`w-4 h-4 ${host.status === 'online' ? 'text-[#2dd4bf]' : host.status === 'degraded' ? 'text-[#f59e0b]' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <h5 className="font-mono font-bold text-xs text-white leading-none mb-1.5">{host.name}</h5>
                    <span className="font-mono text-[9px] text-[#64748b] bg-white/5 px-1.5 py-0.5 rounded mr-1">
                      {host.region}
                    </span>
                    <span className="font-mono text-[9px] text-white/45">{host.ip}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider ${
                    host.status === 'online' ? 'text-[#2dd4bf]' : host.status === 'degraded' ? 'text-[#f59e0b]' : 'text-[#ffb4ab]'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      host.status === 'online' ? 'bg-[#2dd4bf] animate-pulse' : host.status === 'degraded' ? 'bg-[#f59e0b]' : 'bg-[#ffb4ab]'
                    }`} />
                    {host.status}
                  </span>
                  {host.status !== "offline" && (
                    <div className="text-[10px] font-mono text-white/45 mt-1">
                      PING: {host.pingTime}ms
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Diagnostic console view */}
        <div className="lg:col-span-6 space-y-4">
          <h4 className="font-mono text-xs tracking-widest text-[#14b8a6] uppercase pl-1">DIAGNOSTICS_VIEW_PORT</h4>

          {selectedHost ? (
            <div className="glass-card inner-glow p-6 rounded-2xl border border-white/5 space-y-6 flex flex-col h-full justify-between" id="selected-server-card">
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-white/5 pb-4">
                  <div>
                    <span className="font-mono text-[9px] text-[#2dd4bf] uppercase tracking-widest font-bold">NODE ID: {selectedHost.id}</span>
                    <h3 className="font-sans font-extrabold text-[#14b8a6] text-xl md:text-2xl mt-1">{selectedHost.name}</h3>
                  </div>
                  <button
                    onClick={() => handleTraceroute(selectedHost)}
                    disabled={isTracing || selectedHost.status === "offline"}
                    className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-[9px] text-[#2dd4bf] bg-[#2dd4bf]/5 border border-[#2dd4bf]/25 rounded hover:bg-[#2dd4bf]/10 disabled:opacity-40 transition-colors uppercase cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 ${isTracing ? "animate-spin" : ""}`} /> Trace Path
                  </button>
                </div>

                {/* Subspecs */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 bg-[#05070f]/80 border border-white/5 p-3 rounded-lg">
                    <div className="flex justify-between text-[10px] font-mono text-[#64748b] mb-1">
                      <span>AVERAGE CPU LOAD</span>
                      <span className="text-white font-bold">{selectedHost.cpuLoad}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#2dd4bf] h-full transition-all duration-300" style={{ width: `${selectedHost.cpuLoad}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1 bg-[#05070f]/80 border border-white/5 p-3 rounded-lg">
                    <div className="flex justify-between text-[10px] font-mono text-[#64748b] mb-1">
                      <span>MEMORY ALLOCATION</span>
                      <span className="text-white font-bold">{selectedHost.memoryLoad}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#14b8a6] h-full transition-all duration-300" style={{ width: `${selectedHost.memoryLoad}%` }} />
                    </div>
                  </div>
                </div>

                {/* Traceroute loop terminal */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-[#cbd5e1] tracking-wider uppercase">DYNAMIC TRACEROUTE KERNEL</span>
                    <span className="font-mono text-[8px] text-[#64748b]">STABLE CONNECTION</span>
                  </div>

                  <div className="bg-[#030509] p-4 rounded-xl border border-white/5 h-48 overflow-y-auto font-mono text-[10.5px] leading-relaxed text-[#2dd4bf] space-y-2">
                    {tracerouteLogs.map((log, lIdx) => (
                      <div key={lIdx} className="flex gap-1.5 items-start">
                        <CornerDownRight className="w-3 h-3 text-[#cbd5e1]/60 mt-0.5 flex-shrink-0" />
                        <p className="text-left">{log}</p>
                      </div>
                    ))}
                    {selectedHost.status === "offline" && (
                      <div className="text-[#ffb4ab] text-center py-8">
                        <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-[#ffb4ab]" />
                        ROUTE_FAILURE: Host unreachable. Target packets returned empty.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono text-[#cbd5e1] text-left pt-2 border-t border-white/5 mt-4">
                IP Stack coordinates mapping through private virtual switches.
              </div>
            </div>
          ) : (
            <div className="glass-card text-center py-16 rounded-2xl border border-white/10 flex items-center justify-center">
              <span className="text-[#cbd5e1] font-mono text-xs">No host module targeted. Choose server node.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
