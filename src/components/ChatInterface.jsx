import React, { useState, useEffect, useRef } from 'react';
import { TOKENS, LanguageContext, TRANSLATIONS, SYSTEM_PROMPT } from '../config/constants.js';
import { Moon, Sparkles, Lock, ArrowUp, ArrowRight } from 'lucide-react';
function ChatInterface({ unlocked, setUnlocked, target, points, userDetails, onChatComplete }) {
  const { lang, t } = React.useContext(LanguageContext);
  const userName = userDetails?.name?.split(" ")[0];
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isError, setIsError] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);
  const scrollRef = useRef(null);
  const prevUnlocked = useRef(false);

  useEffect(() => {
    if (unlocked && messages.length === 0) {
      setJustUnlocked(true);
      window.setTimeout(() => setJustUnlocked(false), 1600);
      setMessages([
        {
          role: "ai",
          text: `${t.chatGreeting
            .replace("{name}", userName || "")
            .replace("{points}", points)
            .replace("{tickets}", Math.floor(points / 100))}`,
        },
      ]);
    }
  }, [unlocked, target, userName, t, messages.length]);

  useEffect(() => {
    if (loading && scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [loading, messages]);

  const executeApiCall = async (userQuestion) => {
    setLoading(true);
    setIsError(false);

    try {
      const prompt = SYSTEM_PROMPT
        .replace("{name}", userDetails?.name || "Seeker")
        .replace("{dob}", userDetails?.dob || "Unknown")
        .replace("{time}", userDetails?.time || "Unknown")
        .replace("{place}", userDetails?.place || "Unknown")
        .replace("{language}", TRANSLATIONS[lang].langName);

      const apiKey = import.meta.env.PUBLIC_OPENROUTER_API_KEY;
      if (!apiKey) {
        throw new Error("API Key missing");
      }

      let success = false;
      let reply = "";

      for (let i = 0; i < 3; i++) {
        try {
          const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: "google/gemma-4-31b-it:free",
              messages: [
                { role: "system", content: prompt },
                { role: "user", content: userQuestion }
              ]
            })
          });
          
          if (res.ok) {
            const data = await res.json();
            reply = data.choices[0]?.message?.content || t.chatError;
            success = true;
            break;
          } else if (res.status === 429 || res.status === 502) {
            await new Promise(resolve => setTimeout(resolve, 1500));
          } else {
            break;
          }
        } catch (fetchErr) {
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      }

      if (success) {
        setMessages((m) => [...m, { role: "ai", text: reply }]);
        setIsAnswered(true);
      } else {
        throw new Error("API Request Failed");
      }
    } catch (err) {
      console.error(err);
      setMessages((m) => [...m, { role: "ai", text: t.chatError }]);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading || !unlocked || isAnswered || isError) return;
    
    const userQuestion = input.trim();
    setMessages((m) => [...m, { role: "user", text: userQuestion }]);
    setInput("");
    
    await executeApiCall(userQuestion);
  };

  const handleTryAgain = () => {
    const prevMsgs = [...messages];
    prevMsgs.pop();
    setMessages(prevMsgs);
    setIsError(false);
    
    const userQuestion = prevMsgs[prevMsgs.length - 1]?.text;
    if (userQuestion) {
      executeApiCall(userQuestion);
    }
  };

  const handleContinue = () => {
    setMessages([]);
    setIsAnswered(false);
    if (onChatComplete) {
      onChatComplete();
    }
  };

  const remaining = Math.max(0, 100 - (points % 100));

  return (
    <div
      className={`relative card card-blur rounded-3xl overflow-hidden flex flex-col anim-fade-up ${
        justUnlocked ? "anim-chat-unlock" : ""
      }`}
      style={{
        height: "min(540px, 64vh)",
        animationDelay: ".14s",
        border: unlocked
          ? "1px solid rgba(74,222,128,0.25)"
          : "1px solid rgba(139,123,255,0.18)",
        boxShadow: unlocked
          ? "0 12px 48px rgba(0,0,0,0.35), 0 0 50px rgba(74,222,128,0.08)"
          : "0 12px 48px rgba(0,0,0,0.35), 0 0 40px rgba(139,123,255,0.06)",
        transition: "border-color 0.5s ease, box-shadow 0.5s ease",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b shrink-0"
        style={{
          borderColor: TOKENS.line,
          background: unlocked
            ? "linear-gradient(180deg, rgba(74,222,128,0.06), transparent)"
            : "linear-gradient(180deg, rgba(139,123,255,0.05), transparent)",
        }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: unlocked ? "rgba(74,222,128,0.12)" : "rgba(139,123,255,0.12)",
            border: `1px solid ${unlocked ? "rgba(74,222,128,0.35)" : TOKENS.violet + "55"}`,
            transition: "all 0.4s ease",
          }}
        >
          <Moon className="w-4 h-4" style={{ color: unlocked ? TOKENS.success : TOKENS.violet }} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-display text-sm font-semibold truncate">{t.chatTitle}</h2>
          <div
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{ color: TOKENS.mist }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: unlocked ? TOKENS.success : TOKENS.mist,
                boxShadow: unlocked ? `0 0 8px ${TOKENS.success}` : "none",
                animation: unlocked ? "unlockPulse 2s ease-out 2" : "none",
              }}
            />
            {t.chatSubtitle}
          </div>
        </div>
        <Sparkles className="w-4 h-4 shrink-0" style={{ color: TOKENS.gold }} />
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scroll-thin px-4 sm:px-5 py-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} anim-msg-in`}
            style={{ animationDelay: `${Math.min(i * 0.04, 0.2)}s` }}
          >
            <div
              className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"
              }`}
              style={
                m.role === "user"
                  ? {
                      background: `linear-gradient(135deg, ${TOKENS.violet}, #a594ff)`,
                      color: "#0b0a12",
                      fontWeight: 500,
                      boxShadow: "0 4px 16px rgba(139,123,255,0.25)",
                    }
                  : {
                      background: "rgba(255,255,255,0.05)",
                      border: `1px solid ${TOKENS.line}`,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                    }
              }
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start anim-msg-in">
            <div
              className="rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${TOKENS.line}`,
              }}
            >
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: TOKENS.violet,
                    animation: "dotPulse 1.2s ease-in-out infinite",
                    animationDelay: `${d * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {!unlocked && messages.length > 0 ? (
        <div
          className="p-4 border-t shrink-0 flex flex-col items-center justify-center text-center"
          style={{
            borderColor: TOKENS.line,
            background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.35))",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Lock className="w-3.5 h-3.5" style={{ color: TOKENS.gold }} />
            <span className="text-sm font-semibold text-white">{t.chatLocked}</span>
          </div>
          <span className="text-xs" style={{ color: TOKENS.mist }}>
            {t.lockMsg2.replace("{remaining}", remaining)}
          </span>
        </div>
      ) : isError ? (
        <div className="p-3.5 sm:p-4 border-t shrink-0 flex justify-end" style={{ borderColor: TOKENS.line }}>
          <button
            onClick={handleTryAgain}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-transform active:scale-95 hover:brightness-110"
            style={{
              background: `linear-gradient(135deg, ${TOKENS.violet}, ${TOKENS.violetDim})`,
              color: "white",
              boxShadow: "0 0 14px rgba(139,123,255,0.35)",
            }}
          >
            Try Again <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      ) : isAnswered ? (
        <div className="p-3.5 sm:p-4 border-t shrink-0 flex justify-end" style={{ borderColor: TOKENS.line }}>
          <button
            onClick={handleContinue}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-transform active:scale-95 hover:brightness-110"
            style={{
              background: `linear-gradient(135deg, ${TOKENS.gold}, ${TOKENS.copper})`,
              color: "#0b0a12",
              boxShadow: "0 0 14px rgba(232,184,102,0.35)",
            }}
          >
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSend}
          className="p-3.5 sm:p-4 border-t shrink-0"
          style={{ borderColor: TOKENS.line }}
        >
          <div
            className="input-glow flex items-center gap-2 rounded-xl px-3 py-2.5 bg-black/30 border border-white/10"
            style={
              unlocked
                ? { borderColor: "rgba(74,222,128,0.25)", boxShadow: "0 0 16px rgba(74,222,128,0.08)" }
                : {}
            }
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!unlocked}
              placeholder={unlocked ? t.chatInput : t.chatLocked}
              className="flex-1 bg-transparent text-sm placeholder-white/25 disabled:cursor-not-allowed min-w-0"
              aria-label={t.chatInput}
            />
            <button
              type="submit"
              disabled={!unlocked || !input.trim() || loading}
              aria-label={t.chatSend}
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 disabled:opacity-30 transition-transform active:scale-90 hover:brightness-110"
              style={{
                background: unlocked
                  ? `linear-gradient(135deg, ${TOKENS.gold}, ${TOKENS.copper})`
                  : TOKENS.gold,
                color: "#0b0a12",
                boxShadow: unlocked ? "0 0 14px rgba(232,184,102,0.35)" : "none",
              }}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* Locked overlay */}
      {!unlocked && messages.length === 0 && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 sm:px-10"
          style={{
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            background: "rgba(7,7,11,0.62)",
          }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 anim-float-orb"
            style={{
              border: `1px solid ${TOKENS.gold}66`,
              background: "rgba(232,184,102,0.08)",
              boxShadow: "0 0 30px rgba(232,184,102,0.12)",
              animationDuration: "3.5s",
            }}
          >
            <Lock className="w-6 h-6" style={{ color: TOKENS.gold }} />
          </div>
          <h3 className="font-display text-lg sm:text-xl font-semibold mb-2">{t.chatLocked}</h3>
          <p className="text-sm max-w-[260px] leading-relaxed" style={{ color: TOKENS.mist }}>
            {t.lockMsg2.replace("{remaining}", remaining)}
          </p>
          {/* Progress mini bar */}
          <div className="mt-5 w-40 h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(100, ((points % 100) / 100) * 100)}%`,
                background: `linear-gradient(90deg, ${TOKENS.copper}, ${TOKENS.gold})`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}



export default ChatInterface;
