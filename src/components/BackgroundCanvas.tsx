import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number;
}

const TEAL  = "45,212,191";
const COUNT = 65;
const LINK  = 125;
const REPEL = 170;

export default function BackgroundCanvas() {
  const cvs   = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const pts   = useRef<Particle[]>([]);
  const raf   = useRef(0);

  useEffect(() => {
    const canvas = cvs.current!;
    const ctx    = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    pts.current = Array.from({ length: COUNT }, () => ({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      vx:    (Math.random() - 0.5) * 0.28,
      vy:    (Math.random() - 0.5) * 0.28,
      size:  Math.random() * 1.3 + 0.4,
      alpha: Math.random() * 0.3 + 0.07,
    }));

    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ps = pts.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const p of ps) {
        // Wrap edges
        if (p.x < 0) p.x = canvas.width;
        else if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        else if (p.y > canvas.height) p.y = 0;

        // Mouse repulsion
        const rdx = p.x - mx;
        const rdy = p.y - my;
        const rd  = Math.sqrt(rdx * rdx + rdy * rdy);
        if (rd < REPEL && rd > 0) {
          const f = ((REPEL - rd) / REPEL) * 0.055;
          p.vx += (rdx / rd) * f;
          p.vy += (rdy / rd) * f;
        }
        p.vx *= 0.982;
        p.vy *= 0.982;
        p.x  += p.vx;
        p.y  += p.vy;

        // Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${TEAL},${p.alpha})`;
        ctx.fill();
      }

      // Particle-to-particle connections
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx   = ps[i].x - ps[j].x;
          const dy   = ps[i].y - ps[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK) {
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(${TEAL},${(1 - dist / LINK) * 0.09})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Mouse-to-particle lines (cursor attracts network)
      for (const p of ps) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < REPEL * 0.7) {
          const a = (1 - d / (REPEL * 0.7)) * 0.18;
          ctx.beginPath();
          ctx.moveTo(mx, my);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(${TEAL},${a})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      raf.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={cvs}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
