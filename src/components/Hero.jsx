import React from 'react';
import { LanguageContext } from '../config/constants.js';
function Hero() {
  return (
    <div className="w-full text-center px-4 pt-4 pb-2 sm:pt-6 sm:pb-4">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e8b866] to-[#cf9a67] max-w-3xl mx-auto drop-shadow-[0_0_15px_rgba(232,184,102,0.3)]">
        Unlock Your Future with a Free Astrologer Chat
      </h1>
      <p className="mt-2 text-[#7d7c8e] text-sm sm:text-base max-w-xl mx-auto">
        Spin the wheel, gather cosmic energy, and speak to your personal AI Astrologer.
      </p>
    </div>
  );
}
export default Hero;
