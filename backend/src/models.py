from sqlalchemy import Column, Integer, String, DateTime, Text, Date
from sqlalchemy.sql import func

from src.database import Base

class User(Base):
  __tablename__ = "users"

  id = Column(Integer, primary_key=True, index=True)
  email = Column(String, unique=True, index=True, nullable=False)
  hashed_password = Column(String, nullable=False)
  created_at = Column(DateTime(timezone=True), server_default=func.now())
  updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Patient(Base):
  __tablename__ = "patients"

  id = Column(Integer, primary_key=True, index=True)
  first_name = Column(String, nullable=False)
  last_name = Column(String, nullable=False)
  email = Column(String, unique=True, index=True)
  phone = Column(String)
  date_of_birth = Column(Date)
  # age = Column(Integer)
  address = Column(Text)
  medical_history = Column(Text)
  dental_history = Column(Text)
  allergies = Column(Text)
  emergency_contact = Column(String)
  created_at = Column(DateTime(timezone=True), server_default=func.now())
  updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())