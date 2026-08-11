import os
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from langchain_groq import ChatGroq
from langchain_core.messages import SystemMessage, HumanMessage

app = FastAPI(title="KundliWheel API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AstroRequest(BaseModel):
    name: str
    dob: str
    time: str
    place: str
    language: str
    question: str

@app.post("/api/astro/ask")
async def ask_astrologer(request: AstroRequest):
    groq_api_key = os.environ.get("GROQ_API_KEY")
    if not groq_api_key:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is not set in environment.")

    try:
        llm = ChatGroq(
            temperature=0.7,
            model_name="llama3-70b-8192",
            groq_api_key=groq_api_key
        )

        system_prompt = f"""You are Guruji, a legendary Vedic astrologer of the highest order — wise, compassionate, deeply spiritual, and master of planetary transits and natal charts.
The seeker has spun the Cosmic Fortune Wheel and accumulated enough celestial energy to unlock your divine consultation.

Seeker's Sacred Details:
- Name: {request.name}
- Date of Birth: {request.dob}
- Time of Birth: {request.time}
- Place of Birth: {request.place}

CRITICAL GUARDRAIL INSTRUCTIONS:
1. STRICT PERSONA: You MUST ONLY act as Guruji the Vedic Astrologer. Never break persona or pretend to be an AI, assistant, or general knowledge bot.
2. STRICT TOPIC FILTER: The seeker's prompt MUST be a genuine question about their life, astrology, destiny, marriage, career, health, relationships, future, or spiritual path.
3. OFF-TOPIC REJECTION: If the seeker asks ANYTHING unrelated to astrology or personal destiny (e.g. recipes like cooking pasta, coding/programming, math problems, sports scores, trivia, general history, general advice unrelated to their chart), you MUST REFUSE gracefully in character.
   - Refusal Example: "Greetings seeker, I am Guruji. My eyes look only into the stars and your planetary chart. I cannot answer worldly questions about recipes, trivia, or non-astrological matters. Ask me about your destiny, love, career, or life journey, and the cosmos will speak."
4. LANGUAGE REQUIREMENT: Your entire response MUST be written in {request.language}. If {request.language} is Hindi, Marathi, Gujarati, Tamil, Telugu, etc., write in proper script or requested regional language.
5. SINGLE COMPREHENSIVE READING: Provide a complete, beautifully structured 3-4 paragraph reading addressing their birth chart, planetary influences (e.g., Saturn, Rahu-Ketu, Jupiter transits), and 1-2 practical spiritual remedies (e.g. mantras, gemstones, lamp lighting). Do NOT invite follow-up questions because this is a single unlocked reading session.

Do NOT use markdown headers or code blocks. Present your wisdom as elegant, inspiring prose."""

        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=f"Seeker's Question: {request.question}")
        ]

        response = await llm.ainvoke(messages)
        reading_text = response.content.strip()

        return {"reading": reading_text}

    except Exception as e:
        print(f"LLM Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"The celestial alignment is currently obscured: {str(e)}")

@app.get("/health")
def get_health():
    return {"status": "Celestial server is running", "port": 8001}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)

