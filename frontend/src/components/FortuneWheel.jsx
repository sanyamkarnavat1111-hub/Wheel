import React, { useState, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import confetti from 'canvas-confetti';

const SEGMENTS = [
  { label: '50', color: '#3b0764', textColor: '#facc15' },
  { label: '10', color: '#1e1b4b', textColor: '#818cf8' },
  { label: '100', color: '#581c87', textColor: '#facc15' },
  { label: '0', color: '#0f172a', textColor: '#64748b' },
  { label: '200', color: '#4c1d95', textColor: '#facc15' },
  { label: '20', color: '#312e81', textColor: '#a5b4fc' },
  { label: '500', color: '#7e22ce', textColor: '#fef08a' },
  { label: '5', color: '#172554', textColor: '#93c5fd' },
];

export default function FortuneWheel({ onSpinEnd }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const controls = useAnimationControls();
  const wheelRef = useRef(null);

  const triggerConfetti = () => {
    const end = Date.now() + 2 * 1000;
    const colors = ['#a855f7', '#eab308', '#ec4899'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const spin = async () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Calculate winning segment
    // We want the wheel to spin at least 5-8 times completely
    const extraSpins = 5 + Math.floor(Math.random() * 4); // 5 to 8 full spins
    const extraDegrees = extraSpins * 360;
    
    // Pick a random segment to win (0 to 7)
    const winningIndex = Math.floor(Math.random() * SEGMENTS.length);
    const segmentAngle = 360 / SEGMENTS.length;
    
    // The top pointer is at 0 degrees.
    // If we land on winningIndex, we want the rotation to end up such that 
    // the winning segment is at the top.
    // Segment i starts at i * segmentAngle and ends at (i+1) * segmentAngle.
    // The center of segment i is (i + 0.5) * segmentAngle.
    // To bring segment i to the top, we need to rotate backwards by its center angle.
    // So target rotation in the current 360 circle is 360 - center angle.
    const centerAngle = (winningIndex + 0.5) * segmentAngle;
    const targetBaseRotation = 360 - centerAngle;
    
    // Add random jitter within the segment so it doesn't always land exactly in the middle
    const jitter = (Math.random() - 0.5) * (segmentAngle * 0.7); 
    
    const newRotation = rotation + extraDegrees + targetBaseRotation - (rotation % 360) + jitter;

    await controls.start({
      rotate: newRotation,
      transition: {
        duration: 8,
        ease: [0.1, 0.9, 0.2, 1], // Custom bezier for realistic slow down
      }
    });

    setRotation(newRotation);
    setIsSpinning(false);
    
    const wonPoints = parseInt(SEGMENTS[winningIndex].label, 10);
    if (wonPoints > 0) {
      triggerConfetti();
    }
    
    // Wait a little before adding points so user can see what they landed on
    setTimeout(() => {
      onSpinEnd(wonPoints);
    }, 1000);
  };

  return (
    <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
      {/* Outer Glow & Decoration */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/30 via-fuchsia-500/20 to-indigo-600/30 blur-3xl scale-110 -z-10 animate-pulse"></div>
      
      {/* Outer Golden Ring */}
      <div className="absolute inset-2 rounded-full border-[12px] border-amber-500/80 shadow-[0_0_30px_rgba(245,158,11,0.5)_inset,0_0_30px_rgba(245,158,11,0.5)] z-10 flex items-center justify-center pointer-events-none">
        {/* Inner ring */}
        <div className="w-full h-full rounded-full border-4 border-amber-300/50"></div>
      </div>

      {/* The Pointer */}
      <div className="absolute -top-6 z-30 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]">
        <svg width="48" height="60" viewBox="0 0 48 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 60L4.94263 27H43.0574L24 60Z" fill="url(#paint0_linear)"/>
          <path d="M24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0Z" fill="url(#paint1_linear)"/>
          <circle cx="24" cy="24" r="10" fill="#4C1D95"/>
          <defs>
            <linearGradient id="paint0_linear" x1="24" y1="27" x2="24" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A"/>
              <stop offset="1" stopColor="#D97706"/>
            </linearGradient>
            <linearGradient id="paint1_linear" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FEF3C7"/>
              <stop offset="1" stopColor="#B45309"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* The Wheel */}
      <motion.div 
        ref={wheelRef}
        className="relative w-[92%] h-[92%] rounded-full overflow-hidden shadow-2xl z-0"
        animate={controls}
        initial={{ rotate: 0 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {SEGMENTS.map((seg, i) => {
            const angle = 360 / SEGMENTS.length;
            const startAngle = i * angle;
            const endAngle = (i + 1) * angle;
            
            // Convert to radians
            const startRad = (Math.PI * startAngle) / 180;
            const endRad = (Math.PI * endAngle) / 180;
            
            const x1 = 50 + 50 * Math.cos(startRad);
            const y1 = 50 + 50 * Math.sin(startRad);
            const x2 = 50 + 50 * Math.cos(endRad);
            const y2 = 50 + 50 * Math.sin(endRad);
            
            // Text positioning
            const textAngle = startAngle + angle / 2;
            const textRad = (Math.PI * textAngle) / 180;
            const tx = 50 + 35 * Math.cos(textRad);
            const ty = 50 + 35 * Math.sin(textRad);

            const largeArcFlag = angle > 180 ? 1 : 0;
            const pathData = [
              `M 50 50`,
              `L ${x1} ${y1}`,
              `A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              `Z`
            ].join(' ');

            return (
              <g key={i}>
                <path d={pathData} fill={seg.color} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                <text 
                  x={tx} 
                  y={ty} 
                  fill={seg.textColor} 
                  fontSize="7" 
                  fontWeight="bold" 
                  textAnchor="middle" 
                  alignmentBaseline="middle"
                  transform={`rotate(${textAngle + 90}, ${tx}, ${ty})`}
                  style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.8))' }}
                >
                  {seg.label}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Center Button */}
      <button 
        onClick={spin}
        disabled={isSpinning}
        className="absolute z-20 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-800 border-4 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)] flex items-center justify-center font-bold text-amber-100 uppercase tracking-widest text-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-80 disabled:hover:scale-100 disabled:cursor-not-allowed"
      >
        <span className="drop-shadow-lg">SPIN</span>
      </button>
    </div>
  );
}
