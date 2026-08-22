import React, { useState, useEffect, useRef } from 'react';
import { TOKENS, LanguageContext, TRANSLATIONS } from '../config/constants.js';
import { Sparkles, Zap } from 'lucide-react';
function Header({ points, target }) {
  const { lang, setLang, t } = React.useContext(LanguageContext);
  const pct = Math.min(100, (points / target) * 100);
  const [bump, setBump] = useState(false);
  const prevPoints = useRef(points);

  useEffect(() => {
    if (points !== prevPoints.current) {
      setBump(true);
      const id = window.setTimeout(() => setBump(false), 450);
      prevPoints.current = points;
      return () => clearTimeout(id);
    }
  }, [points]);

  return (
    <header className="anim-fade-up relative">
      {/* Soft top aurora under header */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none -z-10"
        style={{
          background: "linear-gradient(180deg, rgba(139,123,255,0.06) 0%, transparent 100%)",
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-auto flex flex-wrap items-center justify-between sm:justify-start gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(232,184,102,0.2), rgba(139,123,255,0.15))",
                border: "1px solid rgba(232,184,102,0.3)",
                boxShadow: "0 0 16px rgba(232,184,102,0.15)",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: TOKENS.gold }} />
            </div>
            <span className="font-display text-base sm:text-lg font-semibold tracking-tight whitespace-nowrap">
              Astro<span className="text-gold">Wheel</span>
            </span>
          </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-xl px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-display cursor-pointer hover:border-white/25 transition-all hover:bg-black/60"
            aria-label="Language"
          >
            {Object.entries(TRANSLATIONS).map(([key, val]) => (
              <option key={key} value={key} className="bg-[#0a0a12]">
                {val.langName}
              </option>
            ))}
          </select>
        </div>

        <div
          className="card w-full sm:w-auto rounded-2xl px-3 sm:px-4 py-2.5 min-w-[148px] sm:min-w-[210px]"
            style={{
              border: "1px solid rgba(232,184,102,0.15)",
              background: "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <div
                className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.16em]"
                style={{ color: TOKENS.mist }}
              >
                <Zap className="w-3 h-3" style={{ color: TOKENS.gold }} />
                {t.energy}
              </div>
              <div className={`font-mono text-xs ${bump ? "anim-score-bump" : ""}`}>
                <span className="text-gold font-semibold">{points}</span>
                <span style={{ color: TOKENS.mist }}> / {target}</span>
              </div>
            </div>
            <div className="h-[4px] rounded-full bg-white/10 mt-2 overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                style={{
                  width: `${pct}%`,
                  background: `linear-gradient(90deg, ${TOKENS.copper}, ${TOKENS.gold}, ${TOKENS.goldSoft})`,
                  boxShadow: pct > 0 ? "0 0 10px rgba(232,184,102,0.4)" : "none",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                    backgroundSize: "200% 100%",
                    animation: "progressShine 2.5s linear infinite",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}



export default Header;
