import { Surface } from '@/components/rd/Surface';
import { Eyebrow, CornerMark, FileCounter } from '@/components/rd/Annot';

type Tone = 'deep' | 'dark' | 'paper';

const SECTIONS: { id: string; tone: Tone; eyebrow: string; title: string }[] = [
  { id: 'hero', tone: 'deep', eyebrow: '// OPERATION FOCUS', title: 'Hero' },
  { id: 'ticker', tone: 'dark', eyebrow: '// CAPABILITY TICKER', title: 'Ticker' },
  { id: 'problem', tone: 'dark', eyebrow: '// THREAT ASSESSMENT', title: 'The problem' },
  { id: 'case-files', tone: 'paper', eyebrow: '// CASE FILES', title: 'Proof' },
  { id: 'capabilities', tone: 'paper', eyebrow: '// CAPABILITIES', title: 'What we do' },
  { id: 'method', tone: 'paper', eyebrow: '// THE METHOD', title: 'How it works' },
  { id: 'cta', tone: 'dark', eyebrow: '// MISSION BRIEFING', title: 'Final CTA' },
];

export default function Home() {
  return (
    <>
      {SECTIONS.map((s, i) => (
        <Surface key={s.id} tone={s.tone} className="min-h-[60vh]">
          <div id={s.id}>
            <CornerMark position="tr">
              <FileCounter index={i + 1} total={SECTIONS.length} />
            </CornerMark>
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h2 className="rd-display text-5xl sm:text-7xl">{s.title}</h2>
            <p className="font-body text-sm mt-4 opacity-60">
              Placeholder. Content arrives from the MagicPath export for this section.
            </p>
          </div>
        </Surface>
      ))}
    </>
  );
}
