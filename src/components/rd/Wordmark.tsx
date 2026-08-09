'use client';

import React, { useState, useEffect } from 'react';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

export function Wordmark({
  tone = 'asphalt',
  size = 34,
}: {
  tone?: 'paper' | 'asphalt';
  size?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(() => reduced);

  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(() => setOpen(true), 350);
    return () => window.clearTimeout(t);
  }, [reduced]);

  const isPaper = tone === 'paper';

  return (
    <div
      className="rd-display inline-block select-none"
      style={{ fontSize: size, color: isPaper ? '#131416' : '#E8E9EA' }}
    >
      <div>Redacted</div>
      <div
        className={`w-full px-[0.14em] ${reduced ? '' : 'transition-colors duration-500'}`}
        style={{
          backgroundColor: isPaper ? '#000000' : open ? '#E2561C' : '#E8E9EA',
          color: open ? (isPaper ? '#F2EEE6' : '#FFFFFF') : 'transparent',
        }}
      >
        Digital
      </div>
    </div>
  );
}
