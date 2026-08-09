import React from 'react';

type Tone = 'deep' | 'dark' | 'paper';
type Pad = 'none' | 'tight' | 'normal';

const TONE: Record<Tone, string> = {
  deep: 'bg-ink-900 text-ink-050',
  dark: 'bg-ink-800 text-ink-050 rd-grid-dark',
  paper: 'bg-paper text-ink-900 rd-grid-paper',
};

const PAD: Record<Pad, string> = {
  none: '',
  tight: 'py-4 sm:py-5',
  normal: 'py-20 sm:py-28',
};

export function Surface({
  tone,
  id,
  bleed = false,
  pad = 'normal',
  children,
  className = '',
}: {
  tone: Tone;
  id?: string;
  bleed?: boolean;
  pad?: Pad;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative w-full scroll-mt-20 ${TONE[tone]} ${className}`}
    >
      <div className={bleed ? `w-full ${PAD[pad]}` : `mx-auto w-full max-w-[1180px] px-6 ${PAD[pad]}`}>
        {children}
      </div>
    </section>
  );
}
