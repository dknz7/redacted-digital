'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Wordmark } from './Wordmark';

const LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/success-stories', label: 'Success Stories' },
  { href: '/about', label: 'About' },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full bg-ink-900/90 backdrop-blur border-b border-ink-700">
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-6 py-4">
        <Link href="/" aria-label="Redacted Digital home">
          <Wordmark tone="asphalt" size={20} />
        </Link>
        <ul className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-annot text-[11px] tracking-[0.12em] uppercase text-ink-200 hover:text-rd-orange transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="md:hidden font-annot text-[11px] tracking-[0.12em] uppercase text-ink-200 px-3 py-2"
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <Link
          href="/contact"
          className="font-annot text-[11px] tracking-[0.12em] uppercase bg-rd-orange text-white px-4 py-2.5 rounded-sm hover:bg-rd-orange-dim transition-colors"
        >
          Request a briefing
        </Link>
      </nav>
      <ul
        id="mobile-nav"
        hidden={!open}
        className="md:hidden border-t border-ink-700 px-6 py-4 space-y-1"
      >
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 font-annot text-[12px] tracking-[0.12em] uppercase text-ink-200 hover:text-rd-orange transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
