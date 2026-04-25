const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', DATE_FORMAT_OPTIONS);
}

export function formatRelative(dateStr: string): string {
  const diffMinutes = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60_000);

  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return formatDate(dateStr);
}
