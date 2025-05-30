# Option 1: Dummy reply (no external API)
def generate_ai_response(message: str) -> str:
  # Basic prompt engineering mock
  return f"You asked: '{message}'. This is a sample AI reply."

# Option 2: Use OpenAI (if you have an API key)
# import openai
# import os
# from typing import Optional

# # Set OpenAI API key
# openai.api_key = os.getenv("OPENAI_API_KEY")

# DENTAL_SYSTEM_PROMPT = """
# You are a helpful AI assistant for a dental clinic. You provide general dental health information and guidance to patients. 

# Important guidelines:
# - Always remind users that your advice is for informational purposes only
# - Encourage users to consult with their dental professional for specific medical advice
# - Be empathetic and understanding about dental anxiety
# - Provide helpful, accurate information about common dental procedures and oral health
# - If asked about specific medical conditions or treatments, recommend consulting with a dentist
# - Keep responses concise but informative
# - Use a friendly, professional tone

# You should help with:
# - General oral hygiene tips
# - Information about common dental procedures
# - Addressing dental anxiety
# - Explaining dental terminology
# - Providing pre and post-treatment care instructions
# - Scheduling and appointment-related questions
# """

# async def get_ai_response(message: str, patient_context: Optional[str] = None) -> str:
#   """
#   Generate AI response using OpenAI API with dental clinic context
#   """
#   try:
#     # Prepare the prompt with context
#     user_prompt = message
#     if patient_context:
#       user_prompt = f"Patient context: {patient_context}\n\nQuestion: {message}"

#     # Call OpenAI API
#     response = await openai.chat.completions.create(
#       model="gpt-4",
#       messages=[
#         {"role": "system", "content": DENTAL_SYSTEM_PROMPT},
#         {"role": "user", "content": user_prompt}
#       ],
#       max_tokens=150,  # Limit response length
#       temperature=0.7,  # Control randomness
#       top_p=1.0,  # Use nucleus sampling
#       frequency_penalty=0.0,  # No penalty for repeated phrases
#       presence_penalty=0.0  # No penalty for new topics
#     )
    
#     return response.choices[0].message.content.strip()
  
#   except Exception as e:
#     print(f"OpenAI API error: {e}")
#     # Fallback response
#     return generate_fallback_response(message)

# def generate_fallback_response(message: str) -> str:
#   """
#   Generate a fallback response when OpenAI API is not available
#   """
#   message_lower = message.lower()
    
#   # Simple keyword-based responses
#   if any(word in message_lower for word in ['pain', 'hurt', 'ache']):
#       return "I understand you're experiencing discomfort. For any dental pain, it's important to contact your dentist as soon as possible. In the meantime, you can try rinsing with warm salt water and taking over-the-counter pain medication as directed. Please remember this is general advice - your dentist can provide specific treatment for your situation."
  
#   elif any(word in message_lower for word in ['appointment', 'schedule', 'booking']):
#       return "For appointment scheduling, please contact our office directly. Our staff can help you find a convenient time and answer any questions about your upcoming visit. If you have specific concerns about your appointment, feel free to discuss them with our team."
  
#   elif any(word in message_lower for word in ['cleaning', 'hygiene', 'brush']):
#       return "Great question about oral hygiene! Regular brushing twice daily with fluoride toothpaste, daily flossing, and routine dental cleanings are essential for maintaining good oral health. Your dental hygienist can provide personalized tips during your next visit."
  
#   elif any(word in message_lower for word in ['anxiety', 'nervous', 'scared']):
#       return "It's completely normal to feel anxious about dental visits. Many patients share these feelings. Our team is experienced in helping patients feel comfortable and relaxed. Please let us know about your concerns so we can make your visit as pleasant as possible."
  
#   else:
#       return "Thank you for your question. While I'd love to help, I recommend discussing this with your dental professional who can provide personalized advice based on your specific situation. Our team is always here to help address your concerns during your visit."