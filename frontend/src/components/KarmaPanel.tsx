import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface Props {
  points: number;
  threshold: number;
  onAskQuestion: (question: string) => void;
  loadingReading: boolean;
  readingData: { reading: string } | null;
}

export default function KarmaPanel({ points, threshold, onAskQuestion, loadingReading, readingData }: Props) {
  const { t } = useTranslation();
  const [question, setQuestion] = useState('');

  const progress = Math.min((points / threshold) * 100, 100);
  const isUnlocked = points >= threshold;
  const remaining = threshold - points;

  return (
    <div className="flex flex-col gap-[var(--space-4)] w-full">
      {/* ─── Karma Score ─── */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-[var(--space-4)] sm:p-[var(--space-5)]">
        <div className="flex items-baseline justify-between mb-[var(--space-3)]">
          <div>
            <p className="text-[var(--text-caption)] uppercase tracking-[0.14em] text-[var(--color-text-secondary)] font-medium mb-[var(--space-1)]">
              {t('karma_points')}
            </p>
            <motion.span
              key={points}
              initial={{ opacity: 0.6, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              className="block font-[var(--font-display)] font-black text-[var(--text-display)] leading-none text-[var(--color-accent-bright)]"
            >
              {points.toLocaleString()}
            </motion.span>
          </div>
          <div className="text-right">
            <p className="text-[var(--text-caption)] text-[var(--color-text-secondary)] uppercase tracking-[0.1em]">{t('goal_label')}</p>
            <p className="font-[var(--font-display)] font-bold text-[var(--text-h3)] text-[var(--color-accent)]">
              {t('goal_threshold', { threshold: threshold.toLocaleString() })}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-bright)]"
          />
        </div>

        <p className="mt-[var(--space-2)] text-[var(--text-small)] text-[var(--color-text-secondary)]">
          {isUnlocked ? t('unlocked') : t('earn_more', { points: remaining.toLocaleString() })}
        </p>
      </div>

      {/* ─── Interaction Area ─── */}
      <AnimatePresence mode="wait">
        {loadingReading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-[var(--space-5)] flex flex-col items-center justify-center gap-[var(--space-3)] min-h-[120px]"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="w-8 h-8 rounded-full border-2 border-[var(--color-accent)]/30 border-t-[var(--color-accent)]"
            />
            <p className="text-[var(--color-accent)] font-[var(--font-display)] text-[var(--text-body)]">
              {t('reading_loading')}
            </p>
          </motion.div>
        ) : readingData ? (
          <motion.div
            key="reading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--color-surface)] border border-[var(--color-border-active)] rounded-2xl p-[var(--space-4)] sm:p-[var(--space-5)] max-h-[35vh] overflow-y-auto scroll-area"
          >
            <h3 className="font-[var(--font-display)] text-[var(--color-accent-bright)] text-[var(--text-h3)] mb-[var(--space-3)] pb-[var(--space-2)] border-b border-[var(--color-border)]">
              {t('reading_title')}
            </h3>
            <p className="text-[var(--color-text-primary)]/90 text-[var(--text-body)] leading-relaxed">
              {readingData.reading}
            </p>
          </motion.div>
        ) : isUnlocked ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--color-surface)] border border-[var(--color-accent-dim)] rounded-2xl p-[var(--space-4)] sm:p-[var(--space-5)]"
          >
            <h3 className="font-[var(--font-display)] text-[var(--color-accent)] text-[var(--text-h3)] mb-[var(--space-3)]">
              {t('ask_universe')}
            </h3>
            <textarea
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder={t('question_placeholder')}
              rows={3}
              className="w-full resize-none bg-white/[0.03] border border-[var(--color-border)] rounded-xl p-[var(--space-3)] text-[var(--color-text-primary)] text-[var(--text-body)] outline-none transition-colors duration-200 focus:border-[var(--color-border-active)] placeholder:text-[var(--color-text-muted)] mb-[var(--space-3)]"
              aria-label={t('question_placeholder')}
            />
            <button
              onClick={() => { if (question.trim()) onAskQuestion(question); }}
              disabled={!question.trim()}
              className="w-full py-2.5 rounded-xl font-[var(--font-display)] font-bold text-[var(--text-body)] tracking-[0.1em] border-none transition-all duration-200 disabled:bg-white/[0.04] disabled:text-[var(--color-text-muted)] disabled:cursor-not-allowed enabled:bg-gradient-to-br enabled:from-[var(--color-accent-bright)] enabled:to-[var(--color-accent)] enabled:text-[var(--color-bg)] enabled:cursor-pointer enabled:hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] enabled:hover:-translate-y-0.5 enabled:active:translate-y-0"
            >
              {t('consult')}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-dashed border-[var(--color-border)] rounded-2xl p-[var(--space-5)] flex flex-col items-center justify-center text-center min-h-[100px]"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-muted)] mb-[var(--space-2)]" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <p className="text-[var(--text-small)] text-[var(--color-text-secondary)] max-w-[220px] leading-relaxed">
              {t('reading_locked')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
