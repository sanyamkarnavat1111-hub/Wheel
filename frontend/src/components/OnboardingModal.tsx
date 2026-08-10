import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface Props {
  onComplete: (data: { name: string; dob: string; time: string; place: string }) => void;
}

export default function OnboardingModal({ onComplete }: Props) {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({ name: '', dob: '', hr: '12', min: '00', ampm: 'AM', place: '' });

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.dob && form.place) {
      onComplete({ name: form.name, dob: form.dob, time: `${form.hr}:${form.min} ${form.ampm}`, place: form.place });
    }
  };

  const inputClass = "w-full bg-white/[0.04] border border-[var(--color-border)] rounded-lg py-2.5 px-3 text-[var(--color-text-primary)] text-[var(--text-body)] outline-none transition-colors duration-200 focus:border-[var(--color-border-active)] [color-scheme:dark] placeholder:text-[var(--color-text-muted)]";
  const labelClass = "block text-[var(--color-text-secondary)] text-[var(--text-caption)] uppercase tracking-[0.12em] mb-[var(--space-1)] font-medium";
  const selectClass = "flex-1 bg-white/[0.04] border border-[var(--color-border)] rounded-lg py-2 px-1 text-[var(--color-text-primary)] text-[var(--text-small)] text-center outline-none cursor-pointer focus:border-[var(--color-border-active)]";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-[var(--space-4)] overflow-y-auto bg-[var(--color-bg)]/90 backdrop-blur-lg"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-[420px] relative bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-[var(--space-6)] sm:p-[var(--space-8)] shadow-[0_24px_64px_rgba(0,0,0,0.5)]"
      >
        {/* Accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" aria-hidden="true" />

        {/* Language picker */}
        <div className="flex justify-end mb-[var(--space-4)]">
          <select
            value={i18n.language}
            onChange={e => i18n.changeLanguage(e.target.value)}
            className="bg-white/[0.04] border border-[var(--color-border)] rounded-full py-1 pl-3 pr-6 text-[var(--color-text-primary)] text-[var(--text-small)] cursor-pointer outline-none focus:border-[var(--color-border-active)]"
            aria-label="Language"
          >
            {(['en', 'hi', 'mr', 'gu'] as const).map(code => (
              <option key={code} value={code} className="bg-[#0c0c24]">{t(`lang_${code}`)}</option>
            ))}
          </select>
        </div>

        {/* Header */}
        <header className="text-center mb-[var(--space-6)]">
          <h2
            id="onboarding-title"
            className="font-[var(--font-display)] font-bold text-[var(--text-h2)] text-[var(--color-accent)] mb-[var(--space-2)] leading-tight"
          >
            {t('modal_title')}
          </h2>
          <p className="text-[var(--color-text-secondary)] text-[var(--text-small)] leading-relaxed">
            {t('modal_subtitle')}
          </p>
        </header>

        {/* Form */}
        <form onSubmit={submit} className="flex flex-col gap-[var(--space-4)]">
          <div>
            <label htmlFor="ob-name" className={labelClass}>{t('name_label')}</label>
            <input id="ob-name" type="text" name="name" required value={form.name} onChange={update} placeholder="Priya Sharma" className={inputClass} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-3)]">
            <div>
              <label htmlFor="ob-dob" className={labelClass}>{t('dob_label')}</label>
              <input id="ob-dob" type="date" name="dob" required value={form.dob} onChange={update} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('time_label')}</label>
              <div className="flex items-center gap-1">
                <select name="hr" value={form.hr} onChange={update} className={selectClass} aria-label="Hour">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                    <option key={h} value={h.toString().padStart(2, '0')} className="bg-[#0c0c24]">{h.toString().padStart(2, '0')}</option>
                  ))}
                </select>
                <span className="text-[var(--color-accent)]/50 font-bold">:</span>
                <select name="min" value={form.min} onChange={update} className={selectClass} aria-label="Minute">
                  {Array.from({ length: 60 }, (_, i) => i).map(m => (
                    <option key={m} value={m.toString().padStart(2, '0')} className="bg-[#0c0c24]">{m.toString().padStart(2, '0')}</option>
                  ))}
                </select>
                <select name="ampm" value={form.ampm} onChange={update} className={selectClass} aria-label="AM or PM">
                  <option value="AM" className="bg-[#0c0c24]">AM</option>
                  <option value="PM" className="bg-[#0c0c24]">PM</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="ob-place" className={labelClass}>{t('place_label')}</label>
            <input id="ob-place" type="text" name="place" required value={form.place} onChange={update} placeholder="Mumbai, India" className={inputClass} />
          </div>

          <button
            type="submit"
            className="mt-[var(--space-2)] w-full py-3 rounded-xl font-[var(--font-display)] font-bold text-[var(--text-body)] tracking-[0.12em] bg-gradient-to-br from-[var(--color-accent-bright)] to-[var(--color-accent)] text-[var(--color-bg)] border-none cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_36px_rgba(212,175,55,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            {t('start_btn')}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
