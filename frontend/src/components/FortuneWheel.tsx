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

const NUM = POINTS_SLICES.length;
const SLICE_DEG = 360 / NUM;

interface Props {
  onSpinComplete: (points: number) => void;
  spinning: boolean;
  setSpinning: (s: boolean) => void;
}

export default function FortuneWheel({ onSpinComplete, spinning, setSpinning }: Props) {
  const { t } = useTranslation();
  const [rotation, setRotation] = useState(0);
  const [landedIdx, setLandedIdx] = useState<number | null>(null);
  const controls = useAnimation();

  // Slow idle rotation
  useEffect(() => {
    if (!spinning && landedIdx === null) {
      controls.start({
        rotate: [0, 360],
        transition: { repeat: Infinity, duration: 90, ease: 'linear' },
      });
    }
  }, [spinning, landedIdx, controls]);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setLandedIdx(null);
    controls.stop();

    const extra = Math.floor(Math.random() * NUM);
    const curr = rotation % 360;
    const newRot = curr + 360 * 7 + extra * SLICE_DEG;
    setRotation(newRot);

    controls.start({
      rotate: newRot,
      transition: { duration: 5, ease: [0.12, 0.84, 0.14, 1.0] },
    }).then(() => {
      setSpinning(false);
      const norm = ((newRot % 360) + 360) % 360;
      const idx = Math.floor(((360 - norm + SLICE_DEG / 2) % 360) / SLICE_DEG) % NUM;
      setLandedIdx(idx);
      onSpinComplete(POINTS_SLICES[idx].points);

      setTimeout(() => {
        controls.start({
          rotate: newRot + 360,
          transition: { repeat: Infinity, duration: 90, ease: 'linear' },
        });
      }, 2500);
    });
  };

  // SVG geometry
  const SZ = 500, CX = 250, CY = 250, R = 230, IR = 52;

  const polar = (deg: number, radius: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
  };

  const arc = (s: number, e: number, oR: number, iR: number) => {
    const s1 = polar(s, oR), e1 = polar(e, oR), s2 = polar(s, iR), e2 = polar(e, iR);
    return `M${s2.x} ${s2.y} L${s1.x} ${s1.y} A${oR} ${oR} 0 0 1 ${e1.x} ${e1.y} L${e2.x} ${e2.y} A${iR} ${iR} 0 0 0 ${s2.x} ${s2.y}Z`;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-3 select-none">
      {/* Pointer */}
      <div className="relative z-10 mb-[-14px]">
        <svg width="24" height="30" viewBox="0 0 24 30" fill="none" aria-hidden="true">
          <path d="M12 30 L0 0 L24 0 Z" fill="url(#ptr)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" />
          <defs>
            <linearGradient id="ptr" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE066" />
              <stop offset="100%" stopColor="#B8862A" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Wheel */}
      <div className="relative w-[min(65vw,280px)] sm:w-[min(50vw,320px)] md:w-[min(45vw,360px)] lg:w-[min(40vw,400px)] xl:w-[420px] aspect-square">
        <motion.div animate={controls} className="w-full h-full">
          <svg viewBox={`0 0 ${SZ} ${SZ}`} className="w-full h-full block drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <defs>
              <linearGradient id="gold-rim" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE066" />
                <stop offset="40%" stopColor="#D4AF37" />
                <stop offset="80%" stopColor="#9A6B1F" />
                <stop offset="100%" stopColor="#FFE066" />
              </linearGradient>
              <radialGradient id="hub" cx="50%" cy="40%">
                <stop offset="0%" stopColor="#1e1240" />
                <stop offset="100%" stopColor="#080414" />
              </radialGradient>
              {POINTS_SLICES.map((s, i) => (
                <radialGradient key={i} id={`sg${i}`} cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stopColor={s.color1} />
                  <stop offset="100%" stopColor={s.color2} />
                </radialGradient>
              ))}
            </defs>

            {/* Outer ring */}
            <circle cx={CX} cy={CY} r={R + 4} fill="none" stroke="url(#gold-rim)" strokeWidth="4" />

            {/* Slices */}
            {POINTS_SLICES.map((slice, i) => {
              const startDeg = i * SLICE_DEG;
              const endDeg = startDeg + SLICE_DEG;
              const midDeg = startDeg + SLICE_DEG / 2;
              const isLanded = landedIdx === i;
              return (
                <g key={i}>
                  <path
                    d={arc(startDeg, endDeg, R, IR)}
                    fill={`url(#sg${i})`}
                    stroke="rgba(212,175,55,0.2)"
                    strokeWidth="1"
                    style={{ filter: isLanded ? 'brightness(1.7) saturate(1.3)' : 'none', transition: 'filter 0.4s' }}
                  />
                  <g transform={`rotate(${midDeg}, ${CX}, ${CY})`}>
                    <text
                      x={CX} y={CY - R * 0.6}
                      textAnchor="middle" dominantBaseline="middle"
                      fontFamily="Cinzel, serif" fontSize="22" fontWeight="800"
                      fill="#FFF5D6" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
                    >
                      {slice.points}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Spokes */}
            {POINTS_SLICES.map((_, i) => {
              const p1 = polar(i * SLICE_DEG, IR);
              const p2 = polar(i * SLICE_DEG, R);
              return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(212,175,55,0.25)" strokeWidth="1.5" />;
            })}

            {/* Hub */}
            <circle cx={CX} cy={CY} r={IR} fill="url(#hub)" stroke="url(#gold-rim)" strokeWidth="3" />
            <text x={CX} y={CY + 2} textAnchor="middle" dominantBaseline="middle" fontSize="24" fontFamily="serif" fill="url(#gold-rim)" style={{ filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.7))' }}>
              ॐ
            </text>
          </svg>
        </motion.div>
      </div>

      {/* Result banner */}
      <AnimatePresence>
        {landedIdx !== null && !spinning && (
          <motion.p
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-[var(--color-accent-bright)] font-[var(--font-display)] font-bold text-[var(--text-h3)] tracking-wide"
          >
            {t('points_earned', { points: POINTS_SLICES[landedIdx].points })}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Spin button */}
      <button
        onClick={handleSpin}
        disabled={spinning}
        className="spin-btn rounded-full px-8 py-2.5 sm:px-10 sm:py-3 text-[var(--text-small)] sm:text-[var(--text-body)]"
        aria-label={spinning ? t('spinning') : t('spin_now')}
      >
        {spinning ? t('spinning') : t('spin_now')}
      </button>
    </div>
  );
}
