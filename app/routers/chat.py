from fastapi import APIRouter, Depends
from pydantic import BaseModel

from . import auth
from .. import ai

router = APIRouter(tags=["Chat"])

class ChatRequest(BaseModel):
  question: str

class ChatResponse(BaseModel):
  reply: str

@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest, _: str = Depends(auth.get_current_user)):
  reply = ai.generate_ai_response(request.question)
  return {"reply": reply}
