import { useEffect, useState } from 'react';
import { FORM_LIST } from '../constants/forms';
import { getFormSubmissions } from '../services/submissionService';
import type { FormSubmission } from '../types/jotform';

interface FormSubmissionGroup {
  formId: string;
  submissions: FormSubmission[];
}

interface UseAllSubmissionsResult {
  data: FormSubmissionGroup[];
  isLoading: boolean;
  error: string | null;
}

export function useAllSubmissions(): UseAllSubmissionsResult {
  const [data, setData] = useState<FormSubmissionGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const results = await Promise.all(
          FORM_LIST.map(async (form) => {
            const res = await getFormSubmissions(form.id);
            return { formId: form.id, submissions: res.content ?? [] };
          }),
        );

        if (!cancelled) setData(results);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Veriler yüklenirken bir hata oluştu.',
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, isLoading, error };
}
