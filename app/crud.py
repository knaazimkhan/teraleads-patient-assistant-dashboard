from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional

from .models import User, Patient
from .schemas import UserCreate, PatientCreate, PatientUpdate
from .auth import get_password_hash, verify_password

# User CRUD operations
def create_user(db: Session, user: UserCreate):
  # Check if user already exists
  db_user = db.query(User).filter(User.email == user.email).first()
  if db_user:
    return None
  
  hashed_password = get_password_hash(user.password)
  db_user = User(email=user.email, hashed_password=hashed_password)
  db.add(db_user)
  db.commit()
  db.refresh(db_user)
  return db_user

def authenticate_user(db: Session, email: str, password: str):
  user = db.query(User).filter(User.email == email).first()
  if not user or not verify_password(password, user.hashed_password):
    return None
  return user

def get_user_by_email(db: Session, email: str):
  return db.query(User).filter(User.email == email).first()

# Patient CRUD operations
def create_patient(db: Session, patient: PatientCreate):
  db_patient = Patient(**patient.dict())
  db.add(db_patient)
  db.commit()
  db.refresh(db_patient)
  return db_patient

def get_patients(db: Session, skip: int = 0, limit: int = 100):
  return db.query(Patient).offset(skip).limit(limit).all()

def get_patient(db: Session, patient_id: int):
  return db.query(Patient).filter(Patient.id == patient_id).first()
    
def update_patient(db: Session, patient_id: int, patient_update: PatientUpdate):
  db_patient = get_patient(db, patient_id)
  
  if not db_patient:
    return None
  
  update_data = patient_update.dict(exclude_unset=True)   
  for field, value in update_data.items():
    setattr(db_patient, field, value)
  
  db.commit()
  db.refresh(db_patient)
  return db_patient

def delete_patient(db: Session, patient_id: int):
  db_patient = get_patient(db, patient_id)
  
  if not db_patient:
    return False
  
  db.delete(db_patient)
  db.commit()
  return True

def search_patients(db: Session, query: str):
  return db.query(Patient).filter(
    or_(
      Patient.first_name.ilike(f"%{query}%"),
      Patient.last_name.ilike(f"%{query}%"),
      Patient.email.ilike(f"%{query}%")
    )
  ).all()