import { useState, useEffect } from "react";
import { Project } from "./types";
import Header from "./components/Header";
import IntroView from "./components/IntroView";
import ProjectList from "./components/ProjectList";
import CaseStudyModal from "./components/CaseStudyModal";
import StackDashboard from "./components/StackDashboard";
import NetworkHub from "./components/NetworkHub";
import ContactConsole from "./components/ContactConsole";
import TimelineView from "./components/TimelineView";
import Footer from "./components/Footer";
import BottomNavBar from "./components/BottomNavBar";
import CustomCursor from "./components/CustomCursor";
import BackgroundCanvas from "./components/BackgroundCanvas";

export default function App() {
  const [currentTab, setTab] = useState<string>("intro");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Mouse trajectory tracker for orbital glow effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="min-h-screen text-[#e2e8f0] font-sans selection:bg-[#14b8a6]/25 relative overflow-x-hidden flex flex-col justify-between"
      style={{ isolation: "isolate" }}
      id="app-root-shell"
    >
      {/* Mouse-tracking spotlight over the dot grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 700px at ${mousePosition.x}% ${mousePosition.y}%, rgba(20,184,166,0.055) 0%, transparent 70%)`,
          zIndex: 1,
        }}
      />

      {/* ── Layer 1: Particle constellation canvas ── */}
      <BackgroundCanvas />

      {/* ── Layer 2: Drifting ambient orbs ── */}
      <div className="orb-a  fixed top-[-180px] left-[-120px]  w-[620px] h-[620px] rounded-full bg-[#14b8a6]/7  blur-[180px] pointer-events-none" style={{ zIndex: 1 }} />
      <div className="orb-b  fixed top-[15%]   right-[-180px]  w-[480px] h-[480px] rounded-full bg-[#7c3aed]/4  blur-[160px] pointer-events-none" style={{ zIndex: 1 }} />
      <div className="orb-c  fixed bottom-[-80px] right-[10%]  w-[520px] h-[520px] rounded-full bg-[#2dd4bf]/5  blur-[170px] pointer-events-none" style={{ zIndex: 1 }} />
      <div className="orb-ar fixed top-[55%]   left-[-100px]   w-[380px] h-[380px] rounded-full bg-[#0ea5e9]/4  blur-[140px] pointer-events-none" style={{ zIndex: 1 }} />
      <div className="orb-br fixed top-[8%]    right-[22%]     w-[260px] h-[260px] rounded-full bg-[#14b8a6]/5  blur-[110px] pointer-events-none" style={{ zIndex: 1 }} />

      {/* ── Layer 3: Aurora sweep bands ── */}
      <div
        className="aurora-ltr fixed top-0 left-0 w-[38%] h-full pointer-events-none"
        style={{
          zIndex: 1,
          background: "linear-gradient(90deg, transparent 0%, rgba(45,212,191,0.035) 30%, rgba(20,184,166,0.055) 50%, rgba(45,212,191,0.035) 70%, transparent 100%)",
        }}
      />
      <div
        className="aurora-rtl fixed top-0 left-0 w-[32%] h-full pointer-events-none"
        style={{
          zIndex: 1,
          background: "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.025) 30%, rgba(45,212,191,0.04) 50%, rgba(124,58,237,0.025) 70%, transparent 100%)",
        }}
      />


      {/* Persistent High-Fidelity App Bar Header */}
      <Header currentTab={currentTab} setTab={setTab} />

      {/* Main Container Workspace */}
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex-1 relative" style={{ zIndex: 2 }}>
        {currentTab === "intro" && (
          <IntroView setTab={setTab} />
        )}

        {currentTab === "projects" && (
          <ProjectList onSelectProject={setSelectedProject} />
        )}

        {currentTab === "timeline" && (
          <TimelineView onSelectProject={setSelectedProject} />
        )}

        {currentTab === "stack" && (
          <StackDashboard />
        )}

        {currentTab === "network" && (
          <NetworkHub />
        )}

        {currentTab === "contact" && (
          <ContactConsole />
        )}
      </main>

      {/* Detailed Modal Case Study overlays */}
      {selectedProject && (
        <CaseStudyModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {/* Footer corporate references */}
      <div className="relative" style={{ zIndex: 2 }}>
        <Footer setTab={setTab} />
      </div>

      {/* Sticky Bottom Nav Bar (visible on mobile formats) */}
      <BottomNavBar currentTab={currentTab} setTab={setTab} />

      {/* Custom cursor — rendered above everything */}
      <CustomCursor />
    </div>
  );
}
