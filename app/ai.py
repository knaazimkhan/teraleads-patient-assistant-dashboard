# Option 1: Dummy reply (no external API)
def generate_ai_response(question: str) -> str:
  # Basic prompt engineering mock
  return f"You asked: '{question}'. This is a sample AI reply."

# Option 2: Use OpenAI (if you have an API key)
# import openai
# import os
#
# openai.api_key = os.getenv("OPENAI_API_KEY")
#
# def generate_ai_response(question: str) -> str:
#     prompt = f"A patient asks: '{question}'. Provide a helpful response."
#     response = openai.Completion.create(
#         engine="text-davinci-003",
#         prompt=prompt,
#         max_tokens=100
#     )
#     return response.choices[0].text.strip()
