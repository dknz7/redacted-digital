import { Surface } from '@/components/rd/Surface';
import { Eyebrow, CornerMark, FileCounter } from '@/components/rd/Annot';
import { RedactBlock } from '@/components/rd/RedactBlock';

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
        <Surface
          key={s.id}
          id={s.id}
          tone={s.tone}
          pad={i === 1 ? 'tight' : undefined}
          className={i === 1 ? '' : 'min-h-[60vh]'}
        >
          <CornerMark position="tr">
            <FileCounter index={i + 1} total={SECTIONS.length} />
          </CornerMark>
          <Eyebrow>{s.eyebrow}</Eyebrow>
          {i === 0 ? (
            // Above the fold, so it plays on mount rather than on scroll. Orange
            // because ink-900 would swallow a black bar.
            <RedactBlock
              blockColor="var(--color-rd-orange)"
              stagger={0.17}
              animateOnScroll={false}
              delay={0.3}
            >
              <h1 className="rd-display text-5xl sm:text-7xl max-w-4xl">
                Most websites are online ornaments. Yours should be a workhorse.
              </h1>
            </RedactBlock>
          ) : (
            <h2 className="rd-display text-5xl sm:text-7xl">{s.title}</h2>
          )}
          <p className="font-body text-sm mt-4 opacity-60">
            Placeholder. Content arrives from the MagicPath export for this section.
          </p>
        </Surface>
      ))}
    </>
  );
}
