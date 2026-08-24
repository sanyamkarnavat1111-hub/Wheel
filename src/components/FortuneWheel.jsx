import React, { useState, useEffect, useRef } from 'react';
import { TOKENS, LanguageContext, SEGMENTS } from '../config/constants.js';
import { arcPath, polarToCartesian, pickWeightedSegment } from '../utils/math.js';
import useConfetti from './useConfetti.js';
import { Star, Sparkles } from 'lucide-react';
import AdModal from './AdModal';

const SEGMENT_ANGLE = 360 / SEGMENTS.length;

function FortuneWheel({ onWin, spinsUsed }) {
  const { t } = React.useContext(LanguageContext);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [lastWin, setLastWin] = useState(null);
  const [pressAnim, setPressAnim] = useState(false);
  const wheelBtnRef = useRef(null);
  const confettiBurst = useConfetti();

  const [showAd, setShowAd] = useState(false);

  const size = 440;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 10;

  // Intercept the spin click to show the ad first
  const handleSpinClick = () => {
    if (spinning) return;
    setShowAd(true);
  };

  // This is called automatically when the ad timer finishes
  const executeSpin = () => {
    setShowAd(false);
    
    setPressAnim(true);
    window.setTimeout(() => setPressAnim(false), 280);
    setSpinning(true);
    setLastWin(null);

    const winnerIndex = pickWeightedSegment();
    const segCenter = winnerIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const fullSpins = 6 + Math.floor(Math.random() * 3);
    const currentMod = ((rotation % 360) + 360) % 360;
    const targetMod = (360 - segCenter) % 360;
    let delta = targetMod - currentMod;
    if (delta < 0) delta += 360;
    const nextRotation = rotation + fullSpins * 360 + delta;
    setRotation(nextRotation);

    window.setTimeout(() => {
      setSpinning(false);
      const won = SEGMENTS[winnerIndex].value;
      setLastWin(won);
      if (won > 0 && wheelBtnRef.current) {
        const rect = wheelBtnRef.current.getBoundingClientRect();
        confettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
      onWin(won);
    }, 8600);
  };

  return (
    <div
      className={`card-wheel card-blur rounded-3xl p-5 sm:p-7 lg:p-8 flex flex-col items-center anim-fade-up ${
        lastWin !== null && lastWin > 0 ? "anim-win-flash" : ""
      }`}
      style={{ animationDelay: ".08s" }}
    >
      {/* Title row */}
      <div className="self-start w-full mb-4 sm:mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "rgba(232,184,102,0.1)",
              border: "1px solid rgba(232,184,102,0.25)",
            }}
          >
            <Star className="w-3.5 h-3.5" style={{ color: TOKENS.gold }} />
          </div>
          <div>
            <div
              className="font-mono text-sm sm:text-base uppercase tracking-[0.14em] font-bold"
              style={{ color: "#c8c6d4" }}
            >
              {t.wheelTitle}
            </div>
            <div
              className="font-mono text-[10px] uppercase tracking-[0.2em] mt-0.5"
              style={{ color: TOKENS.gold }}
            >
              {t.wheelOrbits}
            </div>
          </div>
        </div>
        {!spinning && lastWin === null && (
          <span
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest anim-spin-hint"
            style={{ color: TOKENS.mist }}
          >
            <Sparkles className="w-3 h-3" style={{ color: TOKENS.gold }} />
            {t.spinBtn}
          </span>
        )}
      </div>

      {/* Wheel stage */}
      <div
        className="relative flex justify-center items-center mx-auto"
        style={{
          width: "min(100%, 44vh, 420px)",
          aspectRatio: "1 / 1",
          maxWidth: "100%",
        }}
      >
        {/* Floating energy orbs (decorative, always visible) */}
        <div
          className="absolute -left-2 top-1/4 w-2.5 h-2.5 rounded-full anim-float-orb pointer-events-none"
          style={{
            background: TOKENS.violet,
            boxShadow: `0 0 14px ${TOKENS.violet}`,
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute -right-1 top-1/3 w-2 h-2 rounded-full anim-float-orb pointer-events-none"
          style={{
            background: TOKENS.gold,
            boxShadow: `0 0 12px ${TOKENS.gold}`,
            animationDelay: "1.2s",
          }}
        />
        <div
          className="absolute left-1/4 -bottom-1 w-1.5 h-1.5 rounded-full anim-float-orb pointer-events-none"
          style={{
            background: TOKENS.copper,
            boxShadow: `0 0 10px ${TOKENS.copper}`,
            animationDelay: "2.1s",
          }}
        />

        {/* Pointer */}
        <div
          className="absolute left-1/2 z-30"
          style={{
            top: "-3%",
            transform: "translateX(-50%)",
            animation: spinning ? "pointerBounce 0.32s ease-in-out infinite" : "none",
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "clamp(8px, 1.8vw, 12px) solid transparent",
              borderRight: "clamp(8px, 1.8vw, 12px) solid transparent",
              borderTop: `clamp(14px, 3.4vw, 22px) solid ${TOKENS.gold}`,
              filter: "drop-shadow(0 3px 8px rgba(232,184,102,0.65))",
            }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: 2,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: TOKENS.goldSoft,
              boxShadow: "0 0 8px rgba(232,184,102,0.8)",
            }}
          />
        </div>

        {/* Outer breathing ring */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none anim-ring-breath"
          style={{
            border: "1.5px solid rgba(232,184,102,0.35)",
            boxShadow: spinning
              ? "0 0 60px rgba(232,184,102,0.35), 0 0 100px rgba(139,123,255,0.15)"
              : "0 0 40px rgba(232,184,102,0.18)",
            zIndex: 0,
          }}
        />

        {/* Ambient violet glow */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: spinning
              ? "radial-gradient(circle, rgba(139,123,255,0.35) 0%, transparent 65%)"
              : "radial-gradient(circle, rgba(139,123,255,0.2) 0%, transparent 65%)",
            transform: "scale(1.2)",
            transition: "background 0.5s ease",
            zIndex: 0,
          }}
        />

        {/* Spinning Wrapper containing both Ticks and Wheel */}
        <div
          className={`absolute inset-0 w-full h-full z-10 ${spinning ? "" : "anim-idle-spin"}`}
          style={{ willChange: spinning ? "transform" : "auto" }}
        >
          <div
            className="absolute inset-0 w-full h-full wheel-transition"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* Decorative outer ticks */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              {Array.from({ length: 32 }).map((_, i) => {
                const a = (i * 11.25 - 90) * (Math.PI / 180);
                const major = i % 4 === 0;
                const r1 = major ? 47.5 : 48.2;
                const r2 = 49.5;
                const x1 = 50 + r1 * Math.cos(a);
                const y1 = 50 + r1 * Math.sin(a);
                const x2 = 50 + r2 * Math.cos(a);
                const y2 = 50 + r2 * Math.sin(a);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={major ? TOKENS.gold : "rgba(255,255,255,0.28)"}
                    strokeWidth={major ? 0.7 : 0.35}
                    opacity={spinning ? 1 : 0.65}
                  />
                );
              })}
            </svg>

            {/* Spinning wheel SVG */}
            <div className="absolute inset-0 w-full h-full z-10">
              <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${size} ${size}`}
              >
            <defs>
              <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
                <stop offset="78%" stopColor={TOKENS.goldSoft} />
                <stop offset="100%" stopColor={TOKENS.copper} />
              </radialGradient>
              <linearGradient id="segHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </linearGradient>
            </defs>
            {/* Thick gold outer ring */}
            <circle
              cx={cx}
              cy={cy}
              r={r + 9}
              fill="none"
              stroke="url(#ringGlow)"
              strokeWidth="7"
              opacity="0.95"
            />
            <circle
              cx={cx}
              cy={cy}
              r={r + 3}
              fill="#0b0a12"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
            />
            {SEGMENTS.map((seg, i) => {
              const start = i * SEGMENT_ANGLE;
              const end = start + SEGMENT_ANGLE;
              const mid = start + SEGMENT_ANGLE / 2;
              const labelPos = polarToCartesian(cx, cy, r * 0.62, mid);
              const pathD = arcPath(cx, cy, r, start, end);
              return (
                <g key={i}>
                  <path
                    d={pathD}
                    fill={seg.color}
                    stroke="rgba(0,0,0,0.5)"
                    strokeWidth="1.5"
                  />
                  <path d={pathD} fill="url(#segHighlight)" opacity="0.4" />
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="Space Grotesk"
                    fontWeight="800"
                    fontSize={seg.value >= 200 ? 21 : 18}
                    fill={seg.value >= 200 ? "#1c1420" : "#ffffff"}
                    style={{ pointerEvents: "none" }}
                  >
                    {seg.label}
                  </text>
                </g>
              );
            })}
            {/* Center hub ring */}
            <circle
              cx={cx}
              cy={cy}
              r={r * 0.26}
              fill="#0b0a12"
              stroke={TOKENS.gold}
              strokeWidth="3"
            />
            <circle
              cx={cx}
              cy={cy}
              r={r * 0.26}
              fill="none"
              stroke="rgba(232,184,102,0.25)"
              strokeWidth="8"
            />
              </svg>
            </div>
          </div>
        </div>

        {/* Center SPIN button */}
        <button
          ref={wheelBtnRef}
          onClick={handleSpinClick}
          disabled={spinning}
          aria-label={spinning ? t.spinning : t.spinBtn}
          className={`absolute top-1/2 left-1/2 rounded-full font-display font-bold text-[11px] sm:text-xs tracking-[0.2em] flex items-center justify-center z-20 ${
            pressAnim ? "anim-spin-press" : ""
          }`}
          style={{
            width: "clamp(60px, 19%, 88px)",
            height: "clamp(60px, 19%, 88px)",
            transform: "translate(-50%, -50%)",
            background: spinning
              ? "linear-gradient(145deg, #1a1520, #0b0a12)"
              : "linear-gradient(145deg, #16121c, #0b0a12)",
            border: `2.5px solid ${TOKENS.gold}`,
            color: TOKENS.gold,
            boxShadow: spinning
              ? "0 0 28px rgba(232,184,102,0.55), inset 0 0 16px rgba(232,184,102,0.2)"
              : "0 0 32px rgba(232,184,102,0.5), 0 4px 16px rgba(0,0,0,0.4)",
            cursor: spinning ? "not-allowed" : "pointer",
            transition: "box-shadow 0.3s ease, background 0.3s ease",
          }}
        >
          {spinning ? (
            <span className="animate-spin">
              <Sparkles className="w-5 h-5" />
            </span>
          ) : (
            t.spinBtn
          )}
        </button>
      </div>

      {/* Result / idle hint */}
      <div className="mt-5 sm:mt-6 w-full flex items-center justify-center min-h-[44px]">
        {lastWin !== null ? (
          <div
            key={`${lastWin}-${Date.now()}`}
            className="anim-result-pop flex items-center gap-2.5 rounded-full px-5 py-2.5"
            style={{
              background:
                lastWin > 0
                  ? "linear-gradient(90deg, rgba(232,184,102,0.15), rgba(139,123,255,0.1))"
                  : "rgba(255,255,255,0.04)",
              border: `1px solid ${lastWin > 0 ? "rgba(232,184,102,0.35)" : "rgba(255,255,255,0.08)"}`,
              boxShadow: lastWin > 0 ? "0 0 24px rgba(232,184,102,0.2)" : "none",
            }}
          >
            <Sparkles
              className="w-4 h-4 shrink-0"
              style={{ color: lastWin > 0 ? TOKENS.gold : TOKENS.mist }}
            />
            <span className="font-display text-sm sm:text-[15px]">
              {lastWin > 0 ? (
                <>
                  {t.channelMsg1}
                  <span className="text-gradient-gold font-semibold">
                    +{lastWin} {t.channelMsg2}
                  </span>
                </>
              ) : (
                <span style={{ color: TOKENS.mist }}>{t.channelFail}</span>
              )}
            </span>
          </div>
        ) : !spinning ? (
          <p
            className="font-mono text-[11px] uppercase tracking-[0.18em] anim-spin-hint"
            style={{ color: TOKENS.mist }}
          >
            {t.spinBtn} · {t.wheelOrbits}
          </p>
        ) : (
          <p
            className="font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ color: TOKENS.gold }}
          >
            {t.spinning}…
          </p>
        )}
      </div>

      {showAd && <AdModal onComplete={executeSpin} />}
    </div>
  );
}



export default FortuneWheel;
