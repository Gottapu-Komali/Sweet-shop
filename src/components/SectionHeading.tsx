type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.35em] text-slate">{subtitle}</p>
      <h2 className="text-3xl font-display text-brown sm:text-4xl">{title}</h2>
    </div>
  );
}
