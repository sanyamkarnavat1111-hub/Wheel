import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import CosmicCanvas from './components/CosmicCanvas';
import OnboardingModal from './components/OnboardingModal';
import FortuneWheel from './components/FortuneWheel';
import KarmaPanel from './components/KarmaPanel';

function App() {
  const { t, i18n } = useTranslation();
  const [userData, setUserData] = useState<{ name: string; dob: string; time: string; place: string } | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [karmaPoints, setKarmaPoints] = useState(0);
  const [loadingReading, setLoadingReading] = useState(false);
  const [readingData, setReadingData] = useState<{ reading: string } | null>(null);

  const GOAL_THRESHOLD = 1000;

  useEffect(() => {
    const u = localStorage.getItem('kundli_user');
    if (u) setUserData(JSON.parse(u));
    const p = localStorage.getItem('karma_points');
    if (p) setKarmaPoints(parseInt(p));
  }, []);

  const handleSpinComplete = (points: number) => {
    const next = karmaPoints + points;
    setKarmaPoints(next);
    localStorage.setItem('karma_points', next.toString());
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
      const remaining = Math.max(0, karmaPoints - GOAL_THRESHOLD);
      setKarmaPoints(remaining);
      localStorage.setItem('karma_points', remaining.toString());
    } catch {
      setReadingData({ reading: 'The cosmic energies are realigning. Ensure the backend is running and the GROQ API key is configured.' });
    } finally {
      setLoadingReading(false);
    }
  };

  return (
    <>
      <CosmicCanvas />

      {!userData && (
        <OnboardingModal onComplete={d => { setUserData(d); localStorage.setItem('kundli_user', JSON.stringify(d)); }} />
      )}

      <div className="app-shell">
        {/* ─── Header ─── */}
        <header className="flex-shrink-0 flex items-center justify-between px-[var(--space-4)] sm:px-[var(--space-6)] lg:px-[var(--space-8)] py-[var(--space-3)] border-b border-[var(--color-border)] bg-[var(--color-bg)]/70 backdrop-blur-md">
          <div className="flex items-center gap-[var(--space-2)] sm:gap-[var(--space-3)]">
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-[var(--font-display)] font-bold text-[10px] sm:text-xs text-[var(--color-bg)] bg-gradient-to-br from-[var(--color-accent-bright)] to-[var(--color-accent)] shadow-[0_2px_8px_rgba(212,175,55,0.3)]"
              aria-hidden="true"
            >
              YV
            </div>
            <div className="hidden sm:block">
              <span className="font-[var(--font-display)] text-[var(--text-body)] font-bold text-[var(--color-text-primary)] tracking-wide">
                {t('app_title')}
              </span>
              <span className="ml-[var(--space-2)] text-[var(--text-caption)] text-[var(--color-text-muted)]">
                {t('tagline')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-[var(--space-3)] sm:gap-[var(--space-5)]">
            {userData && (
              <div className="text-right hidden sm:block">
                <p className="text-[var(--text-small)] text-[var(--color-text-primary)] font-medium truncate max-w-[140px]">{userData.name}</p>
                <p className="text-[var(--text-caption)] text-[var(--color-text-muted)]">{userData.place}</p>
              </div>
            )}
            <select
              value={i18n.language}
              onChange={e => i18n.changeLanguage(e.target.value)}
              className="bg-white/[0.04] border border-[var(--color-border)] rounded-full py-1.5 pl-3 pr-6 text-[var(--color-text-primary)] text-[var(--text-small)] cursor-pointer outline-none focus:border-[var(--color-border-active)]"
              aria-label="Language"
            >
              {(['en', 'hi', 'mr', 'gu'] as const).map(code => (
                <option key={code} value={code} className="bg-[#0c0c24]">{t(`lang_${code}`)}</option>
              ))}
            </select>
          </div>
        </header>

        {/* ─── Main Content ─── */}
        <main className="flex-1 min-h-0 overflow-y-auto lg:overflow-hidden scroll-area">
          <div className="h-full flex flex-col lg:flex-row items-center lg:items-stretch max-w-[1400px] mx-auto px-[var(--space-4)] sm:px-[var(--space-6)] lg:px-[var(--space-8)] py-[var(--space-4)] lg:py-[var(--space-6)] gap-[var(--space-6)] lg:gap-[var(--space-10)]">

            {/* ─── Wheel Column (shows first on mobile) ─── */}
            <section className="order-1 lg:order-2 w-full lg:w-[55%] flex flex-col items-center justify-center min-h-[320px] sm:min-h-[380px] lg:min-h-0 lg:h-full">
              <FortuneWheel
                onSpinComplete={handleSpinComplete}
                spinning={spinning}
                setSpinning={setSpinning}
              />
            </section>

            {/* ─── Info Column ─── */}
            <section className="order-2 lg:order-1 w-full lg:w-[45%] flex flex-col justify-center gap-[var(--space-4)] max-w-[480px] mx-auto lg:mx-0 lg:max-w-none lg:h-full">
              {/* Hero text */}
              <div className="text-center lg:text-left">
                <h1 className="font-[var(--font-display)] font-black text-[var(--text-display)] leading-tight text-[var(--color-accent-bright)] mb-[var(--space-2)]">
                  {t('discover_destiny')}
                </h1>
                <p className="text-[var(--text-body)] text-[var(--color-text-secondary)] leading-relaxed max-w-[400px] mx-auto lg:mx-0">
                  {t('hero_subtitle')}
                </p>
              </div>

              {/* Karma panel */}
              <KarmaPanel
                points={karmaPoints}
                threshold={GOAL_THRESHOLD}
                onAskQuestion={handleAskQuestion}
                loadingReading={loadingReading}
                readingData={readingData}
              />

              {/* Footer link */}
              <p className="text-center lg:text-left">
                <a
                  href="https://yogvivaah.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-caption)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-200"
                >
                  {t('join_yogvivaah')}
                </a>
              </p>
            </section>

          </div>
        </main>
      </div>
    </>
  );
}

export default App;
