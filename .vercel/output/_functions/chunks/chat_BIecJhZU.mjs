import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { r as TRANSLATIONS, t as SYSTEM_PROMPT } from "./constants_Di_yv4Zb.mjs";
//#region src/pages/api/chat.js
var chat_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
async function POST({ request }) {
	try {
		const { userQuestion, userDetails, lang } = await request.json();
		const prompt = SYSTEM_PROMPT.replace("{name}", userDetails?.name || "Seeker").replace("{dob}", userDetails?.dob || "Unknown").replace("{time}", userDetails?.time || "Unknown").replace("{place}", userDetails?.place || "Unknown").replace("{language}", TRANSLATIONS[lang]?.langName || "English").replace("{current_time}", (/* @__PURE__ */ new Date()).toLocaleString());
		const groqKey = "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";
		const geminiKey = "AQ.Ab8RN6JQoG-1V-1MoFDxuXOAzdJAHqf2P_x9D39sCJFpnhcgIg";
		let success = false;
		let reply = "";
		for (let i = 0; i < 3; i++) try {
			const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${groqKey}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					model: "qwen/qwen3.6-27b",
					messages: [{
						role: "system",
						content: prompt
					}, {
						role: "user",
						content: userQuestion
					}]
				})
			});
			if (res.ok) {
				reply = ((await res.json()).choices[0]?.message?.content || "").replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
				success = true;
				break;
			} else if (res.status === 429 || res.status === 502 || res.status === 503) await new Promise((resolve) => setTimeout(resolve, 1500));
			else break;
		} catch (fetchErr) {
			await new Promise((resolve) => setTimeout(resolve, 1500));
		}
		if (!success && geminiKey) for (let i = 0; i < 3; i++) try {
			const res = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${geminiKey}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					model: "gemini-3.5-flash",
					messages: [{
						role: "system",
						content: prompt
					}, {
						role: "user",
						content: userQuestion
					}]
				})
			});
			if (res.ok) {
				reply = ((await res.json()).choices[0]?.message?.content || "").replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
				success = true;
				break;
			} else if (res.status === 429 || res.status === 502 || res.status === 503) await new Promise((resolve) => setTimeout(resolve, 1500));
			else break;
		} catch (fetchErr) {
			await new Promise((resolve) => setTimeout(resolve, 1500));
		}
		if (success) return new Response(JSON.stringify({ reply }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
		else return new Response(JSON.stringify({ error: "All API Requests Failed" }), { status: 500 });
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
	}
}
//#endregion
//#region \0virtual:astro:page:src/pages/api/chat@_@js
var page = () => chat_exports;
//#endregion
export { page };
