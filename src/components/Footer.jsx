import React from 'react';
import { TOKENS } from '../config/constants.js';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="w-full border-t py-8 mt-12 shrink-0 relative z-10"
      style={{ 
        borderColor: TOKENS.line,
        background: "linear-gradient(180deg, rgba(7,7,11,0.4), #07070b)"
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm font-medium" style={{ color: TOKENS.mist }}>
          &copy; {currentYear} Artificial Grrow. All rights reserved.
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium">
          <a href="/about" className="hover:text-white transition-colors" style={{ color: TOKENS.copper }}>About Us</a>
          <a href="/contact" className="hover:text-white transition-colors" style={{ color: TOKENS.copper }}>Contact Us</a>
          <a href="/privacy" className="hover:text-white transition-colors" style={{ color: TOKENS.violet }}>Privacy Policy</a>
          <a href="/terms" className="hover:text-white transition-colors" style={{ color: TOKENS.violet }}>Terms & Conditions</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
