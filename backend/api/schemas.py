from pydantic import BaseModel, EmailStr
from datetime import datetime, date
from typing import Optional

class LoginRequest(BaseModel):
  email: EmailStr
  password: str

# User schemas
class UserCreate(BaseModel):
  email: EmailStr
  password: str

class UserResponse(BaseModel):
  id: int
  email: str
  created_at: datetime

  class Config:
    from_attributes = True

class Token(BaseModel):
  access_token: str
  token_type: str

# Patient schemas
class PatientBase(BaseModel):
  first_name: str
  last_name: str
  email: Optional[EmailStr] = None
  phone: Optional[str] = None
  date_of_birth: Optional[date] = None
  address: Optional[str] = None
  medical_history: Optional[str] = None
  dental_history: Optional[str] = None
  allergies: Optional[str] = None
  emergency_contact: Optional[str] = None

class PatientCreate(PatientBase):
  pass

class PatientUpdate(BaseModel):
  first_name: Optional[str] = None
  last_name: Optional[str] = None
  email: Optional[EmailStr] = None
  phone: Optional[str] = None
  date_of_birth: Optional[date] = None
  address: Optional[str] = None
  medical_history: Optional[str] = None
  dental_history: Optional[str] = None
  allergies: Optional[str] = None
  emergency_contact: Optional[str] = None

class PatientResponse(PatientBase):
  id: int
  created_at: datetime
  updated_at: Optional[datetime] = None

  class Config:
    from_attributes = True

# Chat schemas
class ChatMessage(BaseModel):
  message: str
  patient_context: Optional[str] = None
  timestamp: Optional[datetime] = None

class ChatResponse(BaseModel):
  message: str
  response: str
  timestamp: Optional[datetime] = None