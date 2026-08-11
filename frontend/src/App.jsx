import React, { useState, useEffect } from 'react';
import SpaceBackground from './components/SpaceBackground';
import FortuneWheel from './components/FortuneWheel';
import UserDetailsModal from './components/UserDetailsModal';
import ChatInterface from './components/ChatInterface';

function App() {
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('astro_points');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [targetPoints, setTargetPoints] = useState(() => {
    const saved = localStorage.getItem('astro_target');
    return saved ? parseInt(saved, 10) : 500;
  });

  const [userDetails, setUserDetails] = useState(() => {
    const saved = localStorage.getItem('astro_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!userDetails) {
      setShowModal(true);
    }
  }, [userDetails]);

  useEffect(() => {
    localStorage.setItem('astro_points', points.toString());
    localStorage.setItem('astro_target', targetPoints.toString());
  }, [points, targetPoints]);

  const handlePointsWon = (wonPoints) => {
    setPoints(prev => {
      const newPoints = prev + wonPoints;
      // If we cross the target, unlock chat (or increment target)
      if (newPoints >= targetPoints) {
        setTargetPoints(prevTarget => prevTarget + 500);
        // Play confetti or some animation here maybe
      }
      return newPoints;
    });
  };

  const isChatUnlocked = points >= 500;

  return (
    <div className="relative min-h-screen w-full font-sans text-slate-100 selection:bg-purple-500/30">
      <SpaceBackground />
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-6 z-40 flex justify-between items-center bg-transparent">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-900 border border-purple-500/30 shadow-lg shadow-purple-900/50 flex items-center justify-center text-xl font-bold">
            🔮
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-indigo-100">
              AstroWheel
            </h1>
            <p className="text-xs text-purple-300/70 uppercase tracking-widest font-semibold">
              Destiny Awaits
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-2xl px-6 py-2 shadow-xl shadow-black/50">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
              Cosmic Energy
            </div>
            <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-orange-400">
              {points} / {targetPoints}
            </div>
          </div>
          <div className="mt-2 text-xs text-purple-300/80 font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-purple-500/20">
            {targetPoints - points > 0 ? `${targetPoints - points} points to next unlock` : 'Chat Unlocked!'}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 pt-32 pb-10 px-4 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 max-w-7xl mx-auto">
        <div className="w-full lg:w-1/2 flex justify-center">
          <FortuneWheel onSpinEnd={handlePointsWon} />
        </div>
        
        <div className="w-full lg:w-1/2 flex justify-center h-[600px]">
          <ChatInterface isUnlocked={isChatUnlocked} userDetails={userDetails} />
        </div>
      </main>

      {/* Modals */}
      {showModal && (
        <UserDetailsModal 
          onSave={(details) => {
            setUserDetails(details);
            localStorage.setItem('astro_user', JSON.stringify(details));
            setShowModal(false);
          }} 
        />
      )}
    </div>
  );
}

export default App;
