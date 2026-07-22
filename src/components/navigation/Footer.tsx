import Link from "next/link";

const mainLinks = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Design", href: "/services/design" },
  { label: "Lead Capturing", href: "/services/lead-capturing" },
  { label: "AI & Automation", href: "/services/ai-automation" },
  { label: "SEO & Local Search", href: "/services/seo" },
  { label: "Mobile App Management", href: "/services/mobile-management" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1e1e1e] border-t border-[#3a3a3a]/20 py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="font-display font-bold text-lg tracking-widest text-white"
          >
            REDACTED<span className="text-[#ff2c64]">DIGITAL</span>
          </Link>
          <p className="font-body text-sm text-[#aaaaaa] mt-3">
            Websites that work while you work.
          </p>
          <p className="font-body text-sm text-[#aaaaaa] mt-1">
            NSW based. Australia wide focused.
          </p>
          <p className="font-display text-[10px] tracking-widest text-[#aaaaaa]/50 mt-4">
            ABN: [TBD]
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-display text-xs tracking-widest text-[#ff2c64] mb-4">
            // NAVIGATION
          </h4>
          <ul className="space-y-2">
            {mainLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm text-[#aaaaaa] hover:text-[#ff2c64] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display text-xs tracking-widest text-[#ff2c64] mb-4">
            // SERVICES
          </h4>
          <ul className="space-y-2">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm text-[#aaaaaa] hover:text-[#ff2c64] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-xs tracking-widest text-[#ff2c64] mb-4">
            // CONTACT
          </h4>
          <p className="font-body text-sm text-[#aaaaaa]">
            hello@redacteddigital.au
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-[#3a3a3a]/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-display text-[10px] tracking-widest text-[#aaaaaa]">
          © {new Date().getFullYear()} REDACTED DIGITAL. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-4">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-[10px] tracking-widest text-[#aaaaaa] hover:text-[#ff2c64] transition-colors"
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
