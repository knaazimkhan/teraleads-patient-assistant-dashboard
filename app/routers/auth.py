from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
import jwt
import os

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..core.jwt import create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

class LoginRequest(BaseModel):
  username: str
  password: str

def create_token(data: dict, expires_delta: timedelta = timedelta(hours=1)):
  to_encode = data.copy()
  expire = datetime.utcnow() + expires_delta
  to_encode.update({"exp": expire})
  return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
  try:
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
  except jwt.PyJWTError:
    raise HTTPException(status_code=401, detail="Invalid token")

@router.post("/login")
async def login(request: LoginRequest):
  # Dummy auth logic
  if request.username == "admin" and request.password == "admin":
      token = create_access_token({"sub": request.username})
      return {"access_token": token, "token_type": "bearer"}
  raise HTTPException(status_code=401, detail="Invalid username or password")
  
# @router.post("/login")
# def login(form_data: OAuth2PasswordRequestForm = Depends()):
#   # Dummy single user
#   print(f"Login attempt with username: {form_data}")
#   if form_data.username == "admin" and form_data.password == "admin":
#     token = create_token({"sub": form_data.username})
#     return {"access_token": token, "token_type": "bearer"}
#   raise HTTPException(status_code=401, detail="Invalid credentials")

def get_current_user(token: str = Depends(oauth2_scheme)):
  payload = decode_token(token)
  return payload.get("sub")
