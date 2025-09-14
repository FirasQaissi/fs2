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

  console.log('🌐 HTTP Request:', { url: input, method: init?.method || 'GET' });
  
  const res = await fetch(input, { headers, ...init });
  
  console.log('🌐 HTTP Response:', { 
    status: res.status, 
    statusText: res.statusText, 
    ok: res.ok 
  });
  
  if (!res.ok) {
    let message = 'Request failed';
    try {
      const data = await res.json();
      message = data?.message || message;
      console.log('❌ HTTP Error Response:', data);
    } catch (e) {
      console.log('❌ HTTP Error (no JSON):', res.statusText);
    }
    throw new Error(message);
  }
  
  const result = await res.json();
  console.log('✅ HTTP Success Response:', result);
  return result as TResponse;
}

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';


