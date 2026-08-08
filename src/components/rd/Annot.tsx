import React from 'react';

export function Eyebrow({
  children,
  muted,
}: {
  children: React.ReactNode;
  muted?: React.ReactNode;
}) {
  return (
    <div className="font-annot text-[11px] tracking-[0.16em] uppercase text-rd-orange mb-4">
      {children}
      {muted ? <span className="text-ink-400"> {muted}</span> : null}
    </div>
  );
}

export function CornerMark({
  position,
  children,
}: {
  position: 'tl' | 'tr';
  children: React.ReactNode;
}) {
  const place = position === 'tl' ? 'left-5' : 'right-5';
  return (
    <div
      className={`absolute top-4 ${place} font-annot text-[10px] tracking-[0.1em] text-ink-400`}
    >
      {children}
    </div>
  );
}

export function FileCounter({ index, total }: { index: number; total: number }) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <span className="font-annot text-[10px] tracking-[0.12em] text-ink-400">
      [ <span className="text-rd-orange">{pad(index)}</span> / {pad(total)} ]
    </span>
  );
}
