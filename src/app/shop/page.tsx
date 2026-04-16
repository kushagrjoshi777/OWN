'use client';

import { useLayoutEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

/* ─────────────────────── PRODUCT DATA ─────────────────────── */
const PRODUCTS = [
  {
    id: 'purple', step: '01',
    subtitle: 'BEFORE THE MOMENT', title: 'Before The Moment',
    desc: 'Seductive · Elegant · Anticipatory',
    notes: 'Dark Cherry · Plum · Warm Vanilla · Sandalwood',
    price: '₹899',
    benefits: ['Restores Skin Barrier', 'Deep Moisture Complex', 'Squalane Infused'],
    bottleBase: 'linear-gradient(145deg, #D1C4E9 0%, #7E57C2 40%, #311B92 100%)',
    bottleText: '#1A004F',
    glow: 'rgba(126,87,194,0.55)',
    accent: '#9C77CE',
    orbColor1: 'rgba(126,87,194,0.35)',
    orbColor2: 'rgba(49,27,146,0.25)',
  },
  {
    id: 'pink', step: '02',
    subtitle: 'MAIN CHARACTER', title: 'The Main Character',
    desc: 'Bold · Confident · Spotlight-ready',
    notes: 'Vanilla · Amber · Soft Musk',
    price: '₹899',
    benefits: ['Radiant Glow', 'Ultra-Hydrating', 'Ceramide Complex'],
    bottleBase: 'linear-gradient(145deg, #FFB6C1 0%, #FF2A85 40%, #C20054 100%)',
    bottleText: '#590026',
    glow: 'rgba(255,42,133,0.55)',
    accent: '#FF2A85',
    orbColor1: 'rgba(255,42,133,0.35)',
    orbColor2: 'rgba(194,0,84,0.25)',
  },
  {
    id: 'blue', step: '03',
    subtitle: 'AFTER DARK', title: 'After Dark',
    desc: 'Sensual · Magnetic · Mysterious',
    notes: 'Sea Salt · Lotus · White Tea',
    price: '₹899',
    benefits: ['Cooling Sensation', 'Pore Refining', 'Hyaluronic Polish'],
    bottleBase: 'linear-gradient(145deg, #E1F5FE 0%, #29B6F6 40%, #0277BD 100%)',
    bottleText: '#003359',
    glow: 'rgba(41,182,246,0.55)',
    accent: '#29B6F6',
    orbColor1: 'rgba(41,182,246,0.35)',
    orbColor2: 'rgba(2,119,189,0.25)',
  },
];

/* ─────────────────────── BOTTLE (larger) ─────────────────────── */
function Bottle({ base, text, subtitle }: { base: string; text: string; subtitle: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', filter: 'drop-shadow(0 30px 100px rgba(0,0,0,0.8))' }}>
      {/* Cap */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: -20 }}>
        <div style={{ width: 130, height: 65, background: base, borderRadius: 99, position: 'relative', overflow: 'hidden', zIndex: 2, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
          <div style={{ position: 'absolute', top: 7, left: '15%', right: '15%', height: 14, background: 'rgba(255,255,255,0.5)', borderRadius: 99, filter: 'blur(3px)' }} />
        </div>
        <div style={{ width: 155, height: 65, background: base, borderRadius: 99, position: 'relative', overflow: 'hidden', zIndex: 1, marginTop: -18, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
          <div style={{ position: 'absolute', top: 7, left: '15%', right: '15%', height: 14, background: 'rgba(255,255,255,0.5)', borderRadius: 99, filter: 'blur(3px)' }} />
        </div>
      </div>
      {/* Body */}
      <div style={{
        width: 290, height: 380,
        background: base,
        borderRadius: '45% 45% 40% 40% / 30% 30% 60% 60%',
        position: 'relative', overflow: 'hidden',
        boxShadow: 'inset -28px -28px 70px rgba(0,0,0,0.45), inset 24px 0 70px rgba(255,255,255,0.55)',
        border: '1px solid rgba(255,255,255,0.18)',
      }}>
        <div style={{ position: 'absolute', top: 55, bottom: 70, left: 16, width: 26, background: 'rgba(255,255,255,0.45)', borderRadius: 99, filter: 'blur(7px)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
          <span className="font-serif font-black tracking-tighter" style={{ color: text, fontSize: '8.5rem', lineHeight: 0.82, transform: 'scaleY(1.12)', display: 'block' }}>OWN</span>
          <div style={{ width: 64, height: 1, background: text, opacity: 0.35, margin: '16px 0 12px' }} />
          <span className="font-serif italic font-bold tracking-widest text-center px-5" style={{ color: text, fontSize: '0.78rem' }}>{subtitle}</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── LIQUID BACKGROUND ─────────────────────── */
function LiquidBackground({ color1, color2 }: { color1: string; color2: string }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Large flowing orb 1 */}
      <div
        style={{
          position: 'absolute', width: '55vw', height: '55vw', borderRadius: '40% 60% 55% 45% / 55% 40% 60% 45%',
          background: `radial-gradient(circle, ${color1} 0%, transparent 70%)`,
          top: '10%', left: '15%', filter: 'blur(80px)',
          animation: 'liquidFlow1 14s ease-in-out infinite',
          transition: 'background 1.8s ease',
        }}
      />
      {/* Large flowing orb 2 */}
      <div
        style={{
          position: 'absolute', width: '45vw', height: '45vw', borderRadius: '55% 45% 40% 60% / 45% 55% 45% 55%',
          background: `radial-gradient(circle, ${color2} 0%, transparent 70%)`,
          bottom: '5%', right: '10%', filter: 'blur(70px)',
          animation: 'liquidFlow2 18s ease-in-out infinite',
          transition: 'background 1.8s ease',
        }}
      />
      {/* Small accent blob */}
      <div
        style={{
          position: 'absolute', width: '25vw', height: '25vw', borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%',
          background: `radial-gradient(circle, ${color1} 0%, transparent 70%)`,
          top: '55%', left: '3%', filter: 'blur(55px)', opacity: 0.6,
          animation: 'liquidFlow3 11s ease-in-out infinite',
          transition: 'background 1.8s ease',
        }}
      />
      {/* Extra top-right blob */}
      <div
        style={{
          position: 'absolute', width: '30vw', height: '30vw', borderRadius: '45% 55% 60% 40% / 60% 45% 55% 45%',
          background: `radial-gradient(circle, ${color2} 0%, transparent 70%)`,
          top: '-5%', right: '20%', filter: 'blur(65px)', opacity: 0.4,
          animation: 'liquidFlow1 16s ease-in-out infinite 3s',
          transition: 'background 1.8s ease',
        }}
      />
      {/* Floating particles */}
      {Array.from({ length: 25 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          animate={{ opacity: [0.03, 0.2, 0.03], y: [0, -15, 0] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: (i * 0.5) % 6, ease: 'easeInOut' }}
          style={{ width: 1 + (i % 3), height: 1 + (i % 3), left: `${(i * 29.7) % 100}%`, top: `${(i * 41.3) % 100}%` }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────── MATERIALIZING TEXT ─────────────────────── */
function MaterializingText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll('.mat-char');
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(chars,
        {
          opacity: 0,
          filter: 'blur(18px)',
          y: 30,
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: {
            each: 0.04,
            from: 'center',
          },
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 1.2,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Split into words, then characters within words (preserving spaces)
  const words = text.split(' ');

  return (
    <div ref={containerRef} className={className} style={{ ...style, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.3em' }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, ci) => (
            <span
              key={`${wi}-${ci}`}
              className="mat-char"
              style={{ display: 'inline-block', opacity: 0, filter: 'blur(18px)' }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

/* ─────────────────────── PROGRESS BARS ─────────────────────── */
function ProgressBars({ activeIndex, segmentProgress, accent, glow }: {
  activeIndex: number; segmentProgress: number; accent: string; glow: string;
}) {
  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
      <div className="flex items-center gap-2.5">
        {PRODUCTS.map((p, i) => {
          let fill = 0;
          if (i < activeIndex) fill = 1;
          else if (i === activeIndex) fill = segmentProgress;
          else fill = 0;

          return (
            <div
              key={p.id}
              className="relative overflow-hidden rounded-full"
              style={{
                width: 48,
                height: 3,
                background: 'rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${fill * 100}%`,
                  background: accent,
                  boxShadow: fill > 0 ? `0 0 8px ${glow}` : 'none',
                  transition: i === activeIndex ? 'none' : 'width 0.4s ease',
                }}
              />
            </div>
          );
        })}
      </div>
      <span className="font-sans text-[0.5rem] tracking-[0.4em] uppercase text-white/20">
        {String(activeIndex + 1).padStart(2, '0')} / {String(PRODUCTS.length).padStart(2, '0')}
      </span>
    </div>
  );
}

/* ─────────────────────── MAIN PAGE ─────────────────────── */
export default function ShopPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [segmentProgress, setSegmentProgress] = useState(0);

  const product = PRODUCTS[activeIndex];

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !pinnedRef.current || !introRef.current) return;

    const ctx = gsap.context(() => {
      /* ── Fade out intro when approaching pinned section ── */
      gsap.to(introRef.current, {
        opacity: 0, y: -80, filter: 'blur(12px)',
        scrollTrigger: {
          trigger: pinnedRef.current,
          start: 'top 95%',
          end: 'top 40%',
          scrub: 1,
        },
      });

      /* ── PINNED PRODUCT SHOWCASE ── */
      const totalProducts = PRODUCTS.length;

      ScrollTrigger.create({
        trigger: pinnedRef.current,
        start: 'top top',
        end: `+=${totalProducts * 120}%`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const rawIdx = progress * totalProducts;
          const idx = Math.min(Math.floor(rawIdx), totalProducts - 1);
          const seg = rawIdx - idx;

          setActiveIndex(idx);
          setSegmentProgress(Math.min(seg, 1));
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="shop-grain" style={{ backgroundColor: '#0A0A0F' }}>

      {/* ═══════════ LIQUID BACKGROUND (always visible, flowing) ═══════════ */}
      <LiquidBackground color1={product.orbColor1} color2={product.orbColor2} />

      {/* ═══════════ INTRO SECTION ═══════════ */}
      <div ref={introRef} className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8">
        {/* Materializing title — characters appear out of thin air */}
        <MaterializingText
          text="The Rituals"
          className="font-serif italic text-white/90 tracking-tighter leading-none"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
        />

        {/* Subtitle — fades in after title */}
        <div className="intro-sub flex flex-col items-center gap-6 mt-10">
          <MaterializingText
            text="Scroll to explore"
            className="font-sans text-white/35 text-xs md:text-sm tracking-[0.4em] uppercase"
          />
          {/* Pulsing scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/30 to-white/5" />
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" className="opacity-40">
              <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* ═══════════ PINNED PRODUCT SHOWCASE ═══════════ */}
      <div ref={pinnedRef} className="relative z-10 w-full h-screen flex items-center justify-center overflow-hidden">

        {/* ── Content wrapper ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

          {/* LEFT: Product bottle — floaty + larger */}
          <div className="w-full lg:w-[55%] flex items-center justify-center relative" style={{ minHeight: 520 }}>
            {/* Radial glow behind bottle */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`glow-${product.id}`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 0.5, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute rounded-full"
                style={{
                  width: '70%', height: '70%',
                  background: `radial-gradient(circle, ${product.glow} 0%, transparent 70%)`,
                  filter: 'blur(70px)',
                }}
              />
            </AnimatePresence>

            {/* Floating bottle */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`bottle-${product.id}`}
                initial={{ opacity: 0, x: 150, scale: 0.75, rotate: -5 }}
                animate={{
                  opacity: 1, x: 0, scale: 1, rotate: 0,
                  y: [0, -12, 0],
                }}
                exit={{ opacity: 0, x: -150, scale: 0.7, rotate: 5 }}
                transition={{
                  opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  x: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                  scale: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                  rotate: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                  y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="relative z-10"
              >
                <Bottle base={product.bottleBase} text={product.bottleText} subtitle={product.subtitle} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Product info */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${product.id}`}
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                {/* Step */}
                <span className="font-sans text-[0.6rem] tracking-[0.5em] uppercase font-bold mb-5 block" style={{ color: `${product.accent}80` }}>
                  Ritual {product.step}
                </span>

                {/* Title */}
                <h2
                  className="font-serif italic text-white/95 leading-[0.9] mb-5"
                  style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}
                >
                  {product.title}
                </h2>

                {/* Tagline */}
                <p className="font-sans tracking-[0.2em] uppercase text-sm mb-8 font-medium" style={{ color: `${product.accent}CC` }}>
                  {product.desc}
                </p>

                {/* Divider */}
                <div className="w-16 h-px mb-8" style={{ background: `${product.accent}40` }} />

                {/* Fragrance notes */}
                <div className="mb-8">
                  <h4 className="text-[0.6rem] tracking-widest uppercase font-bold mb-3 text-white/30">Fragrance Notes</h4>
                  <p className="font-serif italic text-lg md:text-xl text-white/75 leading-relaxed">{product.notes}</p>
                </div>

                {/* Benefits */}
                <div className="mb-10">
                  <h4 className="text-[0.6rem] tracking-widest uppercase font-bold mb-3 text-white/30">Key Benefits</h4>
                  <ul className="flex flex-col gap-2">
                    {product.benefits.map((b) => (
                      <li key={b} className="font-sans font-light text-sm text-white/55 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: product.accent }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center gap-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="font-sans font-light text-white/80" style={{ fontSize: '2.5rem', lineHeight: 1 }}>
                    {product.price}
                  </span>
                  <Link
                    href={`/shop/${product.id}`}
                    className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-[0.65rem] font-bold uppercase tracking-[0.25em] transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      background: product.accent,
                      color: '#0A0A0F',
                      boxShadow: `0 8px 32px ${product.glow}`,
                    }}
                  >
                    <span>Shop Now</span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                      className="inline-block"
                    >→</motion.span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Bottom: Scroll progress bars ── */}
        <ProgressBars
          activeIndex={activeIndex}
          segmentProgress={segmentProgress}
          accent={product.accent}
          glow={product.glow}
        />
      </div>

    </div>
  );
}
