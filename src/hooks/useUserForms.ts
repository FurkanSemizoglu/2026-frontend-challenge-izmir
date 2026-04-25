import { useEffect, useState } from 'react';
import { getUserForms } from '../services/formService';
import type { JotFormForm } from '../types/jotform';

interface UseUserFormsResult {
  forms: JotFormForm[];
  isLoading: boolean;
  error: string | null;
}

export function useUserForms(): UseUserFormsResult {
  const [forms, setForms] = useState<JotFormForm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getUserForms();
        if (!cancelled) setForms(response.content ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch forms');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { forms, isLoading, error };
}
