import React from 'react';
import { LanguageContext } from '../config/constants.js';
function Hero() {
  const { t } = React.useContext(LanguageContext);
  return (
    <div className="w-full text-center px-4 pt-2 pb-1 sm:pt-3 sm:pb-2">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e8b866] to-[#cf9a67] max-w-3xl mx-auto drop-shadow-[0_0_15px_rgba(232,184,102,0.3)] py-2 leading-relaxed">
        {t.heroTitle1} {t.heroTitle2}
      </h1>
      <p className="mt-1 text-[#7d7c8e] text-xs sm:text-sm max-w-xl mx-auto">
        {t.heroDesc}
      </p>
    </div>
  );
}
export default Hero;
