import { ShaderFlow } from "@/components/shaders/shader-flow";

const MASK =
  "radial-gradient(ellipse 68% 58% at 50% 36%, transparent 0%, transparent 30%, rgba(0,0,0,0.35) 56%, rgba(0,0,0,0.92) 82%, #000 100%)";

export function PageBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[820px] overflow-hidden sm:h-[1040px]"
    >
      <div
        className="absolute inset-0 opacity-35 dark:opacity-[0.18]"
        style={{ WebkitMaskImage: MASK, maskImage: MASK }}
      >
        <ShaderFlow className="absolute inset-0 h-full w-full" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-white dark:to-[#0b0b0c]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.5),transparent_58%)] dark:bg-[radial-gradient(ellipse_at_50%_0%,rgba(198,161,91,0.09),transparent_58%)]" />
    </div>
  );
}
