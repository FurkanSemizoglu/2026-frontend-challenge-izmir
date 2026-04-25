import { apiClient } from '../api/client';
import type { UserFormsResponse } from '../types/jotform';

let cached: UserFormsResponse | null = null;

export async function getUserForms(): Promise<UserFormsResponse> {
  if (cached) return cached;

  const { data } = await apiClient.get<UserFormsResponse>('/user/forms');
  cached = data;
  return data;
}
