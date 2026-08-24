import { f as renderHead, m as createRenderInstruction, p as addAttribute, s as renderSlot, u as renderTemplate, x as createAstro } from "./server_DRZx3es3.mjs";
import { t as createComponent } from "./compiler_BPuUg46I.mjs";
import "./global_CYrFcs1D.mjs";
import { n as TOKENS } from "./constants_Di_yv4Zb.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title = "AstroWheel" } = Astro.props;
	return renderTemplate`<html lang="en"><head><!-- Google tag (gtag.js) --><script async src="https://www.googletagmanager.com/gtag/js?id=G-18NDWS5Z3L"><\/script><script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-18NDWS5Z3L');
    <\/script><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"><link rel="manifest" href="/site.webmanifest"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>${title}</title>${renderScript($$result, "C:/Users/Sanyam/Desktop/Artifical-Grrow/Kundali-Wheel/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")}${renderHead($$result)}</head><body class="bg-[#07070b] overflow-x-hidden">${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "C:/Users/Sanyam/Desktop/Artifical-Grrow/Kundali-Wheel/src/layouts/Layout.astro", void 0);
//#endregion
//#region src/components/Footer.jsx
function Footer() {
	const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
	return /* @__PURE__ */ jsx("footer", {
		className: "w-full border-t py-8 mt-12 shrink-0 relative z-10",
		style: {
			borderColor: TOKENS.line,
			background: "linear-gradient(180deg, rgba(7,7,11,0.4), #07070b)"
		},
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-sm font-medium",
				style: { color: TOKENS.mist },
				children: [
					"© ",
					currentYear,
					" Artificial Grrow. All rights reserved."
				]
			}), /* @__PURE__ */ jsxs("nav", {
				className: "flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium",
				children: [
					/* @__PURE__ */ jsx("a", {
						href: "/about",
						className: "hover:text-white transition-colors",
						style: { color: TOKENS.copper },
						children: "About Us"
					}),
					/* @__PURE__ */ jsx("a", {
						href: "/contact",
						className: "hover:text-white transition-colors",
						style: { color: TOKENS.copper },
						children: "Contact Us"
					}),
					/* @__PURE__ */ jsx("a", {
						href: "/privacy",
						className: "hover:text-white transition-colors",
						style: { color: TOKENS.violet },
						children: "Privacy Policy"
					}),
					/* @__PURE__ */ jsx("a", {
						href: "/terms",
						className: "hover:text-white transition-colors",
						style: { color: TOKENS.violet },
						children: "Terms & Conditions"
					})
				]
			})]
		})
	});
}
//#endregion
export { $$Layout as n, Footer as t };
