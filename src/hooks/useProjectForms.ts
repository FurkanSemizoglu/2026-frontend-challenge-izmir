import { useMemo } from 'react';
import { FORM_IDS } from '../constants/forms';
import { useUserForms } from './useUserForms';

const PROJECT_FORM_ID_SET = new Set<string>(FORM_IDS);

interface UseProjectFormsResult {
  countsById: Map<string, number>;
  totalCount: number;
  totalForms: number;
  isLoading: boolean;
  error: string | null;
}

export function useProjectForms(): UseProjectFormsResult {
  const { forms, isLoading, error } = useUserForms();

  return useMemo(() => {
    const projectForms = forms.filter((f) => PROJECT_FORM_ID_SET.has(f.id));
    const countsById = new Map<string, number>();
    let totalCount = 0;

    for (const form of projectForms) {
      const count = parseInt(form.count, 10) || 0;
      countsById.set(form.id, count);
      totalCount += count;
    }

    return {
      countsById,
      totalCount,
      totalForms: projectForms.length,
      isLoading,
      error,
    };
  }, [forms, isLoading, error]);
}
