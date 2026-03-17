"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function PillNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 w-[calc(100%-2rem)] max-w-6xl ${
        scrolled
          ? "bg-[#1e1e1e]/80 backdrop-blur-xl shadow-lg"
          : "bg-[#1e1e1e]/60 backdrop-blur-md"
      }`}
    >
      {/* Wordmark */}
      <Link
        href="/"
        className="font-display font-bold text-sm tracking-widest text-white"
      >
        REDACTED<span className="text-[#ff2c64]">DIGITAL</span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-display text-xs tracking-wider text-[#aaaaaa] hover:text-[#ff2c64] transition-colors duration-200"
          >
            {link.label.toUpperCase()}
          </Link>
        ))}
      </div>

      {/* CTA */}
      <Link
        href="/contact"
        className="hidden md:block bg-[#ff2c64] text-white font-display text-xs tracking-wider px-5 py-2 rounded-full hover:bg-[#ff2c64]/90 transition-colors duration-200"
      >
        REQUEST A BRIEFING
      </Link>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 cursor-pointer"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
            mobileOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
            mobileOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
            mobileOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1e1e1e]/95 backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-sm tracking-wider text-[#aaaaaa] hover:text-[#ff2c64] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-[#ff2c64] text-white font-display text-sm tracking-wider px-5 py-3 rounded-full text-center hover:bg-[#ff2c64]/90 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            REQUEST A BRIEFING
          </Link>
        </div>
      )}
    </nav>
  );
}
