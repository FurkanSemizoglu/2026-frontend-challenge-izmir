import { useState } from 'react';
import type { FormMeta } from '../../constants/forms';
import type { FormSubmission } from '../../types/jotform';
import { getOrderedAnswers, normalizeLabel, parseCoordinates, renderAnswer } from '../../utils/answers';
import { formatDate, formatRelative } from '../../utils/date';
import { NoteDecoration } from './NoteDecorations';

const ROTATIONS = [
  '-rotate-1',
  'rotate-[0.5deg]',
  '-rotate-[0.7deg]',
  'rotate-1',
  '-rotate-[0.4deg]',
  'rotate-[0.8deg]',
];

interface NoteCardProps {
  submission: FormSubmission;
  meta: FormMeta;
  index: number;
}

export function NoteCard({ submission, meta, index }: NoteCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const answers = getOrderedAnswers(submission.answers);
  const rotation = ROTATIONS[index % ROTATIONS.length];
  const isNew = submission.new === '1';

  return (
    <div
      className={`group relative transition-all duration-300 hover:z-10 hover:rotate-0 hover:scale-[1.02] ${rotation}`}
    >
      <NoteDecoration style={meta.noteStyle} color={meta.color} />

      <div
        className="relative rounded-sm bg-white shadow-[2px_3px_12px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)] transition-shadow group-hover:shadow-[4px_6px_20px_rgba(0,0,0,0.12)]"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, transparent 27px, #e8e8e8 27px, #e8e8e8 28px)',
          backgroundSize: '100% 28px',
          backgroundPositionY: '4px',
        }}
      >
        <div className="h-1 w-full rounded-t-sm" style={{ background: meta.color }} />

        <div className="flex items-center justify-between gap-3 px-5 pb-2 pt-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">{meta.icon}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-(--muted)">
              Evidence #{String(index + 1).padStart(3, '0')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isNew && (
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                style={{ background: 'var(--podo-orange)' }}
              >
                NEW
              </span>
            )}
            <span className="text-[11px] text-(--muted)">
              {formatRelative(submission.created_at)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-0.5 px-5 pb-5 pt-1">
          {answers.map((answer) => (
            <AnswerRow
              key={answer.name}
              label={normalizeLabel(answer.text)}
              value={renderAnswer(answer.answer)}
              color={meta.color}
            />
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-dashed border-(--border) px-5 py-3">
          <button
            type="button"
            onClick={() => setShowDetails((v) => !v)}
            className="flex items-center gap-1 text-[11px] font-semibold text-(--muted) transition hover:text-(--text-h)"
          >
            <svg
              className={`h-3 w-3 transition-transform ${showDetails ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            {showDetails ? 'Hide details' : 'Show details'}
          </button>
          <span className="font-mono text-[10px] text-(--muted)">
            {formatDate(submission.created_at)}
          </span>
        </div>

        {showDetails && (
          <div className="border-t border-(--border) bg-(--bg-subtle) px-5 py-3">
            <div className="flex flex-wrap gap-3 text-[11px] text-(--muted)">
              <span>Status: {submission.status}</span>
              <span>·</span>
              <span>Updated: {formatDate(submission.updated_at)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface AnswerRowProps {
  label: string;
  value: string;
  color: string;
}

function AnswerRow({ label, value, color }: AnswerRowProps) {
  const coords = parseCoordinates(value);

  if (coords) {
    return (
      <div className="py-2">
        <span
          className="shrink-0 text-[11px] font-bold uppercase tracking-wider"
          style={{ color }}
        >
          {label}
        </span>
        <p
          className="mt-1 text-sm font-medium"
          style={{ color: 'var(--podo-navy)' }}
        >
          {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
        </p>
        <div className="mt-2 overflow-hidden rounded-lg border border-(--border)">
          <iframe
            title={`Map ${coords.lat},${coords.lng}`}
            width="100%"
            height="160"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="no-referrer"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.008},${coords.lat - 0.005},${coords.lng + 0.008},${coords.lat + 0.005}&layer=mapnik&marker=${coords.lat},${coords.lng}`}
          />
        </div>
      </div>
    );
  }

  const isLongValue = value.length > 80;

  return (
    <div className={`py-2 ${isLongValue ? '' : 'flex items-baseline gap-3'}`}>
      <span
        className="shrink-0 text-[11px] font-bold uppercase tracking-wider"
        style={{ color }}
      >
        {label}
      </span>
      <p
        className={`text-sm leading-relaxed font-medium ${isLongValue ? 'mt-1' : ''}`}
        style={{ color: 'var(--podo-navy)' }}
      >
        {value}
      </p>
    </div>
  );
}
