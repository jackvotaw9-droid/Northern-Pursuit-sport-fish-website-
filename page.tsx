import { prisma } from "@/lib/prisma";

export default async function AdminOverview() {
  let stats = { upcoming: 0, deposits: 0, outstanding: 0, todaysTrips: 0 };
  try {
    const bookings = await prisma.booking.findMany({ where: { status: "CONFIRMED" } });
    stats.upcoming = bookings.length;
    stats.deposits = bookings.reduce((s, b) => s + b.depositCents, 0);
    stats.outstanding = bookings.reduce((s, b) => s + (b.balancePaidAt ? 0 : b.balanceCents), 0);
  } catch {
    // No live database connected in this preview environment.
  }

  return (
    <div>
      <h1 className="text-2xl font-display uppercase text-brand-900 mb-6">Overview</h1>
      <div className="grid sm:grid-cols-4 gap-4">
        <StatCard label="Upcoming Trips" value={stats.upcoming} />
        <StatCard label="Deposits Received" value={`$${(stats.deposits / 100).toFixed(0)}`} />
        <StatCard label="Outstanding Balances" value={`$${(stats.outstanding / 100).toFixed(0)}`} />
        <StatCard label="Today's Trips" value={stats.todaysTrips} />
      </div>
      <p className="text-xs text-silver-dark mt-8">
        Connect DATABASE_URL in .env and run `npm run db:seed` to see live numbers here.
      </p>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card p-5 bg-white">
      <div className="text-3xl font-display text-brand-900">{value}</div>
      <div className="text-xs uppercase text-silver-dark mt-1">{label}</div>
    </div>
  );
}
