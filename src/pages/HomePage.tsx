import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import detectivePodo from '../assets/detective_podo.png';
import { FORM_LIST, type FormMeta } from '../constants/forms';

const LEAD_TILTS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-1'];

export function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection openLeads={FORM_LIST.length.toString()} />
      <LeadsSection />
      <HowItWorksSection />
    </main>
  );
}

function HeroSection({ openLeads }: { openLeads: string }) {
  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--podo-navy)' }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full opacity-30 blur-3xl"
        style={{ background: 'var(--podo-orange)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{ background: 'var(--podo-blue)' }}
      />
      <EvidenceTape />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:pb-28 lg:pt-24">
        <DetectivePolaroid />
        <HeroCopy openLeads={openLeads} />
      </div>
    </section>
  );
}

function DetectivePolaroid() {
  return (
    <div className="relative mx-auto w-full max-w-88">
      <div className="relative -rotate-3 transition-transform duration-500 ease-out hover:rotate-0">
        <span className="absolute -top-3 left-1/2 z-20 h-6 w-28 -translate-x-1/2 rotate-[4deg] rounded-sm bg-yellow-200/80 shadow-md" />
        <div className="relative rounded-2xl bg-white p-3 pb-12 shadow-2xl ring-1 ring-black/5">
          <img
            src={detectivePodo}
            alt="Detective Podo, ready for the case"
            className="block aspect-square w-full rounded-xl object-cover"
            draggable={false}
          />
          <span
            className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs tracking-wide sm:text-sm"
            style={{ color: 'var(--podo-navy)' }}
          >
            Det. Podo · Field Op #001
          </span>
        </div>
      </div>

      <div className="absolute -right-2 top-3 z-30 max-w-45 rotate-6 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-black/5 sm:-right-6 sm:max-w-52.5">
        <p className="text-sm font-bold leading-snug" style={{ color: 'var(--podo-navy)' }}>
          Where shall we begin, partner?
        </p>
        <span className="absolute -bottom-2 left-7 h-4 w-4 rotate-45 bg-white" />
      </div>

      <PawPrint className="absolute -left-6 bottom-16 h-8 w-8 rotate-12 text-white/30" />
      <PawPrint className="absolute -right-10 bottom-4 h-6 w-6 -rotate-12 text-white/20" />
      <PawPrint className="absolute -left-12 -bottom-2 h-5 w-5 rotate-45 text-white/15" />
    </div>
  );
}

function HeroCopy({ openLeads }: { openLeads: string }) {
  return (
    <div className="text-center lg:text-left">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70 backdrop-blur">
        <span
          className="h-2 w-2 animate-pulse rounded-full"
          style={{ background: 'var(--podo-orange)' }}
        />
        Case File · Active
      </span>

      <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]">
        A clue is missing.{' '}
        <span className="relative inline-block">
          <span style={{ color: 'var(--podo-yellow)' }}>You're it.</span>
          <svg
            className="absolute -bottom-2 left-0 w-full"
            viewBox="0 0 200 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 8 Q 50 1, 100 6 T 198 4"
              stroke="var(--podo-orange)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg lg:mx-0">
        Five forms. One mystery. Help Detective Podo connect the dots between check-ins,
        sightings, intercepted messages and anonymous tips — and bring the case home.
      </p>

      <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 lg:items-start lg:justify-start">
        <Link
          to="/case"
          className="group inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-base font-bold text-white no-underline shadow-[0_8px_24px_rgba(255,97,0,0.45)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,97,0,0.65)]"
          style={{ background: 'var(--podo-orange)' }}
        >
          Open the Case Board
          <svg
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
        <a
          href="#leads"
          className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold text-white/80 no-underline backdrop-blur transition hover:bg-white/10 hover:text-white"
        >
          Pick a lead first
          <span aria-hidden="true">↓</span>
        </a>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 text-center lg:text-left">
        <Stat label="Open leads" value={openLeads} />
        <Stat
          label="JotForm sync"
          value={
            <span className="inline-flex items-center gap-2 sm:gap-2.5">
              <span
                className="h-2 w-2 animate-pulse rounded-full"
                style={{ background: 'var(--podo-green)' }}
              />
              LIVE
            </span>
          }
        />
      </div>
    </div>
  );
}

function LeadsSection() {
  return (
    <section id="leads" className="relative" style={{ background: 'var(--bg-subtle)' }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-20">
        <div className="mb-14 flex flex-col items-center text-center">
          <span
            className="mb-3 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: 'var(--podo-orange)' }}
          >
            ✦ Pick a lead ✦
          </span>
          <h2
            className="text-3xl font-extrabold sm:text-4xl"
            style={{ color: 'var(--podo-navy)' }}
          >
            Where would you like to start?
          </h2>
          <p className="mt-3 max-w-lg text-(--text)">
            Each card is a different angle on the case. Follow whichever thread feels hottest —
            you can always loop back.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FORM_LIST.map((form, i) => (
            <LeadCard
              key={form.key}
              form={form}
              index={i + 1}
              tilt={LEAD_TILTS[i % LEAD_TILTS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--podo-navy-light)' }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-20">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.3em] text-white/50">
            How the investigation works
          </span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Three steps to crack the case.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Step
            n="01"
            title="Pick a lead"
            body="Choose any of the five evidence categories from the case board."
          />
          <Step
            n="02"
            title="Inspect the file"
            body="Browse every entry — submissions, dates, sources — pulled live from JotForm."
          />
          <Step
            n="03"
            title="Connect the dots"
            body="Spot the patterns Podo missed and crack open the mystery."
          />
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-6 text-center backdrop-blur sm:flex-row sm:px-8 sm:text-left">
          <span className="text-3xl" aria-hidden="true">
            🐾
          </span>
          <p className="flex-1 text-sm text-white/80 sm:text-base">
            Live data is fetched on every visit — no fixtures, no fakes. Just real evidence,
            straight from the JotForm API.
          </p>
          <Link
            to="/case"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white no-underline transition hover:opacity-90"
            style={{ background: 'var(--podo-orange)' }}
          >
            Start investigating
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <p className="text-2xl font-extrabold text-white sm:text-3xl">{value}</p>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">
        {label}
      </p>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20 hover:bg-white/10">
      <span
        className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl font-mono text-base font-bold text-white"
        style={{ background: 'var(--podo-orange)' }}
      >
        {n}
      </span>
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-white/70">{body}</p>
    </div>
  );
}

function LeadCard({
  form,
  index,
  tilt,
}: {
  form: FormMeta;
  index: number;
  tilt: string;
}) {
  return (
    <Link
      to={`/case/${form.slug}`}
      className={`group relative flex flex-col gap-3 rounded-2xl border border-(--border) bg-white p-6 no-underline shadow-(--shadow-sm) transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0 hover:shadow-(--shadow-lg) ${tilt}`}
    >
      <span
        className="absolute -top-2 left-6 h-3 w-16 rounded-t-md"
        style={{ background: form.color }}
      />

      <div className="flex items-start justify-between gap-3 pt-2">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
          style={{ background: `${form.color}1f` }}
        >
          {form.icon}
        </div>
        <span className="font-mono text-[11px] font-medium text-(--muted)">
          Lead 0{index}
        </span>
      </div>

      <div>
        <h3 className="text-lg font-extrabold" style={{ color: 'var(--podo-navy)' }}>
          {form.label}
        </h3>
        <p className="mt-1 text-sm text-(--text)">{form.description}</p>
      </div>

      <div className="mt-2 flex items-end justify-end border-t border-dashed border-(--border) pt-3">
        <span
          className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition-all group-hover:gap-2"
          style={{ background: `${form.color}1a`, color: form.color }}
        >
          Investigate
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

function PawPrint({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="8" cy="6" r="2" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="5" cy="11" r="1.5" />
      <circle cx="19" cy="11" r="1.5" />
      <ellipse cx="12" cy="16" rx="5" ry="4" />
    </svg>
  );
}

function EvidenceTape() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-7 -rotate-1 origin-top-left translate-y-3"
      style={{
        background:
          'repeating-linear-gradient(135deg, var(--podo-yellow) 0 18px, #1a2a4a 18px 36px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      }}
      aria-hidden="true"
    />
  );
}
