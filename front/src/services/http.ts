import { authStorage } from './authStorage';

export async function http<TResponse>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<TResponse> {
  const token = authStorage.getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(init?.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  } as Record<string, string>;

  const res = await fetch(input, { headers, ...init });
  if (!res.ok) {
    let message = 'Request failed';
    try {
      const data = await res.json();
      message = data?.message || message;
    } catch {}
    throw new Error(message);
  }
  return res.json() as Promise<TResponse>;
}

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';


