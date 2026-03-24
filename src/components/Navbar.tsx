'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const C = {
  deep:  '#7286D3',
  mid:   '#8EA7E9',
  light: '#E5E0FF',
  blush: '#FFF2F2',
  ink:   '#1E1B4B',
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Our Story', href: '/our-story' },
    { label: 'Ingredients', href: '/ingredients' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={
          scrolled
            ? {
                background: `rgba(30,27,75,0.85)`,
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                borderBottom: `1px solid ${C.deep}55`,
              }
            : { background: 'transparent' }
        }
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-serif font-bold tracking-[0.15em] transition-opacity hover:opacity-80"
            style={{ color: C.mid }}
          >
            OWN
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-sans font-medium tracking-widest uppercase transition-colors duration-200 animated-underline"
                style={{ color: 'rgba(255,242,242,0.75)' }}
                onMouseEnter={e => (e.currentTarget.style.color = C.light)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,242,242,0.75)')}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart + Mobile toggle */}
          <div className="flex items-center gap-4">
            <button
              className="text-xl transition-colors"
              style={{ color: 'rgba(255,242,242,0.85)' }}
              aria-label="Cart"
              onMouseEnter={e => (e.currentTarget.style.color = C.light)}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,242,242,0.85)')}
            >
              🛍️
            </button>
            <button
              className="md:hidden transition-colors"
              style={{ color: 'rgba(255,242,242,0.85)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 flex flex-col items-center justify-center md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: C.ink }}
      >
        <div className="flex flex-col items-center gap-8">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-3xl font-serif font-medium transition-colors duration-200"
              style={{ color: C.blush, animationDelay: `${i * 0.1}s` }}
              onMouseEnter={e => (e.currentTarget.style.color = C.light)}
              onMouseLeave={e => (e.currentTarget.style.color = C.blush)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-8 text-xs tracking-widest uppercase font-sans" style={{ color: `${C.mid}88` }}>
            @ownbodycare
          </div>
        </div>
      </div>
    </>
  );
}
