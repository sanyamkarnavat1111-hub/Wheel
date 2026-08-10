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

export default function GamificationPanel({ points, threshold, onAskQuestion, loadingReading, readingData }: Props) {
  const { t } = useTranslation();
  const [question, setQuestion] = useState('');

  const progress = Math.min((points / threshold) * 100, 100);
  const isUnlocked = points >= threshold;

  return (
    <div className="flex flex-col justify-center gap-3 sm:gap-4 lg:gap-5">
      {/* ── Progress Card ── */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="animate-glow-pulse bg-[#0a081c]/70 backdrop-blur-xl border border-[#D4AF37]/15 rounded-2xl sm:rounded-[20px] p-4 sm:p-5 lg:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
      >
        <div className="flex justify-between items-end mb-3 sm:mb-4">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-[#8892b0]/60 font-semibold mb-0.5 sm:mb-1">
              {t('karma_points')}
            </p>
            <motion.div
              key={points}
              initial={{ opacity: 0.5, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-['Cinzel'] font-black text-3xl sm:text-4xl lg:text-5xl leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#f5c842] to-[#d4af37]"
            >
              {points.toLocaleString()}
            </motion.div>
          </div>
          <div className="text-right">
             <p className="text-xs sm:text-sm text-[#D4AF37]/80 font-['Cinzel'] font-semibold">
               {t('goal_threshold', { threshold: threshold.toLocaleString() })}
             </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 sm:h-2 rounded-full bg-white/5 overflow-hidden mb-2 sm:mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5C842] shadow-[0_0_10px_rgba(212,175,55,0.7)]"
          />
        </div>
        <p className="text-xs sm:text-sm text-[#8892b0]/60 leading-relaxed font-['Inter']">
          {!isUnlocked 
            ? t('earn_more_points', { points: (threshold - points).toLocaleString() }) 
            : t('cosmic_alignment_reached')}
        </p>
      </motion.div>

      {/* ── Interaction Area ── */}
      <AnimatePresence mode="wait">
        {loadingReading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#0a081c]/70 backdrop-blur-xl border border-[#D4AF37]/20 rounded-2xl sm:rounded-[20px] p-4 sm:p-6 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="mx-auto mb-3 w-8 h-8 sm:w-10 sm:h-10"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" strokeDasharray="30" strokeDashoffset="0" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="#f5c842" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.div>
            <p className="text-[#D4AF37] font-['Cinzel'] text-sm sm:text-lg">{t('reading_cosmic_energies')}</p>
          </motion.div>
        ) : readingData ? (
          <motion.div
            key="reading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0a081c]/85 backdrop-blur-xl border border-[#D4AF37]/40 rounded-2xl sm:rounded-[20px] p-4 sm:p-5 lg:p-6 shadow-[0_0_40px_rgba(212,175,55,0.15)] max-h-[30vh] sm:max-h-[35vh] overflow-y-auto custom-scrollbar"
          >
            <h3 className="font-['Cinzel'] text-[#F5C842] text-base sm:text-xl mb-2 sm:mb-3 border-b border-[#F5C842]/20 pb-2">
              {t('divine_insight')}
            </h3>
            <p className="text-[#e8e4f5]/85 text-xs sm:text-sm leading-relaxed font-['Inter']">
              {readingData.reading}
            </p>
          </motion.div>
        ) : isUnlocked ? (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#D4AF37]/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl sm:rounded-[20px] p-4 sm:p-5 lg:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          >
            <h3 className="font-['Cinzel'] text-[#D4AF37] text-base sm:text-lg mb-2 sm:mb-3">
              {t('ask_universe')}
            </h3>
            <textarea
              placeholder={t('custom_q_placeholder')}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full h-20 sm:h-24 resize-none bg-black/20 border border-[#D4AF37]/20 rounded-xl p-2.5 sm:p-3 text-[#e8e4f5] text-xs sm:text-sm font-['Inter'] outline-none mb-3 sm:mb-4 transition-colors focus:border-[#D4AF37]"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (question.trim()) onAskQuestion(question);
              }}
              disabled={!question.trim()}
              className={`w-full p-2.5 sm:p-3.5 rounded-xl border-none font-['Cinzel'] font-bold text-sm sm:text-base tracking-[0.1em] transition-all duration-300 ${
                question.trim() 
                  ? 'bg-gradient-to-br from-[#f5c842] to-[#d4af37] text-[#060614] cursor-pointer hover:shadow-[0_0_15px_rgba(245,196,66,0.5)]' 
                  : 'bg-white/5 text-[#8892b0]/30 cursor-not-allowed'
              }`}
            >
              {t('consult_stars')}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center border border-dashed border-[#8892b0]/20 rounded-2xl sm:rounded-[20px] p-4 sm:p-6 text-[#8892b0]/40 text-center"
          >
            <motion.svg
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-2 sm:mb-3 sm:w-10 sm:h-10"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </motion.svg>
            <p className="text-xs sm:text-sm max-w-[220px] leading-relaxed font-['Inter']">
              {t('reading_locked')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
