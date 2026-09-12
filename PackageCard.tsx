import Link from "next/link";

export default function PackageCard({ pkg }: { pkg: (typeof import("@/lib/constants").PACKAGES)[number] }) {
  return (
    <div className="card overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="bg-brand-900 px-6 py-5">
        <h3 className="text-white text-xl">{pkg.name}</h3>
        <div className="text-brand-300 text-xs uppercase tracking-widest mt-1">
          {pkg.durationLabel} · Up to {pkg.maxGuests} guests
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="text-3xl font-display text-brand-900">
          ${(pkg.priceCents / 100).toFixed(0)}
          <span className="text-xs font-body text-silver-dark uppercase ml-1">per charter</span>
        </div>
        <p className="text-sm text-charcoal/70 mt-3">{pkg.targetSpecies}</p>
        <ul className="text-sm text-charcoal/70 mt-4 space-y-1 flex-1">
          <li>— {pkg.region}</li>
          <li>— Method: {pkg.method}</li>
          <li>— ${(pkg.depositCents / 100).toFixed(0)} deposit, ${(pkg.balanceCents / 100).toFixed(0)} balance due after</li>
        </ul>
        <div className="flex gap-3 mt-6">
          <Link href={`/charters/${pkg.slug}`} className="btn btn-outline flex-1">Details</Link>
          <Link href={`/book?package=${pkg.slug}`} className="btn btn-primary flex-1">Book</Link>
        </div>
      </div>
    </div>
  );
}
