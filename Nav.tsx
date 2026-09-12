"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { NAV_LINKS, BUSINESS } from "@/lib/constants";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className={`font-display text-lg font-semibold uppercase tracking-wide ${
              scrolled ? "text-brand-900" : "text-white"
            }`}
          >
            Northern Pursuit
            <span className="block text-[10px] tracking-[0.2em] font-body font-normal text-brand-500">
              Sport Fishing
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.filter((l) => l.href !== "/book").map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium tracking-wide ${
                  scrolled ? "text-charcoal hover:text-brand-700" : "text-white/90 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/book" className="btn btn-primary">
              Book Your Trip
            </Link>
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={`block w-6 h-0.5 ${scrolled ? "bg-charcoal" : "bg-white"}`} />
            <span className={`block w-6 h-0.5 ${scrolled ? "bg-charcoal" : "bg-white"}`} />
            <span className={`block w-6 h-0.5 ${scrolled ? "bg-charcoal" : "bg-white"}`} />
          </button>
        </nav>
      </header>

      {/* Mobile slide-out menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-ink/50" onClick={() => setOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white p-6 transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button aria-label="Close menu" onClick={() => setOpen(false)} className="mb-6 text-2xl">
            ×
          </button>
          <div className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 border-b border-silver-light text-charcoal font-medium"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky mobile action bar — book / call / text */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white border-t border-silver-light flex">
        <Link href="/book" className="flex-1 text-center py-3 bg-brand-500 text-white text-sm font-semibold">
          Book
        </Link>
        <a href={BUSINESS.phoneHref} className="flex-1 text-center py-3 text-sm font-semibold border-l border-silver-light">
          Call
        </a>
        <a href={`sms:${BUSINESS.phoneHref.replace("tel:", "")}`} className="flex-1 text-center py-3 text-sm font-semibold border-l border-silver-light">
          Text
        </a>
      </div>
    </>
  );
}
