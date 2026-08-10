import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from langchain_core.prompts import PromptTemplate
from langchain_groq import ChatGroq
from langchain_core.output_parsers import PydanticOutputParser

app = FastAPI(title="KundliWheel API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class WheelRequest(BaseModel):
    name: str
    dob: str
    time: str
    place: str
    category: str
    tier: str
    language: str
    custom_question: Optional[str] = None

class AIReading(BaseModel):
    reading: str
    lucky_number: Optional[int] = None
    auspicious_date: Optional[str] = None
    lucky_color: Optional[str] = None

@app.post("/api/astro/wheel-reading", response_model=AIReading)
async def get_wheel_reading(request: WheelRequest):
    groq_api_key = os.getenv("GROQ_API_KEY")
    if not groq_api_key:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is not set in environment variables.")

    try:
        llm = ChatGroq(temperature=0.7, model_name="llama3-70b-8192", groq_api_key=groq_api_key)
        parser = PydanticOutputParser(pydantic_object=AIReading)
        
        tier_instructions = {
            "Standard": "Provide a 2-3 sentence personalized astrological prediction about the category based heavily on their birth details.",
            "Fortunate": "Provide a personalized astrological prediction about the category AND calculate their lucky number for the week regarding this category.",
            "Auspicious": "Answer their custom question (if provided) or provide a prediction. Also provide their lucky number AND calculate an exact auspicious date/time (Muhurat) to take action in this category.",
            "Divine": "Provide a deep, extensive destiny reading answering their custom question (if provided), their lucky number, an auspicious time/date, AND their lucky color for this specific category."
        }
        
        base_instruction = tier_instructions.get(request.tier, tier_instructions["Standard"])
        
        custom_q_prompt = ""
        if request.custom_question:
            custom_q_prompt = f"\nThe user has asked this specific custom question: '{request.custom_question}'. You MUST answer this question based on their astrological chart."

        prompt_template = """
        You are an expert, compassionate Vedic astrologer. 
        A user has spun the Kundli Wheel and landed on the category: {category}.
        
        User Birth Details:
        - Name: {name}
        - Date of Birth: {dob}
        - Time of Birth: {time}
        - Place of Birth: {place}
        
        Your task for this specific spin (Tier: {tier}):
        {base_instruction}
        {custom_q_prompt}
        
        IMPORTANT: Your entire response (reading, strings) must be written fluently in {language}. If the language is Hindi, Marathi, or Gujarati, use the native script.
        
        Format your response exactly according to these formatting instructions:
        {format_instructions}
        """
        
        prompt = PromptTemplate(
            template=prompt_template,
            input_variables=["name", "dob", "time", "place", "category", "tier", "base_instruction", "custom_q_prompt", "language"],
            partial_variables={"format_instructions": parser.get_format_instructions()}
        )
        
        chain = prompt | llm | parser
        
        response = await chain.ainvoke({
            "name": request.name,
            "dob": request.dob,
            "time": request.time,
            "place": request.place,
            "category": request.category,
            "tier": request.tier,
            "base_instruction": base_instruction,
            "custom_q_prompt": custom_q_prompt,
            "language": request.language
        })
        
        return response
        
    except Exception as e:
        print(f"Error generating reading: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate cosmic reading")


@app.get("/health")
def get_health():
    return "server is running.."


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
