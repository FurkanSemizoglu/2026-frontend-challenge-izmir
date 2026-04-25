import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FORM_LIST } from '../constants/forms';
import { useAllSubmissions } from '../hooks/useAllSubmissions';
import { NoteCard } from '../components/case/NoteCard';
import { extractPersons, type PersonEntry } from '../utils/persons';

export function SuspectsPage() {
  const { data, isLoading, error } = useAllSubmissions();
  const [selectedPerson, setSelectedPerson] = useState<PersonEntry | null>(null);

  const persons = useMemo(() => extractPersons(data), [data]);

  return (
    <main className="flex-1" style={{ background: 'var(--bg-subtle)' }}>
      <SuspectsHeader personCount={persons.length} isLoading={isLoading} />

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

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {!isLoading && !error && persons.length === 0 && <EmptyState />}

          {!isLoading && !error && persons.length > 0 && !selectedPerson && (
            <PersonGrid persons={persons} onSelect={setSelectedPerson} />
          )}

          {!isLoading && !error && selectedPerson && (
            <PersonDetail person={selectedPerson} onBack={() => setSelectedPerson(null)} />
          )}
        </div>
      </div>
    </main>
  );
}

function SuspectsHeader({
  personCount,
  isLoading,
}: {
  personCount: number;
  isLoading: boolean;
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
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link to="/" className="text-white/50 no-underline transition hover:text-white">
            Home
          </Link>
          <span className="text-white/30">/</span>
          <Link to="/case" className="text-white/50 no-underline transition hover:text-white">
            Case Board
          </Link>
          <span className="text-white/30">/</span>
          <span className="font-medium text-white">Persons of Interest</span>
        </div>

        <div className="flex items-end gap-5">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl shadow-lg"
            style={{ background: 'rgba(167, 139, 250, 0.3)' }}
          >
            🕵️
          </div>
          <div>
            <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Persons of Interest
            </h1>
            <p className="mt-1 text-sm text-white/60">
              All individuals mentioned across evidence files.
            </p>
            {!isLoading && (
              <div className="mt-3 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/30 px-3 py-1 text-xs font-bold text-white">
                  👤 {personCount} {personCount === 1 ? 'person' : 'persons'}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
                  <span
                    className="h-1.5 w-1.5 animate-pulse rounded-full"
                    style={{ background: 'var(--podo-green)' }}
                  />
                  Live from JotForm
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-40 animate-pulse rounded-2xl bg-white/60" />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-4 rounded-2xl bg-white p-10 text-center shadow-md">
      <span className="text-5xl">🔍</span>
      <p className="text-lg font-bold" style={{ color: 'var(--podo-navy)' }}>
        No persons found in the evidence files.
      </p>
    </div>
  );
}

function PersonGrid({
  persons,
  onSelect,
}: {
  persons: PersonEntry[];
  onSelect: (p: PersonEntry) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {persons.map((person) => (
        <PersonCard key={person.name} person={person} onClick={() => onSelect(person)} />
      ))}
    </div>
  );
}

const AVATAR_COLORS = [
  'from-blue-400 to-blue-600',
  'from-orange-400 to-orange-600',
  'from-green-400 to-green-600',
  'from-purple-400 to-purple-600',
  'from-rose-400 to-rose-600',
  'from-teal-400 to-teal-600',
];

function PersonCard({
  person,
  onClick,
}: {
  person: PersonEntry;
  onClick: () => void;
}) {
  const initials = person.name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colorIdx =
    person.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    AVATAR_COLORS.length;

  const formLabels = FORM_LIST.filter((f) => person.formIds.has(f.id));

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex items-start gap-4 rounded-2xl border border-(--border) bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br text-lg font-bold text-white shadow-md ${AVATAR_COLORS[colorIdx]}`}
      >
        {initials || '?'}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-base font-extrabold" style={{ color: 'var(--podo-navy)' }}>
          {person.name}
        </h3>
        <p className="mt-1 text-xs text-(--muted)">
          {person.submissionCount} mention{person.submissionCount !== 1 ? 's' : ''} across{' '}
          {person.formIds.size} categor{person.formIds.size !== 1 ? 'ies' : 'y'}
        </p>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {formLabels.map((f) => (
            <span
              key={f.key}
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{ background: f.bgTint, color: f.color }}
            >
              {f.icon} {f.label}
            </span>
          ))}
        </div>
      </div>

      <span
        className="mt-1 shrink-0 rounded-full border px-3 py-1 text-xs font-bold transition-all group-hover:scale-105"
        style={{
          color: 'var(--podo-blue)',
          borderColor: 'var(--podo-blue)',
          background: '#eef7ff',
        }}
      >
        View →
      </span>
    </button>
  );
}

function PersonDetail({
  person,
  onBack,
}: {
  person: PersonEntry;
  onBack: () => void;
}) {
  const initials = person.name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colorIdx =
    person.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    AVATAR_COLORS.length;

  const groupedByForm = FORM_LIST.filter((f) => person.formIds.has(f.id)).map((form) => ({
    form,
    submissions: person.submissions
      .filter((s) => s.formId === form.id)
      .map((s) => s.submission),
  }));

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 flex items-center gap-2 rounded-xl border border-(--border) bg-white px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:shadow-md"
        style={{ color: 'var(--podo-navy)' }}
      >
        ← Back to all persons
      </button>

      <div className="mb-8 flex items-center gap-5 rounded-2xl bg-white p-6 shadow-md">
        <div
          className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-linear-to-br text-2xl font-bold text-white shadow-lg ${AVATAR_COLORS[colorIdx]}`}
        >
          {initials || '?'}
        </div>
        <div>
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--podo-navy)' }}>
            {person.name}
          </h2>
          <p className="mt-1 text-sm text-(--muted)">
            {person.submissionCount} mention{person.submissionCount !== 1 ? 's' : ''} across{' '}
            {person.formIds.size} evidence categor{person.formIds.size !== 1 ? 'ies' : 'y'}
          </p>
        </div>
      </div>

      {groupedByForm.map(({ form, submissions }) => (
        <div key={form.key} className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
              style={{ background: `${form.color}1f` }}
            >
              {form.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--podo-navy)' }}>
                {form.label}
              </h3>
              <p className="text-xs text-(--muted)">
                {submissions.length} related entr{submissions.length !== 1 ? 'ies' : 'y'}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {submissions.map((sub, i) => (
              <NoteCard key={sub.id} submission={sub} meta={form} index={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
