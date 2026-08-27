import React from 'react';
import { TOKENS, LanguageContext } from '../config/constants';

export default function AnnouncementBar() {
  const { t } = React.useContext(LanguageContext);
  
  const text = t.marqueeText || "";
  const SEPARATOR = "   ◆   ";
  const doubled = text + SEPARATOR + text + SEPARATOR;

  return (
    <div
      className="absolute top-0 left-0 w-full z-50 overflow-hidden flex items-center"
      style={{
        height: '32px',
        background: 'linear-gradient(90deg, #0a0a12 0%, #0d0b1a 50%, #0a0a12 100%)',
        borderBottom: '1px solid rgba(232,184,102,0.12)',
      }}
    >
      {/* Gold shimmer overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(232,184,102,0.05) 50%, transparent 100%)',
        }}
      />

      {/* Single scrolling line */}
      <div
        className="anim-marquee font-mono text-[10px] sm:text-[11px] tracking-widest uppercase"
        style={{ color: 'rgba(232,184,102,0.7)', whiteSpace: 'nowrap' }}
      >
        {doubled}
      </div>
    </div>
  );
}
