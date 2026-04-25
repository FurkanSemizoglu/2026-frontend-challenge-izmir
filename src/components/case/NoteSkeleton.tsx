const ROTATIONS = [
  '-rotate-1',
  'rotate-[0.5deg]',
  '-rotate-[0.7deg]',
  'rotate-1',
  '-rotate-[0.4deg]',
  'rotate-[0.8deg]',
];

export function NoteSkeleton({ index }: { index: number }) {
  const rotation = ROTATIONS[index % ROTATIONS.length];
  return (
    <div className={rotation}>
      <div className="rounded-sm bg-white p-5 shadow-[2px_3px_12px_rgba(0,0,0,0.06)]">
        <div className="mb-4 h-3 w-24 animate-pulse rounded bg-(--code-bg)" />
        <div className="mb-3 h-4 w-full animate-pulse rounded bg-(--code-bg)" />
        <div className="mb-3 h-4 w-3/4 animate-pulse rounded bg-(--code-bg)" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-(--code-bg)" />
      </div>
    </div>
  );
}
