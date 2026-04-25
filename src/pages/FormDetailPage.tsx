import { Link, useParams } from 'react-router-dom';
import detectivePodo from '../assets/detective_podo.png';
import { ConversationBoard } from '../components/case/ConversationBoard';
import { NoteCard } from '../components/case/NoteCard';
import { NoteSkeleton } from '../components/case/NoteSkeleton';
import { findFormBySlug, type FormMeta } from '../constants/forms';
import { useFormSubmissions } from '../hooks/useFormSubmissions';

export function FormDetailPage() {
  const { formKey } = useParams<{ formKey: string }>();
  const meta = findFormBySlug(formKey);

  if (!meta) {
    return <NotFoundView />;
  }

  return <FormDetailView meta={meta} />;
}

function FormDetailView({ meta }: { meta: FormMeta }) {
  const { submissions, isLoading, error, refetch } = useFormSubmissions(meta.id);

  return (
    <main className="flex-1" style={{ background: meta.bgTint }}>
      <DetailHeader meta={meta} count={submissions.length} isLoading={isLoading} onRefresh={refetch} />
      <DetailBody
        meta={meta}
        submissions={submissions}
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      />
    </main>
  );
}

function DetailHeader({
  meta,
  count,
  isLoading,
  onRefresh,
}: {
  meta: FormMeta;
  count: number;
  isLoading: boolean;
  onRefresh: () => void;
}) {
  return (
    <div className="relative overflow-hidden" style={{ background: 'var(--podo-navy)' }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-10 pt-8">
        <Breadcrumb label={meta.label} />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-5">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl shadow-lg"
              style={{ background: `${meta.color}30` }}
            >
              {meta.icon}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                {meta.label}
              </h1>
              <p className="mt-1 text-sm text-white/60">{meta.description}</p>
              {!isLoading && <HeaderBadges meta={meta} count={count} />}
            </div>
          </div>

          <RefreshButton onClick={onRefresh} />
        </div>
      </div>
    </div>
  );
}

function Breadcrumb({ label }: { label: string }) {
  return (
    <div className="mb-6 flex items-center gap-2 text-sm">
      <Link to="/" className="text-white/50 no-underline transition hover:text-white">
        Home
      </Link>
      <span className="text-white/30">/</span>
      <Link to="/case" className="text-white/50 no-underline transition hover:text-white">
        Case Board
      </Link>
      <span className="text-white/30">/</span>
      <span className="font-medium text-white">{label}</span>
    </div>
  );
}

function HeaderBadges({ meta, count }: { meta: FormMeta; count: number }) {
  return (
    <div className="mt-3 flex items-center gap-3">
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white"
        style={{ background: `${meta.color}55` }}
      >
        <span className="text-sm">{meta.icon}</span>
        {count} {count === 1 ? 'entry' : 'entries'}
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full"
          style={{ background: 'var(--podo-green)' }}
        />
        Live from JotForm
      </span>
    </div>
  );
}

function RefreshButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 items-center gap-2 self-start rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 sm:self-auto"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      Re-scan
    </button>
  );
}

function DetailBody({
  meta,
  submissions,
  isLoading,
  error,
  onRetry,
}: {
  meta: FormMeta;
  submissions: ReturnType<typeof useFormSubmissions>['submissions'];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #c8c8c8 0.5px, transparent 0.5px)',
          backgroundSize: '16px 16px',
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-10">
        {isLoading && <LoadingState />}
        {error && <ErrorState message={error} onRetry={onRetry} />}
        {!isLoading && !error && submissions.length === 0 && <EmptyState meta={meta} />}
        {!isLoading && !error && submissions.length > 0 && (
          <NotesList meta={meta} submissions={submissions} />
        )}
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <NoteSkeleton key={i} index={i} />
      ))}
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="mx-auto max-w-md rounded-xl border border-red-200 bg-white p-6 text-center shadow-md">
      <span className="text-3xl">🚨</span>
      <p className="mt-2 text-sm font-semibold text-red-700">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-lg px-4 py-2 text-xs font-bold text-white"
        style={{ background: 'var(--podo-orange)' }}
      >
        Try Again
      </button>
    </div>
  );
}

function EmptyState({ meta }: { meta: FormMeta }) {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-4 rounded-2xl bg-white p-10 text-center shadow-md">
      <span className="text-5xl">{meta.emptyIcon}</span>
      <p className="text-lg font-bold" style={{ color: 'var(--podo-navy)' }}>
        {meta.emptyText}
      </p>
      <img
        src={detectivePodo}
        alt="Podo"
        className="h-20 w-20 rounded-full object-cover opacity-60"
        draggable={false}
      />
    </div>
  );
}

function NotesList({
  meta,
  submissions,
}: {
  meta: FormMeta;
  submissions: ReturnType<typeof useFormSubmissions>['submissions'];
}) {
  const count = submissions.length;
  const isMessages = meta.key === 'MESSAGES';

  return (
    <>
      <div className="mb-8 flex items-center gap-4">
        <img
          src={detectivePodo}
          alt="Podo"
          className="h-12 w-12 rounded-full object-cover shadow-md ring-2 ring-white"
          draggable={false}
        />
        <div className="relative rounded-2xl rounded-bl-none bg-white px-5 py-3 shadow-sm">
          <p className="text-sm font-medium" style={{ color: 'var(--podo-navy)' }}>
            {isMessages
              ? `I've intercepted ${count} messages across multiple channels. Let's see who's been talking...`
              : count === 1
                ? "I found 1 piece of evidence. Let's take a closer look..."
                : `I've gathered ${count} pieces of evidence. Let's review them carefully.`}
          </p>
        </div>
      </div>

      {isMessages ? (
        <ConversationBoard submissions={submissions} />
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {submissions.map((sub, i) => (
            <NoteCard key={sub.id} submission={sub} meta={meta} index={i} />
          ))}
        </div>
      )}

      <div className="mt-12 flex flex-col items-center gap-3 text-center">
        <span className="text-2xl">🐾</span>
        <p className="text-sm text-(--muted)">
          {count} evidence {count === 1 ? 'note' : 'notes'} reviewed · Data synced live from JotForm
        </p>
        <Link
          to="/case"
          className="mt-2 inline-flex items-center gap-2 rounded-xl border border-(--border) bg-white px-5 py-2.5 text-sm font-semibold no-underline shadow-sm transition hover:shadow-md"
          style={{ color: 'var(--podo-navy)' }}
        >
          ← Back to Case Board
        </Link>
      </div>
    </>
  );
}

function NotFoundView() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <img
        src={detectivePodo}
        alt="Podo"
        className="mb-6 h-28 w-28 rounded-2xl object-cover shadow-lg"
        draggable={false}
      />
      <h2 className="text-xl font-bold" style={{ color: 'var(--podo-navy)' }}>
        Case file not found
      </h2>
      <p className="mt-2 text-sm text-(--muted)">
        Podo couldn't locate this evidence folder.
      </p>
      <Link
        to="/case"
        className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white no-underline"
        style={{ background: 'var(--podo-orange)' }}
      >
        ← Back to Case Board
      </Link>
    </main>
  );
}
