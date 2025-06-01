from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from dotenv import load_dotenv
import os

from src.database import init_db
from src.routers import auth, chat, patients

load_dotenv()

origins = [
  os.getenv("VITE_APP_URL"), # Frontend URL from environment variable
  "http://localhost:5137" # Local development URL
  "https://patient-assistant.vercel.app"  # Your deployed frontend
]
print(f"Allowed origins: {origins}")
app = FastAPI(
  title="Dental Clinic Patient Assistant API",
  description="AI-powered patient management system for dental clinics",
  version="1.0.0",
)

# Initialize the database
@app.on_event("startup")
def on_startup():
  init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

@app.get("/")
async def root():
    return {"message": "Dental Clinic Patient Assistant API"}

@app.get("/health")
async def health_check():
  return {"status": "healthy"}

app.include_router(auth.router, prefix="/api", tags=["Authentication"])
app.include_router(patients.router, prefix="/api", tags=["Patients"])
app.include_router(chat.router, prefix="/api", tags=["Chat"])