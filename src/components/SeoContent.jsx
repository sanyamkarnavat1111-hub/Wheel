import React, { useState } from 'react';
import { TOKENS } from '../config/constants.js';
import { ChevronDown } from 'lucide-react';

function SeoContent() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Where can I talk to an astrologer for free?",
      a: "You can experience an AI astrology free chat right here on AstroWheel. By simply spinning the Fortune Wheel, you earn cosmic energy points that allow you to talk to our advanced AI astrologer completely free of charge."
    },
    {
      q: "Which astrologer app is free?",
      a: "AstroWheel is a top-rated AI astrology app free of hidden fees. Unlike other platforms, you don't need to purchase credits. It is considered one of the best AI astrology free tools because you unlock your readings purely through interactive gameplay."
    },
    {
      q: "How to chat free with an astrologer online?",
      a: "To learn how to chat free with astrologer, simply enter your birth details on AstroWheel and spin the wheel. Once you reach 100 points, your private channel opens, granting you an instant AI astrology chat."
    },
    {
      q: "Can I ask an astrologer a free question?",
      a: "Yes! If you want to ask astrologer free one question, just gather enough energy points. You can ask an unlimited number of questions over time, making it an endless AI astrology free chat unlimited experience as long as you keep spinning."
    },
    {
      q: "Is this a ChatGPT astrology AI free service?",
      a: "Our platform is powered by highly advanced large language models, similar to a ChatGPT astrology AI free service, but rigorously specialized in traditional Vedic astrology. This ensures your readings are both mathematically precise and insightful."
    },
    {
      q: "Do I only get a free 5 minutes astrology AI reading?",
      a: "No! Many services offer a restricted free 5 minutes astrology AI session, but AstroWheel does not use timers. You can chat for as long as you want, provided you have earned the necessary question tickets from the wheel."
    },
    {
      q: "Who is the best astrologer for free chat?",
      a: "The best astrologer free chat is one that is always available and objective. Our AI astrologer never sleeps and provides instant, unbiased guidance based strictly on your unique birth chart alignments."
    },
    {
      q: "How can I talk to an astrologer for free without signing up?",
      a: "If you are wondering how can I talk to astrologer for free without giving away personal data, AstroWheel is the answer. We require no account creation, no passwords, and no emails, keeping your private astrological data strictly on your own device."
    }
  ];

  return (
    <section className="w-full max-w-4xl mx-auto mt-16 px-4 sm:px-6 mb-12 text-[#f0eef7] font-sans">
      
      {/* 600-word SEO Body Copy */}
      <article className="prose prose-invert max-w-none text-[#9a99a8] leading-relaxed">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white mb-6">
          Experience the Magic of a Free Astrologer Chat Online
        </h2>
        
        <p className="mb-4">
          Finding reliable guidance in the modern world can feel overwhelming, but AstroWheel bridges the gap between ancient wisdom and cutting-edge technology. At AstroWheel, we have reimagined how you connect with the stars by offering a completely <strong>free astrologer</strong> experience that requires absolutely zero upfront payments, wallet recharges, or hidden fees. Our unique platform introduces an interactive twist: by spinning our beautifully designed Fortune Wheel, you gather the cosmic energy required to unlock your personalized chat session.
        </p>
        
        <p className="mb-4">
          The concept is simple yet incredibly engaging. Once you arrive at AstroWheel, you begin by providing your basic birth details—your full name, date of birth, time of birth, and place of birth. These four crucial pieces of information act as the foundational coordinates for your entire cosmic map. Once your data is logged into your active session, the universe takes over. You spin the Fortune Wheel to collect energy points. The moment your energy gauge reaches 100 points, your direct channel to our <strong>free ai astrologer</strong> unlocks instantly.
        </p>

        <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mt-8 mb-4">
          How the Free Astrologer Consultation Works
        </h3>
        
        <p className="mb-4">
          Once your private channel is unlocked, you can type your most pressing life questions directly into the chat. Our intelligent system acts as a highly knowledgeable <strong>free astrologer chat ai</strong>. It instantly calculates your planetary placements, analyzing the precise positions of the sun, moon, and key planets at the exact moment you were born. It then compares these historical positions to current planetary transits.
        </p>
        
        <p className="mb-4">
          Because the system is powered by an advanced large language model trained on traditional Vedic astrology texts, it can synthesize complex astronomical data into easily understandable, bite-sized advice. Whether you prefer to ask your questions in English, Hindi, Marathi, or Gujarati, the AI will reply to you in the exact same language and script, providing an incredibly personalized <strong>free astrologer online</strong> experience.
        </p>

        <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mt-8 mb-4">
          What Can You Ask During Your Astrology Reading?
        </h3>
        
        <p className="mb-4">
          Users from all walks of life use AstroWheel to find clarity. The beauty of a <strong>free astrologer consultation</strong> is that no question is too big or too small. Are you wondering about your career trajectory and when you might land that highly anticipated promotion? Perhaps you are seeking insights into relationship compatibility, or asking, "When will I get married?" You can even use the platform for a daily horoscope check-in to see how the day's cosmic weather might affect your mood and productivity. 
        </p>

        <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mt-8 mb-4">
          Why Choose AstroWheel Over Paid Apps?
        </h3>
        
        <p className="mb-4">
          Traditional astrology applications often lure you in with a generic daily horoscope but lock the actual personalized chat behind expensive paywalls or confusing per-minute charging structures. AstroWheel eliminates the financial stress associated with seeking spiritual guidance. Every <strong>free astrologer talk</strong> is earned purely through your interaction with the Fortune Wheel. You get all the benefits of a deeply personalized, mathematically accurate birth chart reading without the premium price tag.
        </p>
        
        <p className="mb-8">
          Furthermore, we prioritize your digital safety. Unlike platforms that require you to create an account, verify an email, or surrender your data to third-party brokers, AstroWheel operates strictly on your local device. Your most sensitive astrological details remain private and are never saved to a central database. Join thousands of users who have discovered their path—spin the wheel and unlock your destiny today!
        </p>
      </article>

      {/* FAQ Section */}
      <div className="mt-12 pt-8 border-t border-white/10">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white mb-8 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
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
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => toggleFaq(index)}
                aria-expanded={openFaq === index}
              >
                <span className="font-semibold text-white/90 pr-4">{faq.q}</span>
                <ChevronDown 
                  className="w-5 h-5 shrink-0 transition-transform duration-300"
                  style={{ 
                    color: openFaq === index ? TOKENS.success : TOKENS.mist,
                    transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0)'
                  }} 
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-[#9a99a8] text-sm leading-relaxed">
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
