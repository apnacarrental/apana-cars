import 'server-only';
import { getBackendToken } from './backend-auth';

const BACKEND_URL = process.env.BACKEND_INTERNAL_URL || 'http://localhost:3001';

export async function fetchBackendApi(endpoint: string, options: RequestInit = {}): Promise<Response> {
  if (!endpoint.startsWith('/')) {
    throw new Error('Endpoint must be a relative path starting with /');
  }
  try {
    const token = await getBackendToken();
    const headers = new Headers(options.headers || {});
    
    // Explicitly overwrite or set the Authorization header securely on the server side
    headers.set('Authorization', `Bearer ${token}`);
    
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      ...options,
      headers,
    });
    
    return response;
  } catch (error) {
    // Intentionally do not log token details.
    console.error(`Backend API request failed for ${endpoint}`);
    throw error;
  }
}




