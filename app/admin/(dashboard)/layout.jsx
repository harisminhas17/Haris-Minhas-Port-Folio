import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/session";
import AdminNav from "@/components/admin/AdminNav";

export default async function DashboardLayout({ children }) {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <AdminNav email={session.email} />
      <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">{children}</main>
    </div>
  );
}
