import { prisma } from "@/lib/prisma";

export const metadata = { title: "Reviews" };

export default async function ReviewsPage() {
  let reviews: Awaited<ReturnType<typeof prisma.review.findMany>> = [];
  try {
    reviews = await prisma.review.findMany({ where: { approved: true }, orderBy: { createdAt: "desc" } });
  } catch {
    // No database connected in this environment/preview — render the empty state below.
  }

  return (
    <div className="pt-32 section max-w-3xl">
      <div className="eyebrow">Dock Talk</div>
      <h1 className="text-4xl md:text-5xl mb-10">What Anglers Say</h1>

      {reviews.length === 0 ? (
        <div className="card p-8 text-center text-charcoal/60">
          No reviews have been published yet. Real, verified reviews will appear here once Captain Jack
          approves them from the admin dashboard — nothing here is ever fabricated.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {reviews.map((r) => (
            <div key={r.id} className="card p-6">
              <div className="text-brand-500 text-sm mb-2">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
              <p className="text-sm text-charcoal/80">{r.body}</p>
              <div className="text-xs uppercase text-silver-dark mt-4">{r.name}{r.tripType ? ` — ${r.tripType}` : ""}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
