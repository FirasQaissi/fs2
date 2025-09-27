import { http, API_BASE } from './http';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types/auth';

const AUTH_BASE = `${API_BASE}/api/auth`;

export const authService = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    return http<LoginResponse>(`${AUTH_BASE}/login`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  async register(payload: RegisterRequest): Promise<RegisterResponse> {
    return http<RegisterResponse>(`${AUTH_BASE}/register`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  async logout(): Promise<{ ok: boolean }> {
    return http<{ ok: boolean }>(`${AUTH_BASE}/logout`, {
      method: 'POST',
    });
  },
};


