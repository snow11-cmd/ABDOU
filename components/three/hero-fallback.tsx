export function HeroFallback() {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      data-hero-fallback
      aria-hidden="true"
    >
      <div className="absolute h-[320px] w-[320px] rounded-full bg-[#5b7cff]/25 blur-[100px] sm:h-[460px] sm:w-[460px]" />
      <div className="absolute h-[220px] w-[220px] rounded-full bg-[#9d7bff]/20 blur-[80px] sm:h-[300px] sm:w-[300px]" />
      <div className="absolute h-[140px] w-[140px] rounded-full bg-[#22d3ee]/10 blur-[60px]" />

      <div className="relative grid h-[280px] w-[280px] place-items-center sm:h-[380px] sm:w-[380px]">
        <div className="animate-spin-slower absolute inset-0 rounded-full border border-dashed border-white/10" />
        <div
          className="absolute inset-8 rounded-full border border-[#7f9cff]/15"
          style={{ rotate: "x 64deg" }}
        />
        <div
          className="absolute inset-16 animate-[spin-slow_42s_linear_infinite_reverse] rounded-full border border-[#b49cff]/20"
          style={{ rotate: "y 56deg" }}
        />
        <div className="absolute inset-6 rounded-full bg-[conic-gradient(from_140deg,transparent,rgba(91,124,255,0.16),transparent_35%,rgba(157,123,255,0.14),transparent_72%)] blur-md" />

        <div className="relative h-[172px] w-[172px] rounded-full p-[1px] shadow-[0_0_100px_-12px_rgba(91,124,255,0.65)] sm:h-[208px] sm:w-[208px]">
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_210deg,rgba(255,255,255,0.7),rgba(91,124,255,0.15),rgba(157,123,255,0.5),rgba(34,211,238,0.2),rgba(255,255,255,0.7))] opacity-70 blur-[1px]" />
          <div className="relative h-full w-full overflow-hidden rounded-full bg-[radial-gradient(circle_at_31%_24%,rgba(255,255,255,0.92)_0%,rgba(201,219,255,0.4)_10%,rgba(76,108,196,0.34)_34%,rgba(13,21,43,0.92)_68%,rgba(4,7,14,0.98)_82%)] shadow-[inset_-18px_-24px_60px_rgba(0,0,0,0.72),inset_18px_22px_46px_rgba(180,204,255,0.24)]">
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_150deg,transparent_0deg,rgba(34,211,238,0.18)_56deg,transparent_118deg,rgba(157,123,255,0.24)_196deg,transparent_272deg)] opacity-80" />
            <div className="absolute inset-5 rounded-full border border-white/10" />
            <div className="absolute inset-[18%] rotate-45 rounded-[38%] border border-[#b7ccff]/25 bg-[radial-gradient(circle_at_38%_32%,rgba(255,255,255,0.32),rgba(91,124,255,0.12)_44%,transparent_72%)]" />
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full opacity-90"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="fallback-ribbon"
                  x1="36"
                  y1="42"
                  x2="168"
                  y2="168"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#f8fbff" />
                  <stop offset="0.28" stopColor="#9db8ff" />
                  <stop offset="0.52" stopColor="#4368ff" />
                  <stop offset="0.76" stopColor="#c4b5fd" />
                  <stop offset="1" stopColor="#67e8f9" />
                </linearGradient>
                <linearGradient
                  id="fallback-ribbon-highlight"
                  x1="62"
                  y1="60"
                  x2="140"
                  y2="142"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M56 142C24 112 30 66 70 54c40-12 72 18 48 50-20 28-38 48-8 58 34 11 68-12 52-50"
                stroke="rgba(79,124,255,0.35)"
                strokeWidth="26"
                strokeLinecap="round"
                style={{ filter: "blur(8px)" }}
              />
              <path
                d="M56 142C24 112 30 66 70 54c40-12 72 18 48 50-20 28-38 48-8 58 34 11 68-12 52-50"
                stroke="url(#fallback-ribbon)"
                strokeWidth="15"
                strokeLinecap="round"
              />
              <path
                d="M62 132C38 106 44 72 74 62"
                stroke="url(#fallback-ribbon-highlight)"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>
            <div className="absolute inset-x-7 top-3 h-10 rounded-full bg-white/20 blur-xl" />
            <div className="absolute bottom-5 left-5 h-2 w-2 rounded-full bg-[#67e8f9] shadow-[0_0_16px_5px_rgba(34,211,238,0.55)]" />
          </div>
        </div>

        <div className="absolute top-8 right-4 h-3 w-3 rotate-45 bg-[#7dd3fc] shadow-[0_0_20px_5px_rgba(34,211,238,0.5)]" />
        <div className="absolute bottom-10 left-2 h-2.5 w-2.5 rotate-12 bg-[#c4b5fd] shadow-[0_0_18px_5px_rgba(157,123,255,0.55)]" />
        <div className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/80 shadow-[0_0_12px_4px_rgba(255,255,255,0.45)]" />
      </div>
    </div>
  );
}
