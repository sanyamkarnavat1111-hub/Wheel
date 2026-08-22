import React, { useState } from 'react';
import { TOKENS, LanguageContext, TRANSLATIONS } from '../config/constants.js';
import { User, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';

function UserDetailsModal({ onSubmit }) {
  const { lang, setLang, t } = React.useContext(LanguageContext);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState({});
  const [shakeKey, setShakeKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const minDateStr = `${now.getFullYear() - 100}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = true;
    if (!dob.trim()) {
      next.dob = true;
    } else {
      const selected = new Date(dob);
      const minD = new Date(minDateStr);
      const maxD = new Date(todayStr);
      if (selected < minD || selected > maxD) next.dob = true;
    }
    if (!place.trim()) next.place = true;
    if (!time.trim()) next.time = true;
    return next;
  };

  const attemptSubmit = () => {
    if (submitting) return;
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setShakeKey((k) => k + 1);
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      onSubmit({ name: name.trim(), dob: dob.trim(), place: place.trim(), time });
    }, 420);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    attemptSubmit();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 anim-fade-in">
      <div
        className="absolute inset-0"
        style={{ background: "rgba(4,4,7,0.86)", backdropFilter: "blur(10px)" }}
      />

      <div
        key={shakeKey}
        className={`glow-border relative w-full max-w-[420px] anim-glass-reveal ${shakeKey ? "anim-shake" : ""}`}
        style={{ boxShadow: "0 32px 90px rgba(0,0,0,0.7), 0 0 80px rgba(139,123,255,0.08)" }}
      >
        <div
          className="relative rounded-[28px] overflow-hidden p-7 sm:p-9"
          style={{
            background: `linear-gradient(165deg, ${TOKENS.card} 0%, #0a0a12 60%, #0c0a14 100%)`,
          }}
        >
          {/* Decorative floating orbs inside modal */}
          <div
            className="absolute -top-6 -right-6 w-28 h-28 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(232,184,102,0.2), transparent 70%)",
              animation: "modalOrb 7s ease-in-out infinite",
            }}
          />
          <div
            className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(139,123,255,0.18), transparent 70%)",
              animation: "modalOrb 9s ease-in-out infinite reverse",
            }}
          />

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{
                    background: "rgba(232,184,102,0.12)",
                    border: "1px solid rgba(232,184,102,0.3)",
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" style={{ color: TOKENS.gold }} />
                </div>
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: TOKENS.gold }}
                >
                  {t.intakeTitle}
                </span>
              </div>
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-black/40 border border-white/10 rounded-xl px-2 py-1 text-xs font-display cursor-pointer hover:border-white/20 transition-colors">
                {Object.entries(TRANSLATIONS).map(([key, val]) => (
                  <option key={key} value={key} className="bg-[#0a0a12]">{val.langName}</option>
                ))}
              </select>
            </div>

            <h1 className="font-display text-[1.85rem] sm:text-[2.1rem] font-semibold leading-[1.15] tracking-tight">
              {t.intakeHeading.split(" ")[0]}{" "}
              <span className="text-gradient-gold">
                {t.intakeHeading.split(" ").slice(1).join(" ")}
              </span>
            </h1>
            <p className="text-sm mt-2.5 mb-7 leading-relaxed" style={{ color: TOKENS.mist }}>
              {t.intakeDesc}
            </p>

            <div className="space-y-3.5">
              <label className="block">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: TOKENS.mist }}
                >
                  {t.fullName}
                </span>
                <div
                  className={`input-glow mt-1.5 flex items-center gap-3 rounded-xl px-4 py-3 bg-black/30 border ${
                    errors.name ? "input-error" : "border-white/10"
                  }`}
                >
                  <User className="w-4 h-4 shrink-0" style={{ color: TOKENS.violet }} />
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((er) => ({ ...er, name: false }));
                    }}
                    placeholder={t.namePlaceholder}
                    className="w-full bg-transparent text-sm placeholder-white/25"
                    autoComplete="name"
                  />
                </div>
              </label>

              <label className="block anim-fade-up" style={{ animationDelay: ".12s" }}>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: TOKENS.mist }}
                >
                  {t.dateOfBirth}
                </span>
                <div
                  className={`input-glow mt-1.5 flex items-center gap-3 rounded-xl px-4 py-3 bg-black/30 border ${
                    errors.dob ? "input-error" : "border-white/10"
                  }`}
                >
                  <MapPin className="w-4 h-4 shrink-0" style={{ color: TOKENS.violet }} />
                  <input
                    type="date"
                    value={dob}
                    min={minDateStr}
                    max={todayStr}
                    onChange={(e) => {
                      setDob(e.target.value);
                      if (errors.dob) setErrors((er) => ({ ...er, dob: false }));
                    }}
                    className="w-full bg-transparent text-sm placeholder-white/25"
                  />
                </div>
              </label>

              <label className="block anim-fade-up" style={{ animationDelay: ".18s" }}>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: TOKENS.mist }}
                >
                  {t.placeOfBirth}
                </span>
                <div
                  className={`input-glow mt-1.5 flex items-center gap-3 rounded-xl px-4 py-3 bg-black/30 border ${
                    errors.place ? "input-error" : "border-white/10"
                  }`}
                >
                  <MapPin className="w-4 h-4 shrink-0" style={{ color: TOKENS.violet }} />
                  <input
                    value={place}
                    onChange={(e) => {
                      setPlace(e.target.value);
                      if (errors.place) setErrors((er) => ({ ...er, place: false }));
                    }}
                    placeholder={t.placePlaceholder}
                    className="w-full bg-transparent text-sm placeholder-white/25"
                  />
                </div>
              </label>

              <label className="block anim-fade-up" style={{ animationDelay: ".24s" }}>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: TOKENS.mist }}
                >
                  {t.timeOfBirth}
                </span>
                <div className="mt-1.5 flex items-center gap-2">
                  <div
                    className={`input-glow flex-1 flex items-center gap-3 rounded-xl px-4 py-3 bg-black/30 border ${
                      errors.time ? "input-error" : "border-white/10"
                    }`}
                  >
                    <Clock className="w-4 h-4 shrink-0" style={{ color: TOKENS.violet }} />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => {
                        setTime(e.target.value);
                        if (errors.time) setErrors((er) => ({ ...er, time: false }));
                      }}
                      className="w-full bg-transparent text-sm"
                    />
                  </div>
                </div>
              </label>

              {Object.keys(errors).some((k) => errors[k]) && (
                <p className="text-xs pl-1" style={{ color: "#f472b6" }}>
                  {t.fillAll}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={attemptSubmit}
              disabled={submitting}
              className="btn-shimmer w-full mt-7 rounded-xl py-3.5 font-display font-semibold text-sm tracking-wide text-black flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97] disabled:opacity-70 disabled:pointer-events-none"
              style={{ boxShadow: "0 10px 32px rgba(232,184,102,0.28)" }}
            >
              {submitting ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                  {t.aligning}
                </>
              ) : (
                <>
                  {t.revealPath}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
        <form onSubmit={handleFormSubmit} className="sr-only" aria-hidden="true">
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
}


export default UserDetailsModal;
