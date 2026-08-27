import React, { useState } from 'react';
import { TOKENS, LanguageContext } from '../config/constants.js';
import { ChevronDown, Info } from 'lucide-react';

function SeoContent() {
  const { t } = React.useContext(LanguageContext);
  const [openFaq, setOpenFaq] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = t.faqs || [];

  return (
    <section className="w-full max-w-4xl mx-auto mt-4 px-4 sm:px-6 mb-8 text-[#f0eef7] font-sans">
      
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-4 flex items-center justify-center gap-2 text-sm font-semibold tracking-wide border border-white/10 rounded-2xl bg-black/20 hover:bg-black/40 transition-colors backdrop-blur-sm"
        style={{ color: TOKENS.mist }}
      >
        <Info className="w-4 h-4" />
        {isExpanded ? t.seoHide : t.seoReadMore}
        <ChevronDown 
          className="w-4 h-4 transition-transform duration-300"
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }} 
        />
      </button>

      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[5000px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}
      >
        <article className="max-w-none text-[#9a99a8] leading-relaxed text-sm sm:text-base mb-8">
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-white mb-6">
            {t.seoH2}
          </h2>
          
          <p className="mb-4">{t.seoP1}</p>
          <p className="mb-4">{t.seoP2}</p>

          <h3 className="text-lg sm:text-xl font-display font-semibold text-white mt-8 mb-4">
            {t.seoH3a}
          </h3>
          
          <p className="mb-4">{t.seoP3}</p>
          <p className="mb-4">{t.seoP4}</p>

          <h3 className="text-lg sm:text-xl font-display font-semibold text-white mt-8 mb-4">
            {t.seoH3b}
          </h3>
          
          <p className="mb-4">{t.seoP5}</p>

          <h3 className="text-lg sm:text-xl font-display font-semibold text-white mt-8 mb-4">
            {t.seoH3c}
          </h3>
          
          <p className="mb-8">{t.seoP6}</p>
        </article>
      </div>

      {/* FAQ Section Always Visible */}
      <div className="mt-8 pt-8 border-t border-white/10">
        <h2 className="text-xl sm:text-2xl font-display font-semibold text-white mb-6 text-center">
          {t.seoFaqTitle}
        </h2>
        
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-[#111119] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                boxShadow: openFaq === index ? `0 0 20px ${TOKENS.violet}15` : 'none',
                borderColor: openFaq === index ? `${TOKENS.violet}40` : 'rgba(255,255,255,0.05)'
              }}
            >
              <button
                className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
                onClick={() => toggleFaq(index)}
                aria-expanded={openFaq === index}
              >
                <span className="font-semibold text-sm sm:text-base text-white/90 pr-4">{faq.q}</span>
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-white/10"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <span className="text-lg font-light leading-none" style={{ color: TOKENS.mist }}>
                    {openFaq === index ? "−" : "+"}
                  </span>
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-5 text-[#9a99a8] text-sm leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SeoContent;
