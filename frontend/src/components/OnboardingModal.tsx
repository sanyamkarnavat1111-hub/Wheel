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

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(212,175,55,0.15)',
    borderRadius: '12px',
    padding: '12px 16px',
    color: '#e8e4f5',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    colorScheme: 'dark',
  };

  const selectStyle: React.CSSProperties = {
    flex: 1,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(212,175,55,0.15)',
    borderRadius: '10px',
    padding: '10px 6px',
    color: '#e8e4f5',
    fontSize: '0.85rem',
    outline: 'none',
    textAlign: 'center',
    cursor: 'pointer',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: 'rgba(136,146,176,0.7)',
    fontSize: '0.68rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '8px',
    fontWeight: 500,
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', overflowY: 'auto',
      background: 'rgba(6,6,20,0.85)',
      backdropFilter: 'blur(20px)',
    }}>
      {/* Radial glow behind card */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 65%)',
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        transition={{ duration: 0.45, ease: [0.4,0,0.2,1] }}
        style={{
          width: '100%', maxWidth: '440px', margin: 'auto', position: 'relative',
          background: 'rgba(10,10,30,0.92)',
          backdropFilter: 'blur(32px)',
          border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: '24px',
          padding: '2rem 2rem 2.5rem',
          boxShadow: '0 0 0 1px rgba(212,175,55,0.08), 0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(212,175,55,0.08)',
        }}
      >
        {/* Top gold accent line */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '120px', height: '2px', borderRadius: '1px',
          background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
        }} />

        {/* Language selector */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <select
              value={i18n.language}
              onChange={e => i18n.changeLanguage(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '999px',
                paddingLeft: '14px', paddingRight: '30px', paddingTop: '7px', paddingBottom: '7px',
                color: '#e8e4f5', fontSize: '0.82rem', fontWeight: 500,
                cursor: 'pointer', outline: 'none',
              }}
            >
              {[['en','English'],['hi','हिंदी'],['mr','मराठी'],['gu','ગુજરાતી']].map(([v,l]) => (
                <option key={v} value={v} style={{ background: '#0c0c24' }}>{l}</option>
              ))}
            </select>
            <svg style={{ position:'absolute', right:'10px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none', color:'rgba(212,175,55,0.6)' }} width="12" height="12" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </div>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🕉️</div>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: '1.2rem', color: '#d4af37', marginBottom: '0.5rem', lineHeight: 1.3 }}>
            {t('modal_title')}
          </h2>
          <p style={{ color: 'rgba(136,146,176,0.6)', fontSize: '0.78rem', lineHeight: 1.6 }}>
            {t('modal_subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {/* Name */}
          <div>
            <label style={labelStyle}>{t('name_label')}</label>
            <input
              type="text" name="name" required
              value={formData.name} onChange={handleChange}
              placeholder="e.g. Priya Sharma"
              style={inputStyle}
              onFocus={e  => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; }}
              onBlur={e   => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)'; }}
            />
          </div>

          {/* DOB + Time */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={labelStyle}>{t('dob_label')}</label>
              <input
                type="date" name="dob" required
                value={formData.dob} onChange={handleChange}
                style={{ ...inputStyle }}
                onFocus={e  => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; }}
                onBlur={e   => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)'; }}
              />
            </div>
            <div>
              <label style={labelStyle}>{t('time_label')}</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <select name="time_hr" value={formData.time_hr} onChange={handleChange} style={selectStyle}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                    <option key={h} value={h.toString().padStart(2,'0')} style={{ background: '#0c0c24' }}>{h.toString().padStart(2,'0')}</option>
                  ))}
                </select>
                <span style={{ color: 'rgba(212,175,55,0.5)', fontWeight: 700, fontSize: '1rem' }}>:</span>
                <select name="time_min" value={formData.time_min} onChange={handleChange} style={selectStyle}>
                  {Array.from({ length: 60 }, (_, i) => i).map(m => (
                    <option key={m} value={m.toString().padStart(2,'0')} style={{ background: '#0c0c24' }}>{m.toString().padStart(2,'0')}</option>
                  ))}
                </select>
                <select name="ampm" value={formData.ampm} onChange={handleChange} style={selectStyle}>
                  {['AM','PM'].map(v => <option key={v} value={v} style={{ background: '#0c0c24' }}>{v}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Place */}
          <div>
            <label style={labelStyle}>{t('place_label')}</label>
            <input
              type="text" name="place" required
              value={formData.place} onChange={handleChange}
              placeholder="e.g. Mumbai, India"
              style={inputStyle}
              onFocus={e  => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; }}
              onBlur={e   => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)'; }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={{
              width: '100%', marginTop: '0.5rem',
              padding: '14px',
              background: 'linear-gradient(135deg, #f5a623, #d4af37)',
              color: '#060614',
              border: 'none', borderRadius: '14px',
              fontFamily: 'Cinzel, serif', fontWeight: 700,
              fontSize: '0.95rem', letterSpacing: '0.12em',
              cursor: 'pointer',
              boxShadow: '0 0 24px rgba(245,166,35,0.35), 0 4px 20px rgba(0,0,0,0.3)',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(245,166,35,0.6), 0 8px 25px rgba(0,0,0,0.4)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(245,166,35,0.35), 0 4px 20px rgba(0,0,0,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {t('start_btn')}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
