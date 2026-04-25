interface BadgeProps {
  count: number;
}

export function Badge({ count }: BadgeProps) {
  return (
    <span className="ml-2 inline-flex items-center rounded-full bg-[var(--accent-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]">
      {count}
    </span>
  );
}
