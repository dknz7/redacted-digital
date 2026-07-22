"use client";

import FlipCard from "@/components/ui/FlipCard";
import RedactionReveal from "@/components/ui/RedactionReveal";
import Link from "next/link";

const services = [
  {
    title: "Design",
    description:
      "A website that doesn't just exist. It wows your visitors and works for you. Just like your work and tools.",
    href: "/services/design",
    icon: "🎨",
  },
  {
    title: "Lead Capturing",
    description:
      "Every enquiry caught. Every lead followed up. Automatically.",
    href: "/services/lead-capturing",
    icon: "🎯",
  },
  {
    title: "AI & Automation",
    description: "Missed calls and lost bookings a thing of the past. 24/7.",
    href: "/services/ai-automation",
    icon: "🤖",
  },
  {
    title: "SEO & Local Search",
    description:
      "Be the first local business they find, not your competitor with a better site.",
    href: "/services/seo",
    icon: "📍",
  },
  {
    title: "Mobile App Management",
    description:
      "Run and manage your business from your pocket. Take advantage of our powerful integrations.",
    href: "/services/mobile-management",
    icon: "📱",
  },
];

export default function SolutionSection() {
  return (
    <section className="pt-10 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <FlipCard key={service.title} {...service} index={index} />
          ))}
        </div>

        {/* Mobile hint */}
        <p className="mt-4 text-center font-display text-xs tracking-widest text-[#aaaaaa] md:hidden">
          TAP TO DECLASSIFY
        </p>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-block bg-[#ff2c64] text-white font-display text-sm tracking-wider px-8 py-4 rounded-full hover:bg-[#ff2c64]/90 transition-colors duration-200"
          >
            REQUEST A BRIEFING
          </Link>
        </div>
      </div>
    </section>
  );
}
