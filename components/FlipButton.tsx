export default function FlipButton({
  front,
  back,
  className = "",
  backClass = "",
}: {
  front: string;
  back: string;
  className?: string;
  backClass?: string;
}) {
  return (
    <span className={`flip-btn ${className}`}>
      <span data-front>{front}</span>
      <span data-back className={backClass}>
        {back}
      </span>
    </span>
  );
}