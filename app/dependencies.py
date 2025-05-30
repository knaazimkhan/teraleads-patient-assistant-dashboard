from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from core import jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
  payload = jwt.decode_access_token(token)
  if payload is None:
    raise HTTPException(status_code=401, detail="Invalid or expired token")
  return payload["sub"]
