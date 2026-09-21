export default function Divider() {
  return (
    <div
      className="container flex items-center justify-center py-6 max-[768px]:py-5"
      aria-hidden="true"
    >
      <span className="divider-line h-px w-28 max-[768px]:w-16 text-grey/60" />
      <span className="mx-6 block size-[9px] rotate-45 border border-bronze/70 max-[768px]:mx-4" />
      <span className="divider-line h-px w-28 max-[768px]:w-16 text-grey/60" />
    </div>
  );
}