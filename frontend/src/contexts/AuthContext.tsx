"use client";

import type React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { AuthContext } from "../hooks/useAuth";
import { api } from "../services/api";
import { authApi } from "../services/auth";

import type { User } from "../types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const fetchUser = async () => {
        try {
          const response = await api.get("/auth/me");
          const userData: User = response.data;
          setUser({
            id: userData.id,
            email: userData.email,
            created_at: userData.created_at,
          });
          toast.success("User data fetched successfully");
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Handle Axios error
            toast.error(error.response?.data?.detail || "Failed to fetch user data");
          } else {
            // Handle generic error
            toast.error(
              (error as Error).message || "Failed to fetch user data"
            );
          }
          setUser(null);
          localStorage.removeItem("token");
          delete api.defaults.headers.common["Authorization"];
        }
      };
      fetchUser();
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authApi.login({ email, password });
      const { access_token } = response.data;

      localStorage.setItem("token", access_token);
      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      setUser({ id: 1, email, created_at: new Date().toISOString() });
      toast.success("Login successful!");
      return true;
    } catch (error) {
      const errorMessage =
        (error as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail || "Login failed";
      toast.error(errorMessage);
      return false;
    }
  };

  const register = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      await authApi.register({ email, password });
      toast.success("Registration successful! Please login.");
      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Handle Axios error
        toast.error(error.response?.data?.detail || "Registration failed");
        return false;
      } else {
        // Handle generic error
        toast.error((error as Error).message || "Registration failed");
        return false;
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    // localStorage.removeItem("userEmail")
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
