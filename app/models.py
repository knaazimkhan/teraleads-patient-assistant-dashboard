# backend/app/models.py
from sqlalchemy import Column, Integer, String, Text
from .database import Base

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    age = Column(Integer)
    condition = Column(Text)
