import type { NoteStyle } from '../../constants/forms';

interface NoteDecorationProps {
  style: NoteStyle;
  color: string;
}

export function NoteDecoration({ style, color }: NoteDecorationProps) {
  if (style === 'pin') return <PushPin color={color} />;
  if (style === 'tape') return <TapeStrip />;
  return <PaperClip color={color} />;
}

function PushPin({ color }: { color: string }) {
  return (
    <div className="absolute -top-2.5 left-1/2 z-10 -translate-x-1/2">
      <div
        className="h-5 w-5 rounded-full shadow-md"
        style={{ background: `radial-gradient(circle at 35% 35%, ${color}, ${color}cc)` }}
      />
      <div className="mx-auto h-1.5 w-0.5 bg-gray-400" />
    </div>
  );
}

function TapeStrip() {
  return (
    <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
      <div className="h-5 w-20 rotate-2 rounded-sm bg-yellow-200/80 shadow-sm" />
    </div>
  );
}

function PaperClip({ color }: { color: string }) {
  return (
    <div className="absolute -right-2 -top-2 z-10">
      <svg width="28" height="44" viewBox="0 0 28 44" fill="none" className="rotate-15">
        <path
          d="M14 4 C14 2, 24 2, 24 10 L24 34 C24 40, 4 40, 4 34 L4 14 C4 10, 14 10, 14 14 L14 30"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
