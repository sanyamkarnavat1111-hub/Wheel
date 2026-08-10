import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import CosmicCanvas from './components/CosmicCanvas';
import OnboardingModal from './components/OnboardingModal';
import FortuneWheel from './components/FortuneWheel';
import GamificationPanel from './components/GamificationPanel';

function App() {
  const { t, i18n } = useTranslation();
  const [userData, setUserData] = useState<{ name: string; dob: string; time: string; place: string } | null>(null);
  const [spinning, setSpinning] = useState(false);

  // Gamification State
  const [karmaPoints, setKarmaPoints] = useState(0);
  const [loadingReading, setLoadingReading] = useState(false);
  const [readingData, setReadingData] = useState<any | null>(null);
  const GOAL_THRESHOLD = 1000;

  useEffect(() => {
    const u = localStorage.getItem('kundli_user');
    if (u) setUserData(JSON.parse(u));
    const p = localStorage.getItem('karma_points');
    if (p) setKarmaPoints(parseInt(p));
  }, []);

  const handleSpinComplete = (points: number) => {
    const newPoints = karmaPoints + points;
    setKarmaPoints(newPoints);
    localStorage.setItem('karma_points', newPoints.toString());
  };

  const handleAskQuestion = async (question: string) => {
    if (karmaPoints < GOAL_THRESHOLD) return;

    setLoadingReading(true);
    setReadingData(null);
    try {
      const res = await fetch('http://localhost:8001/api/astro/wheel-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userData?.name, dob: userData?.dob,
          time: userData?.time, place: userData?.place,
          category: 'general', tier: 'Divine',
          language: i18n.language, custom_question: question,
        }),
      });
      setReadingData(await res.json());

      const remainingPoints = Math.max(0, karmaPoints - GOAL_THRESHOLD);
      setKarmaPoints(remainingPoints);
      localStorage.setItem('karma_points', remainingPoints.toString());

    } catch {
      setReadingData({ reading: 'The cosmic energies are realigning. Ensure the backend is running and the GROQ API key is configured.', lucky_number: null, auspicious_date: null, lucky_color: null });
    } finally {
      setLoadingReading(false);
    }
  };

  return (
    <>
      <CosmicCanvas />

      {!userData && (
        <OnboardingModal
          onComplete={d => { setUserData(d); localStorage.setItem('kundli_user', JSON.stringify(d)); }}
        />
      )}

      <div className="app-layer flex flex-col min-h-screen lg:h-screen lg:overflow-hidden">
        {/* ──────────────── HEADER ──────────────── */}
        <header className="flex-shrink-0 relative z-30 flex items-center justify-between px-4 py-3 md:px-8 bg-[#060614]/80 backdrop-blur-md border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-['Cinzel'] font-extrabold text-[#060614] shadow-[0_2px_12px_rgba(212,175,55,0.4)]" style={{ background: 'linear-gradient(135deg,#f5c842,#b8862a)' }}>
              YV
            </div>
            <span className="hidden sm:inline font-['Cinzel'] text-lg font-bold text-[#e8e4f5]/90 tracking-wide">
              {t('app_title')}
            </span>
          </div>

          <div className="flex items-center gap-6">
            {userData && (
              <div className="hidden md:block text-right">
                <p className="text-[#e8e4f5] text-sm font-semibold">{userData.name}</p>
                <p className="text-[#8892b0]/70 text-xs">{userData.dob} · {userData.place}</p>
              </div>
            )}
            <div className="relative">
              <select
                value={i18n.language}
                onChange={e => i18n.changeLanguage(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 rounded-full py-2 pl-4 pr-10 text-[#e8e4f5] text-sm outline-none cursor-pointer font-['Inter']"
              >
                {[['en', 'English'], ['hi', 'हिंदी'], ['mr', 'मराठी'], ['gu', 'ગુજરાતી']].map(([v, l]) => (
                  <option key={v} value={v} className="bg-[#0c0c24]">{l}</option>
                ))}
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#D4AF37]/80" width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </header>

        {/* ──────────────── HERO ──────────────── */}
        <div className="flex-shrink-0 text-center px-4 py-3 lg:py-4">
          <h1 className="font-['Cinzel'] font-black text-3xl md:text-5xl leading-tight mb-2 text-transparent bg-clip-text bg-gradient-to-br from-[#f5c842] via-[#d4af37] to-[#f0c040]">
            {t('discover_destiny')}
          </h1>
          <p className="text-[#8892b0]/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-['Inter']">
            {t('hero_subtitle')}
          </p>
        </div>

        {/* ──────────────── MAIN LAYOUT ──────────────── */}
        <main className="flex-1 min-h-0 px-4 pb-6 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 overflow-y-auto lg:overflow-hidden">

          {/* ── LEFT COLUMN — Gamification Panel ── */}
          <div className="flex flex-col w-full lg:w-1/2 max-w-[500px] flex-shrink-0 animate-[fade-in_0.5s_ease-out] justify-center h-full">
            <GamificationPanel
              points={karmaPoints}
              threshold={GOAL_THRESHOLD}
              onAskQuestion={handleAskQuestion}
              loadingReading={loadingReading}
              readingData={readingData}
            />

            <div className="text-center mt-6">
              <a
                href="https://yogvivaah.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#8892b0]/50 tracking-wide font-['Inter'] hover:text-[#D4AF37]/80 transition-colors"
              >
                {t('join_yogvivaah')}
              </a>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Fortune Wheel ── */}
          <div className="flex flex-col items-center justify-center w-full lg:w-1/2 h-full min-h-[450px] lg:min-h-0">
            <FortuneWheel
              onSpinComplete={handleSpinComplete}
              spinning={spinning}
              setSpinning={setSpinning}
            />
          </div>

        </main>
      </div>
    </>
  );
}

export default App;
