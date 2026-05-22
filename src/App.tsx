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
      className="min-h-screen bg-[#05070f] text-[#e2e8f0] font-sans selection:bg-[#14b8a6]/25 relative overflow-x-hidden flex flex-col justify-between"
      style={{
        backgroundImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(20, 184, 166, 0.04) 0%, transparent 45%)`
      }}
      id="app-root-shell"
    >
      {/* Dynamic Background Blurs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#14b8a6]/5 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />
      <div className="absolute top-[40%] right-[-200px] w-[600px] h-[600px] bg-[#f59e0b]/4 rounded-full blur-[180px] animate-pulse-slow pointer-events-none" />

      {/* Persistent High-Fidelity App Bar Header */}
      <Header currentTab={currentTab} setTab={setTab} />

      {/* Main Container Workspace */}
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex-1">
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
      <Footer setTab={setTab} />

      {/* Sticky Bottom Nav Bar (visible on mobile formats) */}
      <BottomNavBar currentTab={currentTab} setTab={setTab} />
    </div>
  );
}
