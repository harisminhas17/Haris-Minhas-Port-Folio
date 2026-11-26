export function SectionLabel({ children, className = "" }) {
  return (
    <p className={`label flex items-center gap-3 ${className}`}>
      <span className="inline-block h-px w-8 bg-line-strong" aria-hidden="true" />
      {children}
    </p>
  );
}

export function Arrow({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PillButton({ href, children, variant = "solid", className = "" }) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 h-12 text-sm font-medium transition-all duration-300 ease-expo focus-visible:outline-2 focus-visible:outline-offset-4";
  const styles =
    variant === "solid"
      ? "bg-accent text-[color:var(--accent-ink)] hover:bg-accent-hover"
      : "border border-line-strong text-ink hover:border-ink hover:bg-hover-fill";

  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <Arrow className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-1" />
    </a>
  );
}
