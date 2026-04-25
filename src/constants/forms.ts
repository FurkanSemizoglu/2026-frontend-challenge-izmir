export type FormKey =
  | 'CHECKINS'
  | 'SIGHTINGS'
  | 'MESSAGES'
  | 'PERSONAL_NOTES'
  | 'ANONYMOUS_TIPS';

export type NoteStyle = 'pin' | 'tape' | 'clip';

export interface FormMeta {
  key: FormKey;
  id: string;
  slug: string;
  label: string;
  icon: string;
  color: string;
  bgTint: string;
  description: string;
  emptyIcon: string;
  emptyText: string;
  noteStyle: NoteStyle;
}

export const FORMS: Record<FormKey, FormMeta> = {
  CHECKINS: {
    key: 'CHECKINS',
    id: '261134527667966',
    slug: 'checkins',
    label: 'Check-ins',
    icon: '📍',
    color: 'var(--podo-blue)',
    bgTint: '#eef7ff',
    description: 'Trace last known locations and movements.',
    emptyIcon: '🗺️',
    emptyText: 'No check-in records found. The trail has gone cold.',
    noteStyle: 'pin',
  },
  SIGHTINGS: {
    key: 'SIGHTINGS',
    id: '261133720555956',
    slug: 'sightings',
    label: 'Sightings',
    icon: '👁️',
    color: 'var(--podo-green)',
    bgTint: '#f0fbe4',
    description: 'Hear what witnesses claim they saw.',
    emptyIcon: '🔭',
    emptyText: 'No sightings reported. Keep your eyes open.',
    noteStyle: 'tape',
  },
  MESSAGES: {
    key: 'MESSAGES',
    id: '261133651963962',
    slug: 'messages',
    label: 'Messages',
    icon: '✉️',
    color: 'var(--podo-orange)',
    bgTint: '#fff5ed',
    description: 'Read intercepted communications.',
    emptyIcon: '📡',
    emptyText: 'Radio silence. No intercepted messages yet.',
    noteStyle: 'clip',
  },
  PERSONAL_NOTES: {
    key: 'PERSONAL_NOTES',
    id: '261134449238963',
    slug: 'personal_notes',
    label: 'Personal Notes',
    icon: '📓',
    color: 'var(--podo-yellow)',
    bgTint: '#fefce8',
    description: 'Peek into private journal entries.',
    emptyIcon: '📖',
    emptyText: 'The journal is blank. No entries recovered.',
    noteStyle: 'tape',
  },
  ANONYMOUS_TIPS: {
    key: 'ANONYMOUS_TIPS',
    id: '261134430330946',
    slug: 'anonymous_tips',
    label: 'Anonymous Tips',
    icon: '🕵️',
    color: '#a78bfa',
    bgTint: '#f3f0ff',
    description: 'Decode tips from confidential sources.',
    emptyIcon: '🤫',
    emptyText: 'The tip line is quiet. No submissions yet.',
    noteStyle: 'pin',
  },
};

export const FORM_LIST: FormMeta[] = Object.values(FORMS);

export const FORM_IDS: string[] = FORM_LIST.map((f) => f.id);

export function findFormBySlug(slug: string | undefined): FormMeta | null {
  if (!slug) return null;
  const normalized = slug.toLowerCase();
  return FORM_LIST.find((f) => f.slug === normalized) ?? null;
}
