from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from . import auth
from .. import crud, schemas, database

router = APIRouter(prefix="/patients", tags=["Patients"])

def get_db():
  db = database.SessionLocal()
  try:
    yield db
  finally:
    db.close()

@router.get("/", response_model=list[schemas.Patient])
def list_patients(db: Session = Depends(get_db), _: str = Depends(auth.get_current_user)):
  return crud.get_patients(db)

@router.post("/", response_model=schemas.Patient)
def create(db: Session = Depends(get_db), patient: schemas.PatientCreate = Depends(), _: str = Depends(auth.get_current_user)):
  return crud.create_patient(db, patient)

@router.get("/{patient_id}", response_model=schemas.Patient)
def get(patient_id: int, db: Session = Depends(get_db), _: str = Depends(auth.get_current_user)):
  db_patient = crud.get_patient(db, patient_id)
  if not db_patient:
      raise HTTPException(status_code=404, detail="Not found")
  return db_patient

@router.put("/{patient_id}", response_model=schemas.Patient)
def update(patient_id: int, patient: schemas.PatientCreate, db: Session = Depends(get_db), _: str = Depends(auth.get_current_user)):
  return crud.update_patient(db, patient_id, patient)

@router.delete("/{patient_id}", status_code=204)
def delete(patient_id: int, db: Session = Depends(get_db), _: str = Depends(auth.get_current_user)):
  crud.delete_patient(db, patient_id)
  return {"detail": "Patient deleted successfully"}

@router.get("/search", response_model=list[schemas.Patient])
def search_patients(name: str = None, age: int = None, db: Session = Depends(get_db), _: str = Depends(auth.get_current_user)):
  patients = crud.get_patients(db)
  if name:
    patients = [p for p in patients if name.lower() in p.name.lower()]
  if age is not None:
    patients = [p for p in patients if p.age == age]
  return patients

@router.get("/count", response_model=int)
def count_patients(db: Session = Depends(get_db), _: str = Depends(auth.get_current_user)):
  return len(crud.get_patients(db))

@router.get("/stats", response_model=dict)
def patient_stats(db: Session = Depends(get_db), _: str = Depends(auth.get_current_user)):
  patients = crud.get_patients(db)
  total_patients = len(patients)
  if total_patients == 0:
    return {"total": 0, "average_age": 0, " oldest": None, "youngest": None}
  average_age = sum(p.age for p in patients) / total_patients
  oldest = max(patients, key=lambda p: p.age)
  youngest = min(patients, key=lambda p: p.age)
  return {
    "total": total_patients,
    "average_age": average_age,
    "oldest": {"name": oldest.name, "age": oldest.age},
    "youngest": {"name": youngest.name, "age": youngest.age}
  }

@router.get("/recent", response_model=list[schemas.Patient])
def recent_patients(limit: int = 5, db: Session = Depends(get_db), _: str = Depends(auth.get_current_user)):
  patients = crud.get_patients(db)
  if limit < 1:
    raise HTTPException(status_code=400, detail="Limit must be at least 1")
  return patients[-limit:] if len(patients) >= limit else patients

@router.get("/search/name/{name}", response_model=list[schemas.Patient])
def search_patients_by_name(name: str, db: Session = Depends(get_db), _: str = Depends(auth.get_current_user)):
  patients = crud.get_patients(db)
  filtered_patients = [p for p in patients if name.lower() in p.name.lower()]
  return filtered_patients

@router.get("/search/age/{age}", response_model=list[schemas.Patient])
def search_patients_by_age(age: int, db: Session = Depends(get_db), _: str = Depends(auth.get_current_user)):
  patients = crud.get_patients(db)
  filtered_patients = [p for p in patients if p.age == age]
  return filtered_patients

@router.get("/search/name/{name}/age/{age}", response_model=list[schemas.Patient])
def search_patients_by_name_and_age(name: str, age: int, db: Session = Depends(get_db), _: str = Depends(auth.get_current_user)):
  patients = crud.get_patients(db)
  filtered_patients = [p for p in patients if name.lower() in p.name.lower() and p.age == age]
  return filtered_patients

@router.get("/search/age-range", response_model=list[schemas.Patient])
def search_patients_by_age_range(min_age: int = 0, max_age: int = 120, db: Session = Depends(get_db), _: str = Depends(auth.get_current_user)):
  patients = crud.get_patients(db)
  filtered_patients = [p for p in patients if min_age <= p.age <= max_age]
  return filtered_patients

@router.get("/search/name/{name}/age-range", response_model=list[schemas.Patient])
def search_patients_by_name_and_age_range(name: str, min_age: int = 0, max_age: int = 120, db: Session = Depends(get_db), _: str = Depends(auth.get_current_user)):
  patients = crud.get_patients(db)
  filtered_patients = [p for p in patients if name.lower() in p.name.lower() and min_age <= p.age <= max_age]
  return filtered_patients

@router.get("/search/age-range/{min_age}/{max_age}", response_model=list[schemas.Patient])
def search_patients_by_age_range_params(min_age: int, max_age: int, db: Session = Depends(get_db), _: str = Depends(auth.get_current_user)):
  patients = crud.get_patients(db)
  filtered_patients = [p for p in patients if min_age <= p.age <= max_age]
  return filtered_patients