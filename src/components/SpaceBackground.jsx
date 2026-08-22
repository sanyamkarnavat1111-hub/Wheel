import React, { useMemo } from 'react';
import { TOKENS } from '../config/constants.js';
function SpaceBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 55 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 1.8 + 0.4,
        delay: Math.random() * 8,
        duration: Math.random() * 3.5 + 2.5,
      })),
    []
  );

  const shootingStars = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        top: 5 + Math.random() * 35,
        left: 45 + Math.random() * 45,
        delay: i * 8 + Math.random() * 5,
        duration: 2.6 + Math.random() * 1.4,
      })),
    []
  );

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: `radial-gradient(ellipse at 50% -10%, ${TOKENS.panel} 0%, ${TOKENS.void} 50%, #020203 100%)` }}
      aria-hidden="true"
    >
      {/* Soft nebula blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-15%",
          left: "15%",
          width: "55%",
          height: "45%",
          background: "radial-gradient(ellipse, rgba(139,123,255,0.14) 0%, transparent 70%)",
          animation: "nebulaDrift 28s ease-in-out infinite",
          filter: "blur(2px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "5%",
          right: "-5%",
          width: "50%",
          height: "40%",
          background: "radial-gradient(ellipse, rgba(232,184,102,0.08) 0%, transparent 70%)",
          animation: "nebulaDrift 34s ease-in-out infinite reverse",
          filter: "blur(2px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "40%",
          left: "-10%",
          width: "40%",
          height: "35%",
          background: "radial-gradient(ellipse, rgba(139,123,255,0.07) 0%, transparent 70%)",
          animation: "nebulaDrift 40s ease-in-out infinite",
          animationDelay: "-10s",
        }}
      />

      {/* Aurora line near top */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none opacity-60"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(139,123,255,0.5), rgba(232,184,102,0.4), rgba(139,123,255,0.5), transparent)",
          backgroundSize: "200% 100%",
          animation: "auroraSweep 12s linear infinite",
        }}
      />

      <div className="absolute inset-0" style={{ animation: "starDrift 120s linear infinite" }}>
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animation: `twinkle ${s.duration}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
              boxShadow: s.size > 1.4 ? "0 0 4px rgba(255,255,255,0.4)" : "none",
            }}
          />
        ))}
        {shootingStars.map((s) => (
          <div
            key={s.id}
            className="absolute"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              animation: `shootingStar ${s.duration}s linear infinite`,
              animationDelay: `${s.delay}s`,
            }}
          >
            <div
              style={{
                width: 90,
                height: 1.5,
                background: "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(232,184,102,0.4), transparent)",
                borderRadius: 999,
                boxShadow: "0 0 6px rgba(255,255,255,0.3)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)" }}
      />
    </div>
  );
}


export default SpaceBackground;
