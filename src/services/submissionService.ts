import { apiClient } from '../api/client';
import type { SubmissionsResponse } from '../types/jotform';

const cached = new Map<string, SubmissionsResponse>();

export async function getFormSubmissions(formId: string): Promise<SubmissionsResponse> {
  const hit = cached.get(formId);
  if (hit) return hit;

  const { data } = await apiClient.get<SubmissionsResponse>(`/form/${formId}/submissions`);
  cached.set(formId, data);
  return data;
}

export function invalidateFormSubmissions(formId: string): void {
  cached.delete(formId);
}
