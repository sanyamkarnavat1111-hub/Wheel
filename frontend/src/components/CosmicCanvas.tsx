import { useEffect, useRef } from 'react';

/**
 * Full-viewport animated canvas background.
 * Renders stars, nebula orbs, zodiac symbols, and occasional meteors.
 * Respects prefers-reduced-motion by disabling the loop.
 */

interface Star { x: number; y: number; r: number; alpha: number; speed: number; phase: number; }
interface Orb  { x: number; y: number; r: number; color: string; vx: number; vy: number; alpha: number; }
interface Meteor { x: number; y: number; len: number; speed: number; angle: number; alpha: number; active: boolean; }
interface ZodiacSymbol { x: number; y: number; symbol: string; alpha: number; size: number; drift: number; phase: number; }

const ZODIACS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

export default function CosmicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;
    let W = 0, H = 0;

    const stars:   Star[]         = [];
    const orbs:    Orb[]          = [];
    const meteors: Meteor[]       = [];
    const zodiac:  ZodiacSymbol[] = [];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Seeds
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.003 + 0.001,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const orbColors = ['rgba(120,80,255,', 'rgba(212,175,55,', 'rgba(60,120,255,', 'rgba(150,50,200,'];
    for (let i = 0; i < 6; i++) {
      orbs.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 100 + 50,
        color: orbColors[Math.floor(Math.random() * orbColors.length)],
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.05 + 0.02,
      });
    }

    for (let i = 0; i < 4; i++) {
      meteors.push({
        x: 0, y: 0, len: Math.random() * 100 + 50,
        speed: Math.random() * 3.5 + 2.5,
        angle: Math.PI / 5 + (Math.random() - 0.5) * 0.3,
        alpha: 0, active: false,
      });
    }

    for (let i = 0; i < 8; i++) {
      zodiac.push({
        x: Math.random() * W, y: Math.random() * H,
        symbol: ZODIACS[i % 12],
        alpha: Math.random() * 0.06 + 0.02,
        size: Math.random() * 18 + 12,
        drift: (Math.random() - 0.5) * 0.12,
        phase: Math.random() * Math.PI * 2,
      });
    }

    function drawBackground() {
      const g = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, W * 0.7);
      const pulse = Math.sin(Date.now() * 0.0002) * 0.03;
      g.addColorStop(0, `rgba(25, 8, 60, ${0.2 + pulse})`);
      g.addColorStop(0.5, 'rgba(8, 4, 30, 0.5)');
      g.addColorStop(1, 'rgba(6, 6, 20, 1)');
      ctx.fillStyle = '#060614';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    function drawOrbs() {
      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -o.r * 2) o.x = W + o.r;
        if (o.x > W + o.r * 2) o.x = -o.r;
        if (o.y < -o.r * 2) o.y = H + o.r;
        if (o.y > H + o.r * 2) o.y = -o.r;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, o.color + o.alpha + ')');
        g.addColorStop(1, o.color + '0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawStars(t: number) {
      stars.forEach(s => {
        const a = s.alpha * (0.6 + 0.4 * Math.sin(t * s.speed * 50 + s.phase));
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawZodiac(t: number) {
      zodiac.forEach(z => {
        const a = z.alpha * (0.7 + 0.3 * Math.sin(t * 0.0003 + z.phase));
        ctx.font = `${z.size}px serif`;
        ctx.fillStyle = `rgba(212,175,55,${a})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        z.x += z.drift * 0.25;
        if (z.x < -40) z.x = W + 40;
        if (z.x > W + 40) z.x = -40;
        ctx.fillText(z.symbol, z.x, z.y);
      });
    }

    function drawMeteors() {
      meteors.forEach(m => {
        if (!m.active && Math.random() < 0.0015) {
          m.active = true;
          m.x = Math.random() * W * 1.2;
          m.y = Math.random() * -H * 0.3;
          m.alpha = 1;
        }
        if (!m.active) return;
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= 0.012;
        if (m.alpha <= 0 || m.y > H + 50) { m.active = false; return; }

        const tx = m.x - Math.cos(m.angle) * m.len;
        const ty = m.y - Math.sin(m.angle) * m.len;
        const g = ctx.createLinearGradient(tx, ty, m.x, m.y);
        g.addColorStop(0, 'rgba(255,255,255,0)');
        g.addColorStop(0.5, `rgba(212,175,55,${m.alpha * 0.3})`);
        g.addColorStop(1, `rgba(255,255,255,${m.alpha})`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
      });
    }

    function loop(t: number) {
      ctx.clearRect(0, 0, W, H);
      drawBackground();
      drawOrbs();
      drawStars(t);
      drawZodiac(t);
      drawMeteors();
      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas id="cosmic-canvas" ref={canvasRef} aria-hidden="true" />;
}
