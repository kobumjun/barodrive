export function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-500">{eyebrow}</p>
      <h2 className="text-3xl font-bold leading-tight text-zinc-900 md:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-zinc-600">{description}</p> : null}
    </div>
  );
}
