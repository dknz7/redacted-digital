import Link from 'next/link';

const COLUMNS = [
  {
    title: 'Services',
    links: [
      { href: '/services/design', label: 'Design' },
      { href: '/services/lead-capture', label: 'Lead Capture' },
      { href: '/services/ai-automation', label: 'AI & Automation' },
      { href: '/services/seo', label: 'SEO & Local Search' },
      { href: '/services/app-management', label: 'App Management' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/success-stories', label: 'Success Stories' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-ink-900 border-t border-ink-700">
      <div className="mx-auto max-w-[1180px] px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="font-annot text-[10px] tracking-[0.12em] uppercase text-ink-400 leading-relaxed">
          Redacted Digital
          <br />
          Central Coast, NSW
          <br />
          byron@redacteddigital.au
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="font-annot text-[10px] tracking-[0.14em] uppercase text-ink-400 mb-3">
              {col.title}
            </div>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-body text-[13px] text-ink-200 hover:text-rd-orange transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-[1180px] px-6 pb-8 font-annot text-[10px] tracking-[0.1em] uppercase text-ink-400">
        © 2026 Redacted Digital. All rights reserved.
      </div>
    </footer>
  );
}
