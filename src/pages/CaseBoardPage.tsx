import { Link } from 'react-router-dom';
import { EvidenceCard } from '../components/case/EvidenceCard';
import { FORM_LIST } from '../constants/forms';
import { useUserForms } from '../hooks/useUserForms';
import { useProjectForms } from '../hooks/useProjectForms';

export function CaseBoardPage() {
  const { forms, error } = useUserForms();
  const { totalCount, totalForms, isLoading } = useProjectForms();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <PageHeader
        isLoading={isLoading}
        totalCount={totalCount}
        totalForms={totalForms}
      />

      {isLoading && <LoadingGrid />}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FORM_LIST.map((meta) => {
            const form = forms.find((f) => f.id === meta.id);
            if (!form) return null;
            return <EvidenceCard key={meta.key} form={form} meta={meta} />;
          })}
        </div>
      )}
    </main>
  );
}

function PageHeader({
  isLoading,
  totalCount,
  totalForms,
}: {
  isLoading: boolean;
  totalCount: number;
  totalForms: number;
}) {
  return (
    <div className="mb-10">
      <div className="mb-2 flex items-center gap-2">
        <Link to="/" className="text-sm text-(--muted) no-underline hover:text-(--primary)">
          Home
        </Link>
        <span className="text-(--muted)">/</span>
        <span className="text-sm font-medium text-(--text-h)">Case Board</span>
      </div>
      <h1 className="mb-2 text-3xl font-extrabold" style={{ color: 'var(--podo-navy)' }}>
        Evidence Board
      </h1>
      <p className="text-(--text)">
        {isLoading
          ? 'Loading case files...'
          : `${totalCount} total entries across ${totalForms} categories`}
      </p>
    </div>
  );
}

function LoadingGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: FORM_LIST.length }).map((_, i) => (
        <div key={i} className="h-52 animate-pulse rounded-2xl bg-(--code-bg)" />
      ))}
    </div>
  );
}
