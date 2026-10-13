import Link from "next/link";
import type { SeoLanding } from "../lib/landing-data";
import { serviceStructuredData } from "../lib/seo";

export default function SeoLandingPage({ page }: { page: SeoLanding }) {
  const schema = serviceStructuredData(page);
  return (
    <main>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      )}
      <header className="bg-ink text-white pt-36 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow text-brand-300">{page.eyebrow}</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-display leading-tight">{page.heading}</h1>
          <p className="mt-7 max-w-3xl text-lg text-silver leading-relaxed">{page.intro}</p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link href="/book" className="btn btn-primary">Request a Date</Link>
            <Link href="/charters" className="text-white underline underline-offset-4 self-center">Explore all trips</Link>
          </div>
        </div>
      </header>

      <section className="section max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="border-t border-silver-light pt-4">
            <p className="text-xs uppercase tracking-widest text-brand-700">Fishing area</p>
            <p className="mt-2 font-semibold">{page.location}</p>
          </div>
          <div className="border-t border-silver-light pt-4">
            <p className="text-xs uppercase tracking-widest text-brand-700">Season</p>
            <p className="mt-2 font-semibold">{page.season}</p>
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-display mb-6">Your day on the water</h2>
        <div className="space-y-5 text-charcoal leading-relaxed">
          {page.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
        </div>
      </section>

      <section className="bg-silver-light py-14 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-display mb-5">Trip options</h2>
            <ul className="space-y-4">
              {page.tripOptions.map((item, i) => <li key={i} className="border-b border-silver pb-3">{item}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-display mb-5">What to expect</h2>
            <ul className="space-y-3 list-disc pl-5">
              {page.highlights.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-display mb-8">Good to know</h2>
        <div className="space-y-6">
          {page.faqs.map((faq, i) => (
            <div key={i} className="border-b border-silver-light pb-5">
              <h3 className="font-semibold text-lg">{faq.question}</h3>
              <p className="mt-2 leading-relaxed text-charcoal">{faq.answer}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 p-8 bg-ink text-white">
          <h2 className="text-2xl font-display">Fish hard. Explore north.</h2>
          <p className="mt-3 text-silver">Ask Captain Jack about the right trip and date for your group. Trips are confirmed directly with the captain.</p>
          <div className="mt-6 flex gap-6 flex-wrap">
            <Link href="/book" className="btn btn-primary">Request a Trip</Link>
            <a href="tel:+17346604429" className="self-center underline underline-offset-4">Call 734-660-4429</a>
          </div>
        </div>
      </section>
    </main>
  );
}
