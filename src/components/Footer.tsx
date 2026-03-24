'use client';

import Link from 'next/link';

const C = {
  deep:  '#7286D3',
  mid:   '#8EA7E9',
  light: '#E5E0FF',
  blush: '#FFF2F2',
  ink:   '#1E1B4B',
};

export default function Footer() {
  return (
    <footer style={{ background: C.ink, color: C.blush }}>
      {/* Periwinkle top divider */}
      <div className="gold-divider" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span className="text-3xl font-serif font-bold tracking-[0.2em]" style={{ color: C.mid }}>OWN</span>
            <p className="text-sm font-sans italic tracking-wide" style={{ color: `${C.blush}88` }}>
              "Own the Energy You Step Into"
            </p>
            <p className="text-xs font-sans leading-relaxed mt-2" style={{ color: `${C.blush}55` }}>
              A sensory shower ritual designed for skin, scent, and self-expression.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-sans font-semibold tracking-[0.2em] uppercase" style={{ color: C.mid }}>
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Shop', href: '/shop' },
                { label: 'Our Story', href: '/our-story' },
                { label: 'Ingredients', href: '/ingredients' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-sans animated-underline w-fit transition-colors"
                  style={{ color: `${C.blush}77` }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.light)}
                  onMouseLeave={e => (e.currentTarget.style.color = `${C.blush}77`)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-sans font-semibold tracking-[0.2em] uppercase" style={{ color: C.mid }}>
              Follow Us
            </h4>
            <a
              href="https://instagram.com/ownbodycare"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition-colors group"
              style={{ color: `${C.blush}77` }}
              onMouseEnter={e => (e.currentTarget.style.color = C.light)}
              onMouseLeave={e => (e.currentTarget.style.color = `${C.blush}77`)}
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="text-sm font-sans">@ownbodycare</span>
            </a>
          </div>

        </div>

        {/* Bottom strip */}
        <div className="gold-divider mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs font-sans"
          style={{ color: `${C.blush}40` }}>
          <span>© 2025 OWN Body Care | Made in India 🇮🇳 | D2C</span>
          <span>₹799–₹899 | Free Shipping Above ₹999</span>
        </div>
      </div>
    </footer>
  );
}
