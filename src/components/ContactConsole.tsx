import { useState } from "react";
import { Send, CheckCircle, MessageSquare, AlertCircle } from "lucide-react";

export default function ContactConsole() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("Job Opportunity");
  const [message, setMessage] = useState("");
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionSuccess, setTransmissionSuccess] = useState(false);
  const [transmissionError, setTransmissionError] = useState(false);

  const handleTransmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsTransmitting(true);
    setTransmissionError(false);

    const body = new URLSearchParams({
      "form-name": "contact",
      name,
      subject,
      message,
    }).toString();

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (res.ok) {
        setTransmissionSuccess(true);
      } else {
        setTransmissionError(true);
      }
    } catch {
      setTransmissionError(true);
    } finally {
      setIsTransmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setMessage("");
    setTransmissionSuccess(false);
    setTransmissionError(false);
  };

  return (
    <div className="space-y-12" id="contact-console-container">
      <section className="text-center">
        <h2 className="font-sans font-black text-4xl md:text-5xl text-[#14b8a6] mb-4 tracking-tight uppercase">
          CONTACT ME
        </h2>
        <p className="max-w-xl mx-auto text-[#cbd5e1] font-sans text-xs md:text-sm">
          Send me a direct message for job opportunities, freelance work, or just to network.
        </p>
      </section>

      <div className="max-w-2xl mx-auto">
        <div className="glass-card inner-glow p-6 md:p-8 rounded-2xl border border-white/5 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <MessageSquare className="w-5 h-5 text-[#2dd4bf]" />
            <div>
              <h4 className="font-sans font-extrabold text-[#cbd5e1] text-sm md:text-base uppercase">Get In Touch</h4>
              <p className="text-[10px] text-[#64748b] font-mono">I usually respond within 24 hours.</p>
            </div>
          </div>

          {transmissionSuccess ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle className="w-12 h-12 text-[#2dd4bf] mx-auto animate-bounce" />
              <h4 className="font-sans font-bold text-sm tracking-widest text-[#2dd4bf] uppercase">Message Received</h4>
              <p className="text-xs text-[#cbd5e1]">Thanks for reaching out! I'll get back to you within 24 hours.</p>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-xs font-bold tracking-wider uppercase text-white hover:text-[#2dd4bf] bg-white/5 border border-white/10 rounded-lg hover:border-[#2dd4bf]/30 transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleTransmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-[#64748b] tracking-wider uppercase">YOUR NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#05070f] text-white px-4 py-2.5 text-xs font-sans rounded-lg border border-white/10 focus:border-[#2dd4bf] focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-[#64748b] tracking-wider uppercase">SUBJECT</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#05070f] text-white px-4 py-2.5 text-xs font-sans rounded-lg border border-white/10 focus:border-[#2dd4bf] focus:outline-none transition-all"
                >
                  <option value="Job Opportunity">Job Opportunity</option>
                  <option value="Freelance Project">Freelance Project</option>
                  <option value="Networking">Networking / General Inquiry</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-[#64748b] tracking-wider uppercase">MESSAGE *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Hi Dikshant, I'd like to discuss..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#05070f] text-white p-4 text-xs font-sans rounded-lg border border-white/10 focus:border-[#2dd4bf] focus:outline-none transition-all resize-none"
                />
              </div>

              {transmissionError && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-mono">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  Transmission failed. Please try again or email me directly at dkrajmeena27899@gmail.com
                </div>
              )}

              <button
                type="submit"
                disabled={isTransmitting}
                className="w-full bg-gradient-to-r from-[#14b8a6] to-[#2dd4bf] text-[#05070f] hover:opacity-95 text-xs font-bold tracking-widest py-3 rounded-lg flex items-center justify-center gap-2 uppercase disabled:opacity-40 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                {isTransmitting ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
