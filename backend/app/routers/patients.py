from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..schemas import (
  PatientCreate,
  PatientResponse,
  PatientUpdate,
)
from ..crud import (
  create_patient,
  get_patients,
  get_patient,
  update_patient,
  delete_patient,
)
from ..auth import get_current_user

router = APIRouter(prefix="/patients")

@router.post("/", response_model=PatientResponse)
async def create(patient: PatientCreate, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
  print(f"Creating patient: {patient}")
  return create_patient(db, patient)

@router.get("/", response_model=List[PatientResponse])
async def list_patients(
  skip: int = 0,
  limit: int = 100,
  db: Session = Depends(get_db),
  _: str = Depends(get_current_user)
):
  return get_patients(db, skip=skip, limit=limit)

@router.get("/{patient_id}", response_model=PatientResponse)
async def get(patient_id: int, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
  patient = get_patient(db, patient_id)
  if not patient:
    raise HTTPException(status_code=404, detail="Patient not found")
  return patient

@router.put("/{patient_id}", response_model=PatientResponse)
async def update(patient_id: int, patient_update: PatientUpdate, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
  patient = update_patient(db, patient_id, patient_update)
  if not patient:
    raise HTTPException(status_code=404, detail="Patient not found")
  return patient

@router.delete("/{patient_id}", status_code=204)
async def delete(patient_id: int, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
  success = delete_patient(db, patient_id)
  if not success:
      raise HTTPException(status_code=404, detail="Patient not found")
  return {"message": "Patient deleted successfully"}

@router.get("/search", response_model=List[PatientResponse])
async def search_patients(
  query: str,
  db: Session = Depends(get_db),
  _: str = Depends(get_current_user)
):
  patients = search_patients(db, query)
  if not patients:
      raise HTTPException(status_code=404, detail="No patients found")
  return patients