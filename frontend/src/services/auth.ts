import { api } from "./api";

import { type AxiosResponse } from "axios";
import type {
  LoginCredentials,
  PasswordChangeRequest,
  PasswordResetRequest,
  Token,
  User,
} from "../types";

export const authApi = {
  login: (credentials: LoginCredentials): Promise<AxiosResponse<Token>> =>
    api.post("/auth/login", credentials),
  register: (credentials: LoginCredentials): Promise<AxiosResponse<User>> =>
    api.post("/auth/register", credentials),
  me: (): Promise<AxiosResponse<User>> => api.get("/auth/me"),
  logout: (): Promise<AxiosResponse<void>> => api.post("/auth/logout"),
  resetPassword: (data: PasswordResetRequest): Promise<AxiosResponse<void>> =>
    api.post("/auth/reset-password", data),
  changePassword: (data: PasswordChangeRequest): Promise<AxiosResponse<void>> =>
    api.post("/auth/change-password", {
      current_password: data.current_password,
      new_password: data.new_password,
    }),
  updateProfile: (userData: Partial<User>): Promise<AxiosResponse<User>> =>
    api.put("/auth/profile", userData),
};
