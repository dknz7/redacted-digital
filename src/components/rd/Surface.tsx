import React from 'react';

type Tone = 'deep' | 'dark' | 'paper';

const TONE: Record<Tone, string> = {
  deep: 'bg-ink-900 text-ink-050',
  dark: 'bg-ink-800 text-ink-050 rd-grid-dark',
  paper: 'bg-paper text-ink-900 rd-grid-paper',
};

export function Surface({
  tone,
  children,
  className = '',
}: {
  tone: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative w-full ${TONE[tone]} ${className}`}>
      <div className="mx-auto w-full max-w-[1180px] px-6 py-20 sm:py-28">{children}</div>
    </section>
  );
}
