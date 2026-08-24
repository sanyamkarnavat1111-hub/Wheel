import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_DRZx3es3.mjs";
import { t as createComponent } from "./compiler_BPuUg46I.mjs";
import { n as $$Layout, t as Footer } from "./Footer_BUn6bchD.mjs";
import "./global_CYrFcs1D.mjs";
//#region src/pages/contact.astro
var contact_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Contact,
	file: () => $$file,
	url: () => $$url
});
var $$Contact = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contact Us | AstroWheel" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="min-h-screen text-[#f0eef7] flex flex-col font-sans"><header class="w-full border-b border-white/10 py-4 bg-[#07070b]/80 backdrop-blur-md sticky top-0 z-50"><div class="max-w-4xl mx-auto px-6"><a href="/" class="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#e8b866] to-[#cf9a67]">AstroWheel</a></div></header><main class="flex-1 max-w-4xl mx-auto px-6 py-12"><h1 class="text-4xl sm:text-5xl font-display font-bold mb-8">Contact Us</h1><div class="space-y-6 text-[#7d7c8e] leading-relaxed"><p>We're always here to help you navigate the cosmos. If you have any questions, feedback, or need support with AstroWheel, please don't hesitate to reach out to us.</p><div class="bg-[#111119] border border-white/10 rounded-2xl p-6 mt-8"><h2 class="text-xl text-white font-semibold mb-4">Get in Touch</h2><p class="mb-2"><strong>Company:</strong> Artificial Grrow</p><p class="mb-4"><strong>Email Support:</strong> <a href="mailto:sanyam.karnavat5@gmail.com" class="text-[#8b7bff] hover:underline">sanyam.karnavat5@gmail.com</a></p><p class="text-sm mt-4 italic">We aim to respond to all cosmic inquiries within 24-48 business hours.</p></div><h2 class="text-2xl text-white font-semibold mt-8 mb-4">Feedback & Bug Reports</h2><p>If you encounter any issues where the AI Astrologer is not responding or the Fortune Wheel is stuck, please send us an email with the subject line <strong>"Bug Report"</strong> so we can prioritize fixing the alignment of the stars for you!</p></div></main>${renderComponent($$result, "Footer", Footer, {})}</div>` })}`;
}, "C:/Users/Sanyam/Desktop/Artifical-Grrow/Kundali-Wheel/src/pages/contact.astro", void 0);
var $$file = "C:/Users/Sanyam/Desktop/Artifical-Grrow/Kundali-Wheel/src/pages/contact.astro";
var $$url = "/contact";
//#endregion
//#region \0virtual:astro:page:src/pages/contact@_@astro
var page = () => contact_exports;
//#endregion
export { page };
