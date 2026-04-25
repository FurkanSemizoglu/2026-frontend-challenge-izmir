import { Link } from 'react-router-dom';
import type { FormMeta } from '../../constants/forms';
import type { JotFormForm } from '../../types/jotform';

interface EvidenceCardProps {
  form: JotFormForm;
  meta: FormMeta;
}

export function EvidenceCard({ form, meta }: EvidenceCardProps) {
  const hasNew = (parseInt(form.new, 10) || 0) > 0;

  return (
    <Link
      to={`/case/${meta.slug}`}
      className="group flex flex-col gap-4 rounded-2xl border border-(--border) bg-white p-6 no-underline shadow-(--shadow-sm) transition-all duration-200 hover:-translate-y-1 hover:shadow-(--shadow-lg)"
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
          style={{ background: `${meta.color}18` }}
        >
          {meta.icon}
        </div>
        {hasNew && (
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
            style={{ background: 'var(--podo-orange)' }}
          >
            NEW
          </span>
        )}
      </div>

      <div>
        <h3 className="mb-1 text-base font-bold" style={{ color: 'var(--podo-navy)' }}>
          {meta.label}
        </h3>
        <p className="text-sm text-(--text)">{meta.description}</p>
      </div>

      <div
        className="flex items-center gap-1 border-t border-(--border) pt-4 text-xs font-semibold transition-colors group-hover:text-(--podo-orange)"
        style={{ color: meta.color }}
      >
        <span>View Evidence</span>
        <svg
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </Link>
  );
}
