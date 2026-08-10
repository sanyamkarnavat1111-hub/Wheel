import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface Props {
  onComplete: (data: { name: string; dob: string; time: string; place: string }) => void;
}

export default function OnboardingModal({ onComplete }: Props) {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({ name: '', dob: '', time_hr: '12', time_min: '00', ampm: 'AM', place: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.dob && formData.place) {
      onComplete({ name: formData.name, dob: formData.dob, time: `${formData.time_hr}:${formData.time_min} ${formData.ampm}`, place: formData.place });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-[#060614]/85 backdrop-blur-[20px]">
      {/* Radial glow behind card */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 65%)',
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.4,0,0.2,1] }}
        className="w-full max-w-[400px] sm:max-w-[440px] relative bg-[#0a0a1e]/92 backdrop-blur-[32px] border border-[#D4AF37]/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-[0_0_0_1px_rgba(212,175,55,0.08),0_30px_80px_rgba(0,0,0,0.6),0_0_60px_rgba(212,175,55,0.08)]"
      >
        {/* Top gold accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] sm:w-[120px] h-[2px] rounded-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

        {/* Language selector */}
        <div className="flex justify-end mb-3 sm:mb-5">
          <div className="relative">
            <select
              value={i18n.language}
              onChange={e => i18n.changeLanguage(e.target.value)}
              className="appearance-none bg-white/5 border border-[#D4AF37]/20 rounded-full pl-3 pr-7 py-1.5 text-[#e8e4f5] text-xs sm:text-sm font-medium cursor-pointer outline-none"
            >
              {[['en','English'],['hi','हिंदी'],['mr','मराठी'],['gu','ગુજરાતી']].map(([v,l]) => (
                <option key={v} value={v} className="bg-[#0c0c24]">{l}</option>
              ))}
            </select>
            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#D4AF37]/60" width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="text-2xl sm:text-3xl mb-2 sm:mb-3"
          >
            🕉️
          </motion.div>
          <h2 className="font-['Cinzel'] font-bold text-base sm:text-lg text-[#d4af37] mb-1.5 sm:mb-2 leading-tight">
            {t('modal_title')}
          </h2>
          <p className="text-[#8892b0]/60 text-[11px] sm:text-xs leading-relaxed">
            {t('modal_subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          {/* Name */}
          <div>
            <label className="block text-[#8892b0]/70 text-[10px] sm:text-[11px] uppercase tracking-[0.1em] mb-1.5 font-medium">
              {t('name_label')}
            </label>
            <input
              type="text" name="name" required
              value={formData.name} onChange={handleChange}
              placeholder="e.g. Priya Sharma"
              className="w-full bg-white/[0.04] border border-[#D4AF37]/15 rounded-xl py-2.5 sm:py-3 px-3 sm:px-4 text-[#e8e4f5] text-sm outline-none transition-colors focus:border-[#D4AF37]/50 [color-scheme:dark]"
            />
          </div>

          {/* DOB + Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#8892b0]/70 text-[10px] sm:text-[11px] uppercase tracking-[0.1em] mb-1.5 font-medium">
                {t('dob_label')}
              </label>
              <input
                type="date" name="dob" required
                value={formData.dob} onChange={handleChange}
                className="w-full bg-white/[0.04] border border-[#D4AF37]/15 rounded-xl py-2.5 sm:py-3 px-3 sm:px-4 text-[#e8e4f5] text-sm outline-none transition-colors focus:border-[#D4AF37]/50 [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-[#8892b0]/70 text-[10px] sm:text-[11px] uppercase tracking-[0.1em] mb-1.5 font-medium">
                {t('time_label')}
              </label>
              <div className="flex items-center gap-1">
                <select name="time_hr" value={formData.time_hr} onChange={handleChange}
                  className="flex-1 bg-white/[0.04] border border-[#D4AF37]/15 rounded-lg py-2 px-1.5 text-[#e8e4f5] text-xs sm:text-sm text-center outline-none cursor-pointer">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                    <option key={h} value={h.toString().padStart(2,'0')} className="bg-[#0c0c24]">{h.toString().padStart(2,'0')}</option>
                  ))}
                </select>
                <span className="text-[#D4AF37]/50 font-bold text-sm">:</span>
                <select name="time_min" value={formData.time_min} onChange={handleChange}
                  className="flex-1 bg-white/[0.04] border border-[#D4AF37]/15 rounded-lg py-2 px-1.5 text-[#e8e4f5] text-xs sm:text-sm text-center outline-none cursor-pointer">
                  {Array.from({ length: 60 }, (_, i) => i).map(m => (
                    <option key={m} value={m.toString().padStart(2,'0')} className="bg-[#0c0c24]">{m.toString().padStart(2,'0')}</option>
                  ))}
                </select>
                <select name="ampm" value={formData.ampm} onChange={handleChange}
                  className="flex-1 bg-white/[0.04] border border-[#D4AF37]/15 rounded-lg py-2 px-1.5 text-[#e8e4f5] text-xs sm:text-sm text-center outline-none cursor-pointer">
                  {['AM','PM'].map(v => <option key={v} value={v} className="bg-[#0c0c24]">{v}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Place */}
          <div>
            <label className="block text-[#8892b0]/70 text-[10px] sm:text-[11px] uppercase tracking-[0.1em] mb-1.5 font-medium">
              {t('place_label')}
            </label>
            <input
              type="text" name="place" required
              value={formData.place} onChange={handleChange}
              placeholder="e.g. Mumbai, India"
              className="w-full bg-white/[0.04] border border-[#D4AF37]/15 rounded-xl py-2.5 sm:py-3 px-3 sm:px-4 text-[#e8e4f5] text-sm outline-none transition-colors focus:border-[#D4AF37]/50 [color-scheme:dark]"
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(245,166,35,0.6), 0 8px 25px rgba(0,0,0,0.4)' }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-1 sm:mt-2 py-3 sm:py-3.5 bg-gradient-to-br from-[#f5a623] to-[#d4af37] text-[#060614] border-none rounded-xl font-['Cinzel'] font-bold text-sm sm:text-base tracking-[0.12em] cursor-pointer shadow-[0_0_24px_rgba(245,166,35,0.35),0_4px_20px_rgba(0,0,0,0.3)] transition-all"
          >
            {t('start_btn')}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
