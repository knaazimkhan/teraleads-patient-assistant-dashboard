from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import database
from .routers import auth, chat, patients

app = FastAPI()


@app.on_event("startup")

def on_startup():
  database.init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(patients.router)
app.include_router(chat.router)

@app.get("/")
def read_root():
  return {"Hello": "World"}

@app.get("/health")
def health_check():
  return {"status": "healthy"}

@app.get("/status")
def status_check():
  return {"status": "running"}

@app.get("/api")
def api_root():
  return {"message": "Welcome to the API"}

@app.get("/api/info")
def api_info():
  return {
    "name": "FastAPI Example",
    "version": "1.0.0",
    "description": "A simple FastAPI application with database integration."
  }

@app.get("/api/status")
def api_status():
  return {"status": "API is running smoothly"}

@app.get("/api/health")
def api_health():
  return {"status": "API is healthy"}

@app.get("/api/ping")
def api_ping():
  return {"message": "pong"}

