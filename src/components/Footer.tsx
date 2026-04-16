'use client';

import Link from 'next/link';

const NAV_BG = '#1E1B4B'; // same as Navbar
const TEXT_COLOR = '#F0EBD8'; // egg white
const TEXT_DIM = 'rgba(240,235,216,0.4)';
const TEXT_MID = 'rgba(240,235,216,0.65)';
const BORDER = 'rgba(240,235,216,0.12)';

export default function Footer() {
  return (
    <footer
      className="w-full py-20 px-8 md:px-16 flex flex-col font-sans relative z-50"
      style={{ backgroundColor: NAV_BG, color: TEXT_COLOR }}
    >
      {/* Top Half: Logo + Email Left, 4 Columns Right */}
      <div className="flex flex-col xl:flex-row justify-between w-full max-w-[1400px] mx-auto gap-16 xl:gap-0">

        {/* Left: Logo & Subscribe */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 xl:gap-12 w-full xl:w-auto">
          <img
            src="/images/e9eebf0d-a61d-42be-a363-88106e03158d.jpeg"
            alt="OWN Logo Monogram"
            className="w-20 h-20 object-contain"
            style={{ filter: 'invert(1) brightness(1.8) sepia(0.1)' }}
          />
          <div
            className="flex items-center rounded-full overflow-hidden w-full max-w-[320px] h-11"
            style={{ border: `1px solid ${BORDER}`, background: 'rgba(255,255,255,0.05)' }}
          >
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none px-5 w-full text-sm"
              style={{ color: TEXT_COLOR, caretColor: TEXT_COLOR }}
            />
            <button
              className="text-xs px-6 h-full font-medium uppercase tracking-[0.15em] transition-colors"
              style={{ background: 'rgba(255,255,255,0.1)', color: TEXT_COLOR }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Right: Link Grids */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 xl:gap-24 text-[0.65rem] tracking-[0.2em] uppercase font-medium" style={{ color: TEXT_MID }}>
          <div className="flex flex-col gap-4">
            <h5 className="mb-2 tracking-widest" style={{ color: TEXT_DIM }}>Collections</h5>
            <a href="#" className="transition-colors hover:opacity-100 opacity-70">Body Washes</a>
            <a href="#" className="transition-colors hover:opacity-100 opacity-70">Lotions</a>
            <a href="#" className="transition-colors hover:opacity-100 opacity-70">Gifts</a>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="mb-2 tracking-widest" style={{ color: TEXT_DIM }}>Brand</h5>
            <a href="#" className="transition-colors hover:opacity-100 opacity-70">Philosophy</a>
            <a href="#" className="transition-colors hover:opacity-100 opacity-70">Ingredients</a>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="mb-2 tracking-widest" style={{ color: TEXT_DIM }}>Policies</h5>
            <a href="#" className="transition-colors hover:opacity-100 opacity-70">Shipping</a>
            <a href="#" className="transition-colors hover:opacity-100 opacity-70">Returns</a>
            <a href="#" className="transition-colors hover:opacity-100 opacity-70">Terms</a>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="mb-2 tracking-widest" style={{ color: TEXT_DIM }}>Connect</h5>
            <a href="#" className="transition-colors hover:opacity-100 opacity-70">Instagram</a>
            <a href="#" className="transition-colors hover:opacity-100 opacity-70 lowercase tracking-widest">hello@own.com</a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full max-w-[1400px] mx-auto mt-16" style={{ height: 1, background: BORDER }} />

      {/* Bottom: Massive OWN Wordmark */}
      <div className="w-full max-w-[1400px] mx-auto mt-12 flex flex-col items-center">
        <h1
          className="font-serif italic leading-[0.7] mb-6 tracking-tighter w-full text-center"
          style={{ fontSize: 'clamp(14vw, 18vw, 20vw)', color: TEXT_COLOR, opacity: 0.08 }}
        >
          OWN
        </h1>

        <div
          className="text-[0.6rem] uppercase tracking-[0.2em] mt-4 text-center flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-center"
          style={{ color: TEXT_DIM }}
        >
          <span>© 2026 OWN Beauty</span>
          <span className="hidden md:inline">•</span>
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}
