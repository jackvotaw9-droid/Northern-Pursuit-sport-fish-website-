import Link from "next/link";
import { BUSINESS, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-ink text-silver pb-24 lg:pb-0">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <div className="font-display text-xl text-white uppercase tracking-wide">Northern Pursuit</div>
          <p className="text-sm text-silver-dark mt-1">{BUSINESS.slogan}</p>
          <p className="text-xs text-silver-dark mt-6 leading-relaxed">
            {BUSINESS.regions.join(" · ")}
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-brand-300 mb-4">Contact</div>
          <ul className="space-y-2 text-sm">
            <li><a href={BUSINESS.phoneHref} className="hover:text-white">{BUSINESS.phone}</a></li>
            <li><a href={`mailto:${BUSINESS.email}`} className="hover:text-white">{BUSINESS.email}</a></li>
            <li><a href={BUSINESS.instagramUrl} target="_blank" className="hover:text-white">{BUSINESS.instagramHandle}</a></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-brand-300 mb-4">Explore</div>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.slice(0, 6).map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-brand-300 mb-4">Policies</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/policies/cancellation" className="hover:text-white">Charter & Cancellation Policy</Link></li>
            <li><Link href="/policies/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/policies/terms" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link href="/policies/accessibility" className="hover:text-white">Accessibility Statement</Link></li>
          </ul>
          <Link href="/book" className="btn btn-primary mt-6 w-full">Book Your Trip</Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-silver-dark">
        © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
      </div>
    </footer>
  );
}
