import { api } from "./api";

import { type AxiosResponse } from "axios";
import type { LoginCredentials, Token, User } from "../types";

export const authApi = {
  login: (credentials: LoginCredentials): Promise<AxiosResponse<Token>> =>
    api.post("/auth/login", credentials),
  register: (credentials: LoginCredentials): Promise<AxiosResponse<User>> =>
    api.post("/auth/register", credentials),
};
