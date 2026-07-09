
import API from "../types/api";
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth.types';

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await API.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await API.post<AuthResponse>('/auth/register', data);
    return response.data;
  },
};
