export const metadata = {
  title: "Admin — Haris Minhas",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return <div className="min-h-dvh bg-[color:var(--canvas)]">{children}</div>;
}
