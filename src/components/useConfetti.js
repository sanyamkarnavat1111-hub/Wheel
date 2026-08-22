import { useEffect, useRef, useCallback } from 'react';
import { TOKENS } from '../config/constants.js';
function useConfetti() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    Object.assign(canvas.style, {
      position: "fixed",
      inset: "0",
      width: "100vw",
      height: "100vh",
      pointerEvents: "none",
      zIndex: "9999",
    });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    canvasRef.current = canvas;
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      canvas.remove();
    };
  }, []);

  return useCallback((originX, originY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const colors = [TOKENS.violet, TOKENS.gold, TOKENS.copper, "#ffffff", TOKENS.goldSoft];
    const particles = Array.from({ length: 110 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3.5 + Math.random() * 10;
      return {
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        g: 0.24,
        size: 2.5 + Math.random() * 4.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 55 + Math.random() * 35,
        rot: Math.random() * 360,
        spin: (Math.random() - 0.5) * 22,
      };
    });
    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        if (p.life <= 0) return;
        alive = true;
        p.vy += p.g;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.spin;
        p.life -= 1;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.globalAlpha = Math.max(p.life / 90, 0);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.55);
        ctx.restore();
      });
      if (alive) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    tick();
  }, []);
}


export default useConfetti;
