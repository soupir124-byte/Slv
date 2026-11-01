// Logo original Embr : une braise stylisée faite de deux blocs (clin d'œil aux briques de jeu).
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="embr-g" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#c2410c" />
          <stop offset="1" stopColor="#ff8c42" />
        </linearGradient>
      </defs>
      <rect x="3" y="13" width="16" height="16" rx="4" fill="url(#embr-g)" />
      <rect x="13" y="3" width="16" height="16" rx="4" fill="#ff6a1a" opacity=".92" />
      <circle cx="21" cy="11" r="3" fill="#07070a" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark />
      <span className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
        embr<span className="text-ember">.</span>
      </span>
    </span>
  );
}
