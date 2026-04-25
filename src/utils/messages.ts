import type { FormSubmission, SubmissionAnswer } from '../types/jotform';
import { renderAnswer } from './answers';

export interface ParsedMessage {
  id: string;
  sender: string;
  receiver: string;
  body: string;
  date: string;
  extras: { label: string; value: string }[];
}

export interface Conversation {
  participants: [string, string];
  messages: ParsedMessage[];
}

const SENDER_HINTS = /^(from|sender|gönderen|kimden|sent.?by|yazanı?)$/i;
const RECEIVER_HINTS = /^(to|receiver|recipient|alıcı|kime|gönderilen)$/i;
const BODY_HINTS = /^(message|content|body|mesaj|içerik|text|note)$/i;

function matchField(answers: SubmissionAnswer[], pattern: RegExp): string {
  for (const a of answers) {
    if (pattern.test(a.name) || pattern.test(a.text)) {
      return renderAnswer(a.answer);
    }
  }
  return '';
}

function conversationKey(a: string, b: string): string {
  return [a, b].sort((x, y) => x.localeCompare(y)).join('↔');
}

export function parseMessages(submissions: FormSubmission[]): ParsedMessage[] {
  return submissions
    .map((sub) => {
      const all = Object.values(sub.answers).sort(
        (a, b) => parseInt(a.order, 10) - parseInt(b.order, 10),
      );

      const sender = matchField(all, SENDER_HINTS);
      const receiver = matchField(all, RECEIVER_HINTS);
      const body = matchField(all, BODY_HINTS);

      const usedNames = new Set<string>();
      for (const a of all) {
        if (SENDER_HINTS.test(a.name) || SENDER_HINTS.test(a.text)) usedNames.add(a.name);
        if (RECEIVER_HINTS.test(a.name) || RECEIVER_HINTS.test(a.text)) usedNames.add(a.name);
        if (BODY_HINTS.test(a.name) || BODY_HINTS.test(a.text)) usedNames.add(a.name);
      }

      const extras = all
        .filter((a) => !usedNames.has(a.name) && renderAnswer(a.answer))
        .map((a) => ({ label: a.text, value: renderAnswer(a.answer) }));

      return { id: sub.id, sender, receiver, body, date: sub.created_at, extras };
    })
    .filter((m) => m.sender && m.receiver);
}

export function groupConversations(messages: ParsedMessage[]): Conversation[] {
  const map = new Map<string, Conversation>();

  for (const msg of messages) {
    const key = conversationKey(msg.sender, msg.receiver);
    let conv = map.get(key);
    if (!conv) {
      conv = { participants: [msg.sender, msg.receiver], messages: [] };
      map.set(key, conv);
    }
    conv.messages.push(msg);
  }

  for (const conv of map.values()) {
    conv.messages.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  return Array.from(map.values()).sort((a, b) => b.messages.length - a.messages.length);
}
