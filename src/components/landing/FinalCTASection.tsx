import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section className="pt-16 pb-32 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <p className="font-display text-base md:text-lg tracking-widest text-[#ff2c64] mb-8">
          // MISSION BRIEFING REQUESTED
        </p>

        <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-6 text-white">
          READY TO PUT YOUR WEBSITE TO WORK?
        </h2>

        <p className="font-body text-lg text-[#aaaaaa] mb-10">
          Less phone time, more tool time.
        </p>

        <Link
          href="/contact"
          className="inline-block bg-[#ff2c64] text-white font-display text-base tracking-wider px-10 py-5 rounded-full hover:bg-[#ff2c64]/90 transition-colors duration-200"
        >
          REQUEST A BRIEFING
        </Link>
      </div>
    </section>
  );
}
