"use client";

import { useState } from "react";

type Image = { id: string; url: string; altText: string; caption: string | null; category: string };

export default function GalleryGrid({ images, categories }: { images: Image[]; categories: string[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory ? images.filter((i) => i.category === activeCategory) : images;

  function close() {
    setLightboxIndex(null);
  }
  function next(delta: number) {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + delta + filtered.length) % filtered.length);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`text-xs uppercase tracking-wide border rounded-full px-4 py-1.5 ${!activeCategory ? "border-brand-500 bg-ice" : "border-silver hover:border-brand-500"}`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`text-xs uppercase tracking-wide border rounded-full px-4 py-1.5 ${activeCategory === c ? "border-brand-500 bg-ice" : "border-silver hover:border-brand-500"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square bg-silver-light rounded flex items-end p-3">
              <span className="text-xs text-charcoal/50">// No photos yet in this category</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {filtered.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setLightboxIndex(i)}
              className="aspect-square rounded overflow-hidden relative group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.altText}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {img.caption && (
                <span className="absolute bottom-2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded">{img.caption}</span>
              )}
            </button>
          ))}
        </div>
      )}

      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-ink/90 flex items-center justify-center p-6"
          onClick={close}
          role="dialog"
          aria-modal="true"
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight") next(1);
            if (e.key === "ArrowLeft") next(-1);
          }}
          tabIndex={-1}
        >
          <button aria-label="Close" onClick={close} className="absolute top-6 right-6 text-white text-2xl">×</button>
          <button aria-label="Previous" onClick={(e) => { e.stopPropagation(); next(-1); }} className="absolute left-6 text-white text-3xl">‹</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={filtered[lightboxIndex].url}
            alt={filtered[lightboxIndex].altText}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button aria-label="Next" onClick={(e) => { e.stopPropagation(); next(1); }} className="absolute right-6 text-white text-3xl">›</button>
        </div>
      )}
    </div>
  );
}
