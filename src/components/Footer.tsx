interface FooterProps {
  setTab: (tab: string) => void;
}

export default function Footer({ setTab }: FooterProps) {
  return (
    <footer className="w-full py-16 bg-[#0f0d15] border-t border-[#494454]/20 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand/Subtitle with custom color scheme */}
        <div className="font-mono text-xs tracking-widest text-[#5de6ff] uppercase">
          DIKSHANT.CORE // ARCHITECTED FOR PERFORMANCE
        </div>

        {/* Action routing links */}
        <div className="flex gap-8 font-mono text-xs text-[#cbc3d7]">
          <button 
            onClick={() => setTab("stack")}
            className="hover:text-[#5de6ff] hover:underline transition-colors duration-300 uppercase cursor-pointer"
          >
            SOURCE
          </button>
          <a
            href="https://github.com/dkraj27899"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#5de6ff] hover:underline transition-colors duration-300 uppercase cursor-pointer"
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/dikshant-raj-meena-04a41b209/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#5de6ff] hover:underline transition-colors duration-300 uppercase cursor-pointer"
          >
            LINKEDIN
          </a>
          <a
            href="mailto:dkrajmeena27899@gmail.com"
            className="hover:text-[#5de6ff] hover:underline transition-colors duration-300 uppercase cursor-pointer"
          >
            CONTACT
          </a>
        </div>

        {/* Corporate copyright note */}
        <div className="text-[#958ea0] font-mono text-[11px]">
          © 2025 DIKSHANT RAJ MEENA
        </div>
      </div>
    </footer>
  );
}
