import React, { useState, useEffect } from 'react';
import { LanguageContext, TRANSLATIONS } from '../config/constants.js';
import SpaceBackground from './SpaceBackground.jsx';
import UserDetailsModal from './UserDetailsModal.jsx';
import Header from './Header.jsx';
import Hero from './Hero.jsx';
import FortuneWheel from './FortuneWheel.jsx';
import ChatInterface from './ChatInterface.jsx';
import Footer from './Footer.jsx';
import SeoContent from './SeoContent.jsx';

function App() {
  const [lang, setLang] = useState("en");
  const t = TRANSLATIONS[lang];
  const [userDetails, setUserDetails] = useState(null);
  const [points, setPoints] = useState(0);
  const [spinsUsed, setSpinsUsed] = useState(0);

  const target = Math.floor(points / 100) * 100 + 100;
  const unlocked = points >= 100;

  const handleWin = (won) => {
    setSpinsUsed((s) => s + 1);
    setPoints(p => p + won);
  };

  const handleChatComplete = () => {
    setPoints(p => Math.max(0, p - 100));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div className="astrowheel-root min-h-screen w-full safe-bottom anim-page-enter">
        <SpaceBackground />

        {!userDetails && <UserDetailsModal onSubmit={setUserDetails} />}

        <div
          className={
            userDetails
              ? "transition-all duration-500"
              : "pointer-events-none blur-[4px] select-none opacity-70 transition-all duration-500"
          }
        >
          <Header points={points} target={target} />
          <Hero />

          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start">
              <FortuneWheel onWin={handleWin} spinsUsed={spinsUsed} />
              <ChatInterface
                unlocked={unlocked}
                target={100}
                points={points}
                userDetails={userDetails}
                onChatComplete={handleChatComplete}
              />
            </div>
          </main>
          
          <SeoContent />
          <Footer />
        </div>
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
