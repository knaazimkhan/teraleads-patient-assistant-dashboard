from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
import os

from src.schemas import (
  LoginRequest,
  UserCreate, UserResponse, Token,
)
from src.database import get_db
from src.crud import (
  create_user, authenticate_user,
  get_user_by_email
)
from src.auth import (
  create_access_token,
  get_current_user,
  verify_token
)

router = APIRouter(prefix="/auth")
security = HTTPBearer()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate, db: Session = Depends(get_db)):
  db_user = create_user(db, user)
  if not db_user:
    raise HTTPException(
      status_code=400,
      detail="Email already registered"
    )
  return db_user

@router.post("/login", response_model=Token)
async def login(request: LoginRequest, db: Session = Depends(get_db)):
  authenticated_user = authenticate_user(db, request.email, request.password)
  if not authenticated_user:
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect email or password",
        headers={"WWW-Authenticate": "Bearer"},
    )
  access_token = create_access_token(data={"sub": authenticated_user.email})
  return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
async def get_me(
  credentials: HTTPAuthorizationCredentials = Depends(security),
  db: Session = Depends(get_db)
):
    try:
      token = credentials.credentials
      email = verify_token(token)
    except Exception:
      raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
      )
    
    current_user = get_user_by_email(db, email)
    if not current_user:
      raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Not authenticated",
        headers={"WWW-Authenticate": "Bearer"},
      )
    return current_user

@router.post("/logout")
async def logout(credentials: HTTPAuthorizationCredentials = Depends(security)):
    # Invalidate the token (if using a token store, otherwise just return success)
    return {"message": "Successfully logged out"}

@router.post("/refresh")
async def refresh_token(
  credentials: HTTPAuthorizationCredentials = Depends(security),
  db: Session = Depends(get_db)
):
    try:
      token = credentials.credentials
      email = verify_token(token)
    except Exception:
      raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
      )
    current_user = get_user_by_email(db, email)
    if not current_user:
      raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not refresh token",
        headers={"WWW-Authenticate": "Bearer"},
      )
    new_token = create_access_token(data={"sub": current_user.email})
    return {"access_token": new_token, "token_type": "bearer"}