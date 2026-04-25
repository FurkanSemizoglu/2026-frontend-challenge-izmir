import type { SubmissionAnswer } from '../types/jotform';

export function renderAnswer(answer: SubmissionAnswer['answer']): string {
  if (answer === undefined || answer === null || answer === '') return '';
  if (typeof answer === 'string') return answer;
  if (Array.isArray(answer)) return answer.filter(Boolean).join(', ');
  if (typeof answer === 'object') {
    return Object.values(answer).filter(Boolean).join(' ');
  }
  return String(answer);
}

export function getOrderedAnswers(answers: Record<string, SubmissionAnswer>): SubmissionAnswer[] {
  return Object.values(answers)
    .sort((a, b) => parseInt(a.order, 10) - parseInt(b.order, 10))
    .filter((a) => renderAnswer(a.answer).length > 0);
}

export interface LatLng {
  lat: number;
  lng: number;
}

const COORD_RE = /^(-?\d{1,3}(?:\.\d+)?)\s*[,;\s]\s*(-?\d{1,3}(?:\.\d+)?)$/;

export function parseCoordinates(value: string): LatLng | null {
  const m = value.trim().match(COORD_RE);
  if (!m) return null;

  const lat = parseFloat(m[1]);
  const lng = parseFloat(m[2]);

  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;

  return { lat, lng };
}
