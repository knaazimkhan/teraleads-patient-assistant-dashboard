from fastapi import APIRouter, Depends
from pydantic import BaseModel

from ..schemas import (
  ChatResponse,
  ChatMessage
)

from ..auth import get_current_user
from ..ai import generate_ai_response

router = APIRouter(tags=["Chat"])

# Option 1: Dummy reply (no external API)
@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatMessage, _: str = Depends(get_current_user)):
  ai_response = generate_ai_response(request.message)
  return ChatResponse(
    message=request.message,
    response=ai_response,
    timestamp=request.timestamp
  )

# Option 2: Use OpenAI (if you have an API key)
# @router.post("/chat", response_model=ChatResponse)
# async def chat_endpoint(
#   message: ChatMessage,
#   _: str = Depends(get_current_user)
# ):
#   try:
#     ai_response = await get_ai_response(message.message, message.patient_context)
#     return ChatResponse(
#         message=message.message,
#         response=ai_response,
#         timestamp=message.timestamp
#     )
#   except Exception as e:
#     # Fallback response if AI service fails
#     return ChatResponse(
#         message=message.message,
#         response="I apologize, but I'm experiencing technical difficulties. Please consult with your dental professional for specific medical advice.",
#         timestamp=message.timestamp
#     )