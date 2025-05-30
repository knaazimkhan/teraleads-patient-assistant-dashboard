import { api } from "./api";

import { type AxiosResponse } from "axios";
import type { Patient, PatientFormData } from "../types";

export const patientApi = {
  getAll: (): Promise<AxiosResponse<Patient[]>> => api.get("/patients"),
  getById: (id: number): Promise<AxiosResponse<Patient>> =>
    api.get(`/patients/${id}`),
  create: (data: PatientFormData): Promise<AxiosResponse<Patient>> =>
    api.post("/patients", data),
  update: (
    id: number,
    data: Partial<PatientFormData>
  ): Promise<AxiosResponse<Patient>> => api.put(`/patients/${id}`, data),
  delete: (id: number): Promise<AxiosResponse<{ message: string }>> =>
    api.delete(`/patients/${id}`),
};
