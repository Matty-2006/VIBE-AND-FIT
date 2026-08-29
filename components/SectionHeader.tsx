type SectionHeaderProps = {
  eyebrow?: string;
  titleBefore?: string;
  titleEm?: string;
  description?: string;
  dark?: boolean;
};

export default function SectionHeader({
  eyebrow,
  titleBefore,
  titleEm,
  description,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 text-center ${dark ? "text-white" : ""}`}>
      {eyebrow && (
        <span className="mb-4 block text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-bronze">
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-[clamp(1.8rem,3vw,2.6rem)] font-bold tracking-[0.04em] ${
          dark ? "text-white" : ""
        }`}
      >
        {titleBefore}{" "}
        {titleEm && <em className="italic text-bronze">{titleEm}</em>}
      </h2>
      <div className="section-line mx-auto mt-4" />
      {description && (
        <p className="mt-4 font-serif italic text-grey">{description}</p>
      )}
    </div>
  );
}