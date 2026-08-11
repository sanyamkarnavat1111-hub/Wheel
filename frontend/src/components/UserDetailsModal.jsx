import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, Clock, User } from 'lucide-react';

export default function UserDetailsModal({ onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    time: '',
    ampm: 'AM'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.place && formData.time) {
      onSave(formData);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl bg-slate-900/60 p-8 shadow-[0_0_40px_rgba(139,92,246,0.3)] backdrop-blur-xl border border-purple-500/30"
        >
          {/* Decorative gradients */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Sparkles className="w-8 h-8 text-amber-200" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-indigo-200">
              Seek Your Destiny
            </h2>
            <p className="text-center text-purple-200/60 mb-8 text-sm">
              Enter your celestial coordinates to align the stars.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-purple-300 uppercase tracking-wider pl-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50" />
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-950/50 border border-purple-500/20 rounded-xl py-3 pl-10 pr-4 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-purple-300 uppercase tracking-wider pl-1">Place of Birth</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50" />
                  <input 
                    type="text" 
                    required
                    value={formData.place}
                    onChange={(e) => setFormData({...formData, place: e.target.value})}
                    className="w-full bg-slate-950/50 border border-purple-500/20 rounded-xl py-3 pl-10 pr-4 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-purple-300 uppercase tracking-wider pl-1">Time of Birth</label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50" />
                    <input 
                      type="time" 
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full bg-slate-950/50 border border-purple-500/20 rounded-xl py-3 pl-10 pr-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all [color-scheme:dark]"
                    />
                  </div>
                  <select 
                    value={formData.ampm}
                    onChange={(e) => setFormData({...formData, ampm: e.target.value})}
                    className="w-24 bg-slate-950/50 border border-purple-500/20 rounded-xl py-3 px-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none text-center"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-bold text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:from-purple-500 hover:to-indigo-500 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Reveal My Path
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
