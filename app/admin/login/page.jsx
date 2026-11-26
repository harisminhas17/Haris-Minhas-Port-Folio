import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/session";
import LoginForm from "@/components/admin/LoginForm";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong font-mono text-[11px] text-muted">
            HM
          </span>
          <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight">
            Admin sign in
          </h1>
          <p className="mt-2 text-sm text-muted">
            Content management for the portfolio.
          </p>
        </div>

        <LoginForm />

        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
          <a href="/" className="transition-colors hover:text-ink">
            ← Back to site
          </a>
        </p>
      </div>
    </main>
  );
}
