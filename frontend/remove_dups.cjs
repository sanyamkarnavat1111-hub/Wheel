const fs = require('fs');

const path = './src/i18n.ts';
let content = fs.readFileSync(path, 'utf8');

// Replace duplicate "custom_q_placeholder" lines that occur BEFORE the end of the translations.
// Basically, we can just remove the FIRST occurrence of custom_q_placeholder in each language block.
// Let's just do a regex replace for the exact old ones.
content = content.replace(/"custom_q_placeholder": "Ask the stars your deepest question...",\n/g, '');
content = content.replace(/"custom_q_placeholder": "सितारों से अपना गहरा प्रश्न पूछें...",\n/g, '');
content = content.replace(/"custom_q_placeholder": "तारांना तुमचा खोल प्रश्न विचारा...",\n/g, '');
content = content.replace(/"custom_q_placeholder": "તારાઓને તમારો ઊંડો પ્રશ્ન પૂછો...",\n/g, '');

fs.writeFileSync(path, content, 'utf8');
