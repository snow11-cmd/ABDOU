"use client";

const tech = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Three.js",
  "Supabase",
  "PostgreSQL",
  "Node.js",
  "Framer Motion",
  "Figma",
];

export function TechMarquee() {
  const row = [...tech, ...tech];
  return (
    <div
      dir="ltr"
      className="marquee relative w-full max-w-4xl overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_14%,#000_86%,transparent)]"
    >
      <div className="marquee-track flex w-max items-center gap-12 py-2">
        {row.map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.18em] whitespace-nowrap text-[#8793ab] uppercase transition-colors duration-500 hover:text-[#d5deef]"
          >
            <span className="h-1 w-1 rotate-45 bg-gradient-to-br from-[#5b7cff] to-[#22d3ee] opacity-70" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
