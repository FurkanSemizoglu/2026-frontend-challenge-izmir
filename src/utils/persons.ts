import type { FormSubmission, SubmissionAnswer } from '../types/jotform';
import { renderAnswer } from './answers';

const NAME_HINTS = /^(full.?name|person.?name|suspect.?name|name|isim|ad|kişi)$/i;
const SEEN_WITH_HINTS = /^(seen.?with|ile.?görülen|birlikte)$/i;
const SENDER_HINTS = /^(from|sender|gönderen|kimden|sent.?by)$/i;
const RECEIVER_HINTS = /^(to|receiver|recipient|alıcı|kime)$/i;

export interface PersonEntry {
  name: string;
  formIds: Set<string>;
  submissionCount: number;
  submissions: { formId: string; submission: FormSubmission }[];
}

function extractNamesFromAnswer(answer: SubmissionAnswer): string[] {
  const value = renderAnswer(answer.answer).trim();
  if (!value) return [];

  if (
    NAME_HINTS.test(answer.name) ||
    NAME_HINTS.test(answer.text) ||
    SENDER_HINTS.test(answer.name) ||
    SENDER_HINTS.test(answer.text) ||
    RECEIVER_HINTS.test(answer.name) ||
    RECEIVER_HINTS.test(answer.text)
  ) {
    return [value];
  }

  if (SEEN_WITH_HINTS.test(answer.name) || SEEN_WITH_HINTS.test(answer.text)) {
    return value.split(/[,;&]+/).map((s) => s.trim()).filter(Boolean);
  }

  return [];
}

function normalizeName(name: string): string {
  return name.replace(/\s+/g, ' ').trim();
}

export function extractPersons(
  allSubmissions: { formId: string; submissions: FormSubmission[] }[],
): PersonEntry[] {
  const personMap = new Map<string, PersonEntry>();

  for (const { formId, submissions } of allSubmissions) {
    for (const sub of submissions) {
      const answers = Object.values(sub.answers);
      const namesFound = new Set<string>();

      for (const answer of answers) {
        const names = extractNamesFromAnswer(answer);
        for (const raw of names) {
          const name = normalizeName(raw);
          if (name.length < 2) continue;
          namesFound.add(name);
        }
      }

      for (const name of namesFound) {
        const key = name.toLowerCase();
        let entry = personMap.get(key);
        if (!entry) {
          entry = { name, formIds: new Set(), submissionCount: 0, submissions: [] };
          personMap.set(key, entry);
        }
        entry.formIds.add(formId);
        entry.submissionCount += 1;
        entry.submissions.push({ formId, submission: sub });
      }
    }
  }

  return Array.from(personMap.values()).sort(
    (a, b) => b.submissionCount - a.submissionCount,
  );
}
