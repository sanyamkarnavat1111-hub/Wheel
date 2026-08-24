import { SYSTEM_PROMPT, TRANSLATIONS } from '../../../config/constants.js';

export const prerender = false;

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { userQuestion, userDetails, lang } = body;

    const prompt = SYSTEM_PROMPT
      .replace("{name}", userDetails?.name || "Seeker")
      .replace("{dob}", userDetails?.dob || "Unknown")
      .replace("{time}", userDetails?.time || "Unknown")
      .replace("{place}", userDetails?.place || "Unknown")
      .replace("{language}", TRANSLATIONS[lang]?.langName || "English")
      .replace("{current_time}", new Date().toLocaleString());

    // Reading the secret keys from the environment on the server side
    const groqKey = import.meta.env.GROQ_API_KEY || process.env.GROQ_API_KEY;
    const geminiKey = import.meta.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (!groqKey && !geminiKey) {
      return new Response(JSON.stringify({ error: "API Keys missing" }), { status: 500 });
    }

    let success = false;
    let reply = "";

    // Primary: Groq API
    if (groqKey) {
      for (let i = 0; i < 3; i++) {
        try {
          const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${groqKey}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: "qwen/qwen3.6-27b",
              messages: [
                { role: "system", content: prompt },
                { role: "user", content: userQuestion }
              ]
            })
          });
          
          if (res.ok) {
            const data = await res.json();
            let rawReply = data.choices[0]?.message?.content || "";
            reply = rawReply.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
            success = true;
            break;
          } else if (res.status === 429 || res.status === 502 || res.status === 503) {
            await new Promise(resolve => setTimeout(resolve, 1500));
          } else {
            break; // 401, 404, etc. Break to fallback
          }
        } catch (fetchErr) {
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      }
    }

    // Fallback: Gemini API
    if (!success && geminiKey) {
      for (let i = 0; i < 3; i++) {
        try {
          const res = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${geminiKey}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: "gemini-3.5-flash",
              messages: [
                { role: "system", content: prompt },
                { role: "user", content: userQuestion }
              ]
            })
          });
          
          if (res.ok) {
            const data = await res.json();
            let rawReply = data.choices[0]?.message?.content || "";
            reply = rawReply.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
            success = true;
            break;
          } else if (res.status === 429 || res.status === 502 || res.status === 503) {
            await new Promise(resolve => setTimeout(resolve, 1500));
          } else {
            break;
          }
        } catch (fetchErr) {
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      }
    }

    if (success) {
      return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ error: "All API Requests Failed" }), { status: 500 });
    }

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
