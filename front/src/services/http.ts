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
    } catch (e) {
      // Error parsing JSON response
    }
    
    // Handle token expiration
    if (res.status === 401 && (message.includes('token') || message.includes('Unauthorized'))) {
      // Dispatch a custom event for token expiration
      window.dispatchEvent(new CustomEvent('tokenExpired', {
        detail: { status: res.status, message }
      }));
    }
    
    throw new Error(message);
  }
  
  const result = await res.json();
  return result as TResponse;
}

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';


