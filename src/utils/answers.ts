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
