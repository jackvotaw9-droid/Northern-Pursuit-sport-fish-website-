import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import LogoutButton from "@/components/admin/LogoutButton";

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/calendar", label: "Calendar" },
  { href: "/admin/reports", label: "Fishing Reports" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/gift-cards", label: "Gift Cards" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-silver-light">
      <aside className="w-56 bg-ink text-silver p-6 hidden md:flex md:flex-col">
        <div className="font-display text-white uppercase mb-8">NP Admin</div>
        <nav className="space-y-1 flex-1">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="block py-2 text-sm hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/10 pt-4 text-xs">
          <div className="text-silver-dark mb-2">{session.email}</div>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
