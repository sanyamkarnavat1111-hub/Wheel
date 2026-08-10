import { useEffect, useState } from 'react';

interface Props {
  score: number | null;
  spinning: boolean;
}

export default function ScoreReel({ score, spinning }: Props) {
  const [displayScore, setDisplayScore] = useState<number>(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (spinning) {
      interval = setInterval(() => {
        setDisplayScore(Math.floor(Math.random() * 9000) + 100);
      }, 100);
    } else if (score !== null) {
      setDisplayScore(score);
    }
    return () => clearInterval(interval);
  }, [spinning, score]);

  return (
    <div className="bg-cream border border-secondary/30 rounded-xl p-6 shadow-soft flex flex-col items-center justify-center">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-dark/60 mb-2">Energy Score</h3>
      <div className="flex space-x-2 overflow-hidden h-16 bg-white border border-secondary/20 rounded-lg px-4 py-2 w-full justify-center">
        {spinning ? (
          <div className="text-4xl font-playfair font-bold text-primary animate-pulse tracking-widest">
            {displayScore.toString().padStart(4, '0')}
          </div>
        ) : (
          <div className="text-4xl font-playfair font-bold text-primary tracking-widest transition-all duration-1000">
            {displayScore.toString().padStart(4, '0')}
          </div>
        )}
      </div>
    </div>
  );
}
