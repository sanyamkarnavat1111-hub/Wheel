const fs = require('fs');

const path = './src/i18n.ts';
let content = fs.readFileSync(path, 'utf8');

const newKeys = {
  en: {
    "karma_points": "Karma Points",
    "goal_threshold": "Goal: {{threshold}}",
    "earn_more_points": "Earn {{points}} more points to unlock a personalized cosmic reading.",
    "cosmic_alignment_reached": "You have reached cosmic alignment! You may now ask the stars a question.",
    "reading_cosmic_energies": "Reading the cosmic energies...",
    "divine_insight": "Divine Insight",
    "ask_universe": "Ask the Universe",
    "custom_q_placeholder": "E.g., Will I find success in my new business venture?",
    "consult_stars": "Consult the Stars",
    "reading_locked": "The cosmic reading is currently locked. Spin the wheel to gather Karma Points.",
    "points_earned": "+{{points}} Karma Points!",
    "hero_subtitle": "Spin the wheel to gather Karma Points. Align your cosmic energy and unlock divine insights into your future."
  },
  hi: {
    "karma_points": "कर्म अंक (Karma Points)",
    "goal_threshold": "लक्ष्य: {{threshold}}",
    "earn_more_points": "व्यक्तिगत ब्रह्मांडीय रीडिंग अनलॉक करने के लिए {{points}} अधिक अंक अर्जित करें।",
    "cosmic_alignment_reached": "आप ब्रह्मांडीय संरेखण तक पहुंच गए हैं! अब आप सितारों से एक प्रश्न पूछ सकते हैं।",
    "reading_cosmic_energies": "ब्रह्मांडीय ऊर्जा पढ़ रहे हैं...",
    "divine_insight": "दिव्य अंतर्दृष्टि",
    "ask_universe": "ब्रह्मांड से पूछें",
    "custom_q_placeholder": "उदा., क्या मुझे अपने नए व्यवसाय में सफलता मिलेगी?",
    "consult_stars": "सितारों से परामर्श लें",
    "reading_locked": "ब्रह्मांडीय रीडिंग वर्तमान में बंद है। कर्म अंक इकट्ठा करने के लिए चक्र घुमाएं।",
    "points_earned": "+{{points}} कर्म अंक!",
    "hero_subtitle": "कर्म अंक इकट्ठा करने के लिए चक्र घुमाएं। अपनी ब्रह्मांडीय ऊर्जा को संरेखित करें और भविष्य की दिव्य अंतर्दृष्टि अनलॉक करें।"
  },
  mr: {
    "karma_points": "कर्म गुण (Karma Points)",
    "goal_threshold": "लक्ष्य: {{threshold}}",
    "earn_more_points": "वैयक्तिकृत वैश्विक वाचन अनलॉक करण्यासाठी आणखी {{points}} गुण मिळवा.",
    "cosmic_alignment_reached": "तुम्ही वैश्विक संरेखनापर्यंत पोहोचला आहात! आता तुम्ही ताऱ्यांना एक प्रश्न विचारू शकता.",
    "reading_cosmic_energies": "वैश्विक ऊर्जा वाचत आहे...",
    "divine_insight": "दिव्य अंतर्दृष्टी",
    "ask_universe": "ब्रह्मांडाला विचारा",
    "custom_q_placeholder": "उदा., मला माझ्या नवीन व्यवसायात यश मिळेल का?",
    "consult_stars": "ताऱ्यांचा सल्ला घ्या",
    "reading_locked": "वैश्विक वाचन सध्या बंद आहे. कर्म गुण गोळा करण्यासाठी चक्र फिरवा.",
    "points_earned": "+{{points}} कर्म गुण!",
    "hero_subtitle": "कर्म गुण गोळा करण्यासाठी चक्र फिरवा. आपली वैश्विक ऊर्जा संरेखित करा आणि आपल्या भविष्याबद्दल दिव्य अंतर्दृष्टी अनलॉक करा."
  },
  gu: {
    "karma_points": "કર્મ પોઇન્ટ્સ (Karma Points)",
    "goal_threshold": "લક્ષ્ય: {{threshold}}",
    "earn_more_points": "વ્યક્તિગત બ્રહ્માંડીય રીડિંગ અનલૉક કરવા માટે વધુ {{points}} પોઇન્ટ્સ મેળવો.",
    "cosmic_alignment_reached": "તમે બ્રહ્માંડીય સંરેખણ સુધી પહોંચી ગયા છો! હવે તમે તારાઓને પ્રશ્ન પૂછી શકો છો.",
    "reading_cosmic_energies": "બ્રહ્માંડીય ઉર્જા વાંચી રહ્યા છીએ...",
    "divine_insight": "દૈવી આંતરદૃષ્ટિ",
    "ask_universe": "બ્રહ્માંડને પૂછો",
    "custom_q_placeholder": "દા.ત., શું મને મારા નવા વ્યવસાયમાં સફળતા મળશે?",
    "consult_stars": "તારાઓની સલાહ લો",
    "reading_locked": "બ્રહ્માંડીય રીડિંગ હાલમાં લૉક છે. કર્મ પોઇન્ટ્સ એકત્રિત કરવા માટે ચક્ર ફેરવો.",
    "points_earned": "+{{points}} કર્મ પોઇન્ટ્સ!",
    "hero_subtitle": "કર્મ પોઇન્ટ્સ એકત્રિત કરવા માટે ચક્ર ફેરવો. તમારી બ્રહ્માંડીય ઉર્જાને સંરેખિત કરો અને તમારા ભવિષ્યમાં દૈવી આંતરદૃષ્ટિને અનલૉક કરો."
  }
};

for (const lang of ['en', 'hi', 'mr', 'gu']) {
  const langKeys = newKeys[lang];
  const entries = Object.entries(langKeys).map(([k, v]) => `      "${k}": "${v}"`).join(',\n');
  
  const regex = new RegExp(`(${lang}:\\s*{\\s*translation:\\s*{[\\s\\S]*?)"cat_past_life":\\s*"([^"]*)"\\s*}`);
  content = content.replace(regex, (match, p1, p2) => {
    return p1 + `"cat_past_life": "` + p2 + `",\n` + entries + `\n    }`;
  });
}

fs.writeFileSync(path, content, 'utf8');
console.log('Updated i18n.ts successfully');
