import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { TOKENS } from '../config/constants';

export default function AdModal({ onComplete }) {
  const [timeLeft, setTimeLeft] = useState(4);

  // Handle the countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onComplete]);

  // Safely initialize the Google Ad once the component mounts
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-6 anim-fade-in" style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}>
      <div
        className="w-full max-w-[340px] sm:max-w-[400px] flex flex-col items-center"
      >
        <div className="flex items-center gap-3 mb-6">
          <Loader2 className="w-5 h-5 animate-spin" style={{ color: TOKENS.gold }} />
          <span className="text-white/90 font-display font-medium tracking-wide">
            Gathering Cosmic Energy...
          </span>
        </div>

        {/* AdSense Container */}
        <div className="w-full min-h-[250px] bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden relative">
          <span className="absolute text-white/30 text-xs font-mono tracking-widest uppercase z-0">Advertisement</span>
          <div className="relative z-10 w-full flex justify-center">
            {/* REPLACE THIS WITH YOUR ACTUAL GOOGLE ADSENSE CODE */}
            <ins className="adsbygoogle"
              style={{ display: 'block', minWidth: '300px', minHeight: '250px' }}
              data-ad-client="ca-pub-3246262402031433"
              data-ad-slot="4474915671"
              data-ad-format="auto"
              data-full-width-responsive="true"></ins>
          </div>
        </div>

        <div className="mt-6 text-sm text-white/50 font-mono">
          Spinning in {timeLeft}...
        </div>
      </div>
    </div>
  );
}
