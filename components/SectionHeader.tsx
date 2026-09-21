import SplitText, { type SplitWord } from "@/components/SplitText";

type SectionHeaderProps = {
  eyebrow?: string;
  titleBefore?: string;
  titleEm?: string;
  description?: string;
  dark?: boolean;
};

function wordsFor(titleBefore?: string, titleEm?: string): SplitWord[] {
  return [
    ...(titleBefore
      ? titleBefore.split(" ").filter(Boolean).map((text) => ({ text }))
      : []),
    ...(titleEm
      ? titleEm.split(" ").filter(Boolean).map((text) => ({ text, accent: true }))
      : []),
  ];
}

export default function SectionHeader({
  eyebrow,
  titleBefore,
  titleEm,
  description,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 max-w-[820px] ${dark ? "text-white" : ""}`}>
      {eyebrow && (
        <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-bronze">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.05] tracking-tight text-balance ${
          dark ? "text-white" : ""
        }`}
      >
        <SplitText
          words={wordsFor(titleBefore, titleEm)}
          accentClassName={
            dark ? "italic text-bronze-light" : "italic text-bronze"
          }
        />
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-[62ch] text-base leading-relaxed ${
            dark ? "text-white/70" : "text-grey"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}