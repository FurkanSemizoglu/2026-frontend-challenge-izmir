import { useCallback, useEffect, useState } from 'react';
import { getFormSubmissions, invalidateFormSubmissions } from '../services/submissionService';
import type { FormSubmission } from '../types/jotform';

interface UseFormSubmissionsResult {
  submissions: FormSubmission[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFormSubmissions(formId: string): UseFormSubmissionsResult {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    if (!formId) return;

    let cancelled = false;

    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getFormSubmissions(formId);
        if (!cancelled) setSubmissions(response.content ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch submissions');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [formId, reloadToken]);

  const refetch = useCallback(() => {
    invalidateFormSubmissions(formId);
    setReloadToken((t) => t + 1);
  }, [formId]);

  return { submissions, isLoading, error, refetch };
}
