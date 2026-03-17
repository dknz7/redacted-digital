export default function TickerSection() {
  const capabilities = [
    "WEB DESIGN",
    "LEAD CAPTURE",
    "AI AUTOMATION",
    "SEO",
    "LOCAL SEARCH",
    "BOOKING SYSTEMS",
    "REVIEW MANAGEMENT",
    "AI RECEPTIONIST",
    "MISSED CALL RECOVERY",
    "GOOGLE BUSINESS PROFILE",
    "CRM",
    "SMS FOLLOW-UP",
    "MOBILE APP MANAGEMENT",
  ];

  const separator = " // ";
  const tickerContent = capabilities.join(separator) + separator;

  return (
    <section className="w-full bg-[#282828] py-3 overflow-hidden border-y border-[#3a3a3a]/30">
      <div
        className="whitespace-nowrap font-display text-sm tracking-widest text-[#ff2c64]"
        style={{ animation: "ticker-scroll 30s linear infinite" }}
      >
        <span>{tickerContent}</span>
        <span>{tickerContent}</span>
      </div>
    </section>
  );
}
