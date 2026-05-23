import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);

  // Dot follows fast
  const dotX = useSpring(rawX, { stiffness: 900, damping: 38, mass: 0.18 });
  const dotY = useSpring(rawY, { stiffness: 900, damping: 38, mass: 0.18 });

  // Ring lags behind for the trailing effect
  const ringX = useSpring(rawX, { stiffness: 160, damping: 24, mass: 0.7 });
  const ringY = useSpring(rawY, { stiffness: 160, damping: 24, mass: 0.7 });

  // Outer aura lags even more
  const auraX = useSpring(rawX, { stiffness: 80, damping: 20, mass: 1.2 });
  const auraY = useSpring(rawY, { stiffness: 80, damping: 20, mass: 1.2 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.closest('a, button, [role="button"], .cursor-pointer, input, textarea, select')) {
        setHovered(true);
      }
    };

    const out = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.closest('a, button, [role="button"], .cursor-pointer, input, textarea, select')) {
        setHovered(false);
      }
    };

    const down = () => setClicked(true);
    const up   = () => setClicked(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove",  move);
    window.addEventListener("mouseover",  over);
    window.addEventListener("mouseout",   out);
    window.addEventListener("mousedown",  down);
    window.addEventListener("mouseup",    up);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove",  move);
      window.removeEventListener("mouseover",  over);
      window.removeEventListener("mouseout",   out);
      window.removeEventListener("mousedown",  down);
      window.removeEventListener("mouseup",    up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, [rawX, rawY, visible]);

  if (!visible) return null;

  return (
    <>
      {/* ── Aura blob — slowest trail ── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9997] rounded-full"
        style={{
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(45,212,191,0.08) 0%, transparent 70%)",
        }}
        animate={{
          width:   hovered ? 90  : 64,
          height:  hovered ? 90  : 64,
          opacity: hovered ? 1   : 0.6,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* ── Outer ring — medium lag ── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width:  hovered ? 48 : clicked ? 22 : 34,
          height: hovered ? 48 : clicked ? 22 : 34,
          opacity: visible ? (hovered ? 1 : 0.65) : 0,
          border: hovered
            ? "1.5px solid rgba(45,212,191,0.95)"
            : "1.5px solid rgba(45,212,191,0.5)",
          boxShadow: hovered
            ? "0 0 16px rgba(45,212,191,0.5), 0 0 32px rgba(45,212,191,0.2), inset 0 0 8px rgba(45,212,191,0.08)"
            : clicked
            ? "0 0 20px rgba(45,212,191,0.7)"
            : "0 0 8px rgba(45,212,191,0.2)",
          scale: clicked ? 0.75 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* ── Inner dot — snappy ── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          background: hovered
            ? "rgba(45,212,191,0.35)"
            : "#2dd4bf",
        }}
        animate={{
          width:  hovered ? 14 : clicked ? 12 : 7,
          height: hovered ? 14 : clicked ? 12 : 7,
          opacity: visible ? 1 : 0,
          boxShadow: clicked
            ? "0 0 16px rgba(45,212,191,1), 0 0 32px rgba(45,212,191,0.5)"
            : hovered
            ? "0 0 10px rgba(45,212,191,0.4)"
            : "0 0 6px rgba(45,212,191,0.7)",
          scale: clicked ? 1.4 : 1,
        }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      />
    </>
  );
}
