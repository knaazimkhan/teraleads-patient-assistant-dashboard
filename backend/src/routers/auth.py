from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import os

from src.schemas import (
  LoginRequest,
  UserCreate, UserResponse, Token,
)
from src.database import get_db
from src.crud import (
  create_user, authenticate_user
)
from src.auth import (
  create_access_token,
  get_current_user
)

router = APIRouter(prefix="/auth")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

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
async def get_me(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    current_user = get_current_user(db, token)
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return current_user

@router.post("/logout")
async def logout(token: str = Depends(oauth2_scheme)):
    # Invalidate the token (if using a token store, otherwise just return success)
    return {"message": "Successfully logged out"}

@router.post("/refresh")
async def refresh_token(token: str = Depends(oauth2_scheme)):
    # Refresh the token logic (if using a token store, otherwise just return a new token)
    current_user = get_current_user(token=token)
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    new_token = create_access_token(data={"sub": current_user.email})
    return {"access_token": new_token, "token_type": "bearer"}