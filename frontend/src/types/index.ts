export interface User {
  id: number;
  email: string;
  created_at: string;
  updated_at?: string;
}

export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  address?: string;
  medical_history?: string;
  dental_history?: string;
  allergies?: string;
  emergency_contact?: string;
  created_at: string;
  updated_at?: string;
}

export interface PatientFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: string;
  medical_history: string;
  dental_history: string;
  allergies: string;
  emergency_contact: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirm_password: string;
}
export interface PasswordResetRequest {
  email: string;
}
export interface PasswordChangeRequest {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}
export interface ProfileUpdateRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  address?: string;
  medical_history?: string;
  dental_history?: string;
  allergies?: string;
  emergency_contact?: string;
  password?: string;
  confirm_password?: string;
  current_password?: string;
  new_password?: string;
  confirm_new_password?: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  patient_context?: string;
  timestamp?: string;
}

export interface ChatResponse {
  message: string;
  response: string;
  timestamp?: string;
}

export interface ApiResponse<T> {
  data: T;
}

export interface ApiError {
  detail: string;
}
