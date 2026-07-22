"use client";

import RedactionReveal from "@/components/ui/RedactionReveal";

const resources = [
  {
    title: "5 Things Every Tradie's Website Needs in 2026",
    type: "GUIDE",
    status: "COMING SOON",
  },
  {
    title: "Free Website Health Check",
    type: "TOOL",
    status: "COMING SOON",
  },
  {
    title: "Local SEO Checklist for Central Coast Businesses",
    type: "GUIDE",
    status: "COMING SOON",
  },
];

export default function ResourcesSection() {
  return (
    <section className="pt-12 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <RedactionReveal>
          <p className="font-display text-base md:text-lg tracking-widest text-[#ff2c64] mb-2">
            // FIELD RESOURCES
          </p>
        </RedactionReveal>
        <RedactionReveal delay={200}>
          <p className="font-body text-lg text-[#aaaaaa] mb-12">
            Free intel. No email required. No strings attached.
          </p>
        </RedactionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <RedactionReveal key={index} delay={index * 200}>
              <div className="bg-[#1e1e1e] rounded-lg border border-[#3a3a3a]/20 p-6 flex flex-col justify-between min-h-[180px]">
                <div>
                  <span className="font-display text-[10px] tracking-widest text-[#ff2c64]">
                    {resource.type}
                  </span>
                  <h3 className="font-display text-sm tracking-wider text-white mt-3">
                    {resource.title.toUpperCase()}
                  </h3>
                </div>
                <span className="font-display text-[10px] tracking-widest text-[#aaaaaa] mt-4">
                  [{resource.status}]
                </span>
              </div>
            </RedactionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
