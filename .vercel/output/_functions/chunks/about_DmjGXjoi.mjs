import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_DRZx3es3.mjs";
import { t as createComponent } from "./compiler_BPuUg46I.mjs";
import { n as $$Layout, t as Footer } from "./Footer_BUn6bchD.mjs";
import "./global_CYrFcs1D.mjs";
//#region src/pages/about.astro
var about_exports = /* @__PURE__ */ __exportAll({
	default: () => $$About,
	file: () => $$file,
	url: () => $$url
});
var $$About = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About Us | AstroWheel" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="min-h-screen text-[#f0eef7] flex flex-col font-sans"><header class="w-full border-b border-white/10 py-4 bg-[#07070b]/80 backdrop-blur-md sticky top-0 z-50"><div class="max-w-4xl mx-auto px-6"><a href="/" class="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#e8b866] to-[#cf9a67]">AstroWheel</a></div></header><main class="flex-1 max-w-4xl mx-auto px-6 py-12"><h1 class="text-4xl sm:text-5xl font-display font-bold mb-8">About Us</h1><div class="space-y-6 text-[#7d7c8e] leading-relaxed"><p>Welcome to <strong>AstroWheel</strong>, a digital sanctuary created by <strong>Artificial Grrow</strong> where the ancient wisdom of Vedic astrology meets the boundless possibilities of modern artificial intelligence.</p><h2 class="text-2xl text-white font-semibold mt-8 mb-4">Our Mission</h2><p>Our mission is to make the profound insights of astrology accessible, engaging, and personalized for everyone. We believe that the cosmic patterns mapped out at the time of your birth hold unique guidance for your life's journey. By combining deep astrological computation with advanced generative AI, we bridge the gap between traditional stargazing and modern technology.</p><h2 class="text-2xl text-white font-semibold mt-8 mb-4">What We Do</h2><p>AstroWheel provides an interactive "Fortune Wheel" experience that allows you to gather cosmic energy, which unlocks direct access to your personal AI Astrologer. Using your specific birth details—time, place, and date—our AI synthesizes planetary alignments to provide insightful, bite-sized guidance in multiple languages, including English, Hindi, Marathi, and Gujarati.</p><h2 class="text-2xl text-white font-semibold mt-8 mb-4">Who We Are</h2><p>We are <strong>Artificial Grrow</strong>, a team of innovators and creators passionate about building interactive, AI-driven experiences that bring value, entertainment, and reflection to our users. We respect the traditions of astrology while pushing the boundaries of what's possible with modern web technology.</p><p class="mt-8">Thank you for joining us on this celestial journey. Keep spinning, keep seeking, and let the stars guide you.</p></div></main>${renderComponent($$result, "Footer", Footer, {})}</div>` })}`;
}, "C:/Users/Sanyam/Desktop/Artifical-Grrow/Kundali-Wheel/src/pages/about.astro", void 0);
var $$file = "C:/Users/Sanyam/Desktop/Artifical-Grrow/Kundali-Wheel/src/pages/about.astro";
var $$url = "/about";
//#endregion
//#region \0virtual:astro:page:src/pages/about@_@astro
var page = () => about_exports;
//#endregion
export { page };
