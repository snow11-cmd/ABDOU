import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  index,
  className,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  index?: string;
  className?: string;
}) {
  const words = title.trim().split(/\s+/);
  const lastWord = words[words.length - 1] ?? title;
  const lead = words.slice(0, -1).join(" ");

  return (
    <div
      className={cn(
        "section-heading mb-14 flex flex-col gap-5 sm:mb-16",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" ? "justify-center" : "justify-start",
        )}
      >
        <span className="kicker-line" aria-hidden="true" />
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.08em] text-[#a9bcff] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur">
          <span className="section-heading-dot h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#5b7cff] to-[#22d3ee] shadow-[0_0_10px_2px_rgba(91,124,255,0.4)]" />
          {eyebrow}
          {index ? (
            <span className="section-index ms-1" dir="ltr" aria-hidden="true">
              {index}
            </span>
          ) : null}
        </span>
        {align === "center" ? <span className="kicker-line rotate-180" aria-hidden="true" /> : null}
      </div>

      <h2 className="max-w-4xl text-[2rem] leading-[1.16] font-extrabold tracking-[-0.035em] text-balance text-white sm:text-4xl md:text-[3.1rem]">
        {lead ? `${lead} ` : ""}
        <span className="text-gradient">{lastWord}</span>
      </h2>

      {subtitle ? (
        <p className="max-w-2xl text-[0.98rem] leading-[1.9] text-pretty text-[#96a0b6] sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
