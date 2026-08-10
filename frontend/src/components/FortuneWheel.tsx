import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const POINTS_SLICES = [
  { points: 100, color1: '#8B1E3F', color2: '#5A0E27' },
  { points: 250, color1: '#1D3557', color2: '#0F1B2D' },
  { points: 500, color1: '#2A6F97', color2: '#133C55' },
  { points: 150, color1: '#B5838D', color2: '#6B424E' },
  { points: 300, color1: '#4A1E5C', color2: '#2B0F38' },
  { points: 50,  color1: '#2A9D8F', color2: '#165B53' },
  { points: 400, color1: '#D4A373', color2: '#8B5E34' },
  { points: 200, color1: '#3D348B', color2: '#1F1A4A' },
  { points: 100, color1: '#7678ED', color2: '#3F41A6' },
  { points: 350, color1: '#E07A5F', color2: '#96422B' },
  { points: 150, color1: '#3A5A40', color2: '#1B2A1E' },
  { points: 450, color1: '#6B705C', color2: '#3F4235' },
];

const NUM   = POINTS_SLICES.length;
const SLICE = 360 / NUM; // 30 degrees per slice

interface Props {
  onSpinComplete: (points: number) => void;
  spinning: boolean;
  setSpinning: (s: boolean) => void;
}

export default function FortuneWheel({ onSpinComplete, spinning, setSpinning }: Props) {
  const { t } = useTranslation();
  const [rotation, setRotation]   = useState(0);
  const [landedIdx, setLandedIdx] = useState<number | null>(null);
  const controls = useAnimation();

  // Idle animation
  useEffect(() => {
    if (!spinning && landedIdx === null) {
      controls.start({
        rotate: [0, 360],
        transition: { repeat: Infinity, duration: 120, ease: "linear" }
      });
    }
  }, [spinning, landedIdx, controls]);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setLandedIdx(null);
    controls.stop(); // Stop idle animation

    const extra       = Math.floor(Math.random() * NUM);
    // ensure we add enough rotations (e.g. 8 full spins)
    const currentRotate = (rotation % 360);
    const newRotation = currentRotate + 360 * 8 + extra * SLICE;
    
    setRotation(newRotation);
    
    controls.start({
      rotate: newRotation,
      transition: { duration: 5.5, ease: [0.1, 0.85, 0.15, 1.0] }
    }).then(() => {
      setSpinning(false);
      const norm = ((newRotation % 360) + 360) % 360;
      const idx  = Math.floor(((360 - norm + SLICE / 2) % 360) / SLICE) % NUM;
      setLandedIdx(idx);
      onSpinComplete(POINTS_SLICES[idx].points);
      
      // Resume slow idle spin from the landed position after a delay
      setTimeout(() => {
        controls.start({
          rotate: newRotation + 360,
          transition: { repeat: Infinity, duration: 120, ease: "linear" }
        });
      }, 3000);
    });
  };

  // SVG Dimension Definitions (Making it slightly more compact to fit well)
  const SZ = 500; // viewBox dimensions
  const CX = 250;
  const CY = 250;
  const R  = 235; // Outer wheel radius
  const IR = 55;  // Inner hub radius

  // Polar to Cartesian conversion helper (0 deg = Top)
  const polarToCartesian = (deg: number, radius: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
  };

  // SVG Pie Wedge Generator
  const arcPath = (startDeg: number, endDeg: number, outerR: number, innerR: number) => {
    const s1 = polarToCartesian(startDeg, outerR);
    const e1 = polarToCartesian(endDeg, outerR);
    const s2 = polarToCartesian(startDeg, innerR);
    const e2 = polarToCartesian(endDeg, innerR);
    return `M ${s2.x} ${s2.y} L ${s1.x} ${s1.y} A ${outerR} ${outerR} 0 0 1 ${e1.x} ${e1.y} L ${e2.x} ${e2.y} A ${innerR} ${innerR} 0 0 0 ${s2.x} ${s2.y} Z`;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 select-none w-full h-full">
      {/* ── Precision Pointer Arrow ── */}
      <div className="mb-[-20px] z-20 relative drop-shadow-[0_4px_12px_rgba(245,196,66,0.7)] animate-[pulse_3s_ease-in-out_infinite]">
        <svg width="32" height="40" viewBox="0 0 28 34" fill="none">
          <path d="M14 34 L0 0 L28 0 Z" fill="url(#ptr-gold-grad)" stroke="#FFF" strokeWidth="1" />
          <defs>
            <linearGradient id="ptr-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE066" />
              <stop offset="50%" stopColor="#F5C442" />
              <stop offset="100%" stopColor="#B8862A" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── Main Wheel Frame ── */}
      <div className="relative w-full max-w-[85vw] lg:max-w-[60vh] 2xl:max-w-[550px] aspect-square">
        {/* Ambient Glow */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute -inset-4 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,196,66,0.15) 0%, rgba(245,196,66,0) 70%)' }}
        />

        <motion.div
          animate={controls}
          className="w-full aspect-square relative"
        >
          <svg viewBox={`0 0 ${SZ} ${SZ}`} className="w-full h-full block">
            <defs>
              {/* Metallic Gold Ring Gradient */}
              <linearGradient id="gold-border" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE066" />
                <stop offset="30%" stopColor="#F5C442" />
                <stop offset="70%" stopColor="#9A6B1F" />
                <stop offset="100%" stopColor="#FFE066" />
              </linearGradient>
              
              {/* Center Hub Gradient */}
              <radialGradient id="center-hub-grad" cx="50%" cy="40%">
                <stop offset="0%" stopColor="#2A1B4E" />
                <stop offset="70%" stopColor="#120A27" />
                <stop offset="100%" stopColor="#080414" />
              </radialGradient>

              {/* Category Gradients */}
              {POINTS_SLICES.map((slice, i) => (
                <radialGradient key={i} id={`slice-grad-${i}`} cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stopColor={slice.color1} />
                  <stop offset="100%" stopColor={slice.color2} />
                </radialGradient>
              ))}
            </defs>

            {/* Wheel Outer Background Shadow Base */}
            <circle cx={CX} cy={CY} r={R + 3} fill="#0A0618" stroke="url(#gold-border)" strokeWidth="5" />

            {/* Slices & Elements */}
            {POINTS_SLICES.map((slice, i) => {
              const startDeg = i * SLICE;
              const endDeg   = startDeg + SLICE;
              const midDeg   = startDeg + SLICE / 2;
              const isLanded = landedIdx === i;

              return (
                <g key={i}>
                  {/* Wedge Path */}
                  <path
                    d={arcPath(startDeg, endDeg, R, IR)}
                    fill={`url(#slice-grad-${i})`}
                    stroke="rgba(245, 196, 66, 0.3)"
                    strokeWidth="1.5"
                    style={{
                      transition: 'filter 0.4s ease',
                      filter: isLanded ? 'brightness(1.8) saturate(1.4)' : 'none',
                    }}
                  />

                  {/* Oriented Group for Text along slice center */}
                  <g transform={`rotate(${midDeg}, ${CX}, ${CY})`}>
                    {/* Radial Label Text (Points) */}
                    <text
                      x={CX}
                      y={CY - 142}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontFamily="Cinzel, serif"
                      fontSize="24"
                      fontWeight="900"
                      fill="#FFF5D6"
                      letterSpacing="0.05em"
                      style={{ textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}
                    >
                      {slice.points}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Divider Spokes */}
            {POINTS_SLICES.map((_, i) => {
              const p1 = polarToCartesian(i * SLICE, IR);
              const p2 = polarToCartesian(i * SLICE, R);
              return (
                <line
                  key={i}
                  x1={p1.x} y1={p1.y}
                  x2={p2.x} y2={p2.y}
                  stroke="url(#gold-border)"
                  strokeWidth="2"
                  opacity="0.6"
                />
              );
            })}

            {/* Inner Ring Border */}
            <circle cx={CX} cy={CY} r={IR} fill="none" stroke="url(#gold-border)" strokeWidth="3" />

            {/* Center Metallic Hub */}
            <circle cx={CX} cy={CY} r={IR - 2} fill="url(#center-hub-grad)" />
            <circle cx={CX} cy={CY} r={IR - 8} fill="none" stroke="rgba(245,196,66,0.4)" strokeWidth="1.5" />

            {/* Central Sacred Om Symbol */}
            <text
              x={CX}
              y={CY + 3}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="28"
              fontFamily="serif"
              fill="url(#gold-border)"
              style={{ filter: 'drop-shadow(0 0 8px rgba(245,196,66,0.8))' }}
            >
              ॐ
            </text>
          </svg>
        </motion.div>
      </div>

      {/* ── Landed Result Banner ── */}
      <AnimatePresence>
        {landedIdx !== null && !spinning && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1    }}
            exit={{    opacity: 0, y: 15              }}
            className="bg-gradient-to-br from-[#1e103c]/95 to-[#0f0823]/95 backdrop-blur-md border border-[#F5C442]/50 rounded-full px-6 py-2.5 text-[#FFE066] font-['Cinzel'] font-extrabold text-lg tracking-wider shadow-[0_6px_24px_rgba(0,0,0,0.6),0_0_20px_rgba(245,196,66,0.3)] mt-2"
          >
            {t('points_earned', { points: POINTS_SLICES[landedIdx].points })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Spin Action Button ── */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSpin}
        disabled={spinning}
        className={`spin-btn rounded-full font-['Cinzel'] font-extrabold text-sm tracking-[0.15em] transition-all ${landedIdx !== null && !spinning ? 'mt-0' : 'mt-1'}`}
        style={{
          padding: '10px 40px',
        }}
      >
        {spinning ? t('spinning') : t('spin_now')}
      </motion.button>
    </div>
  );
}
