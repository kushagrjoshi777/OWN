'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const PRODUCTS: Record<string, {
  id: string; step: string; subtitle: string; title: string;
  price: string; desc: string; notes: string; benefits: string[];
  bg: string; textColor: string; accentColor: string;
  bottleBase: string; bottleText: string; glow: string;
}> = {
  purple: {
    id: 'purple', step: '01',
    subtitle: 'BEFORE THE MOMENT',
    title: 'Before The Moment',
    price: '₹899',
    desc: 'Seductive · Elegant · Anticipatory',
    notes: 'Dark Cherry · Plum · Warm Vanilla · Sandalwood',
    benefits: ['Restores Skin Barrier', 'Deep Moisture Complex', 'Squalane Infused'],
    bg: '#160924', textColor: '#D1C4E9', accentColor: '#9C77CE',
    bottleBase: 'linear-gradient(145deg, #D1C4E9 0%, #7E57C2 40%, #311B92 100%)',
    bottleText: '#160924', glow: 'rgba(126,87,194,0.55)',
  },
  pink: {
    id: 'pink', step: '02',
    subtitle: 'MAIN CHARACTER',
    title: 'The Main Character',
    price: '₹899',
    desc: 'Bold · Confident · Spotlight-ready',
    notes: 'Vanilla · Amber · Soft Musk',
    benefits: ['Radiant Glow', 'Ultra-Hydrating', 'Ceramide Complex'],
    bg: '#3D0018', textColor: '#FFB6C1', accentColor: '#FF2A85',
    bottleBase: 'linear-gradient(145deg, #FFB6C1 0%, #FF2A85 40%, #C20054 100%)',
    bottleText: '#3D0018', glow: 'rgba(255,42,133,0.55)',
  },
  blue: {
    id: 'blue', step: '03',
    subtitle: 'AFTER DARK',
    title: 'After Dark',
    price: '₹899',
    desc: 'Sensual · Magnetic · Mysterious',
    notes: 'Sea Salt · Lotus · White Tea',
    benefits: ['Cooling Sensation', 'Pore Refining', 'Hyaluronic Polish'],
    bg: '#00121E', textColor: '#B3E5FC', accentColor: '#29B6F6',
    bottleBase: 'linear-gradient(145deg, #E1F5FE 0%, #29B6F6 40%, #0277BD 100%)',
    bottleText: '#00121E', glow: 'rgba(41,182,246,0.55)',
  },
};

const ANGLES = [
  { label: 'Front', rotateY: 0, rotateX: 2 },
  { label: 'Side', rotateY: -60, rotateX: 5 },
  { label: 'Back', rotateY: -180, rotateX: -2 },
];

function Bottle3D({ base, text, subtitle }: { base: string; text: string; subtitle: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', filter: 'drop-shadow(0 25px 60px rgba(0,0,0,0.6))' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: -14 }}>
        <div style={{ width: 100, height: 50, background: base, borderRadius: 99, position: 'relative', overflow: 'hidden', zIndex: 2, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
          <div style={{ position: 'absolute', top: 6, left: '15%', right: '15%', height: 12, background: 'rgba(255,255,255,0.55)', borderRadius: 99, filter: 'blur(2px)' }} />
        </div>
        <div style={{ width: 120, height: 50, background: base, borderRadius: 99, position: 'relative', overflow: 'hidden', zIndex: 1, marginTop: -14, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
          <div style={{ position: 'absolute', top: 6, left: '15%', right: '15%', height: 12, background: 'rgba(255,255,255,0.55)', borderRadius: 99, filter: 'blur(2px)' }} />
        </div>
      </div>
      <div style={{
        width: 220, height: 290,
        background: base,
        borderRadius: '45% 45% 40% 40% / 30% 30% 60% 60%',
        position: 'relative', overflow: 'hidden',
        boxShadow: 'inset -24px -24px 60px rgba(0,0,0,0.45), inset 20px 0 60px rgba(255,255,255,0.6)',
        border: '1px solid rgba(255,255,255,0.2)',
      }}>
        <div style={{ position: 'absolute', top: 48, bottom: 60, left: 14, width: 20, background: 'rgba(255,255,255,0.5)', borderRadius: 99, filter: 'blur(5px)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 8 }}>
          <span className="font-serif font-black tracking-tighter" style={{ color: text, fontSize: '6.5rem', lineHeight: 0.82, transform: 'scaleY(1.12)', display: 'block' }}>OWN</span>
          <div style={{ width: 56, height: 1, background: text, opacity: 0.35, margin: '14px 0 10px' }} />
          <span className="font-serif italic font-bold tracking-widest text-center px-4" style={{ color: text, fontSize: '0.72rem' }}>{subtitle}</span>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [activeAngle, setActiveAngle] = useState(0);
  const product = PRODUCTS[params.id];

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#1E1B4B] text-white">
        <div className="text-center">
          <h1 className="font-serif italic text-6xl mb-8">Not Found</h1>
          <Link href="/shop" className="text-white/50 hover:text-white tracking-widest uppercase text-xs transition-colors">← Back to Gallery</Link>
        </div>
      </main>
    );
  }

  const glowBg = `radial-gradient(ellipse at center, ${product.glow} 0%, transparent 65%)`;

  return (
    <main className="min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: product.bg }}>

      {/* Ambient radial glow */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: glowBg, opacity: 0.6 }} />

      {/* Back link */}
      <div className="relative z-20 pt-28 px-8 md:px-16">
        <Link href="/shop" className="group inline-flex items-center gap-3 transition-all duration-300 mb-14" style={{ color: `${product.textColor}80` }}>
          <div className="w-7 h-px transition-colors group-hover:w-12" style={{ background: 'currentColor' }} />
          <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase group-hover:opacity-100 transition-opacity" style={{ color: product.textColor }}>Back to Gallery</span>
        </Link>
      </div>

      {/* Main two-column layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 pb-24 flex flex-col lg:flex-row gap-10 lg:gap-24">

        {/* LEFT: Product photo + 3D CSS bottle angle viewer */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">

          {/* Real product photo hero */}
          <div className="relative w-full max-w-sm h-72 md:h-96 rounded-3xl overflow-hidden mb-8 shadow-2xl"
               style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            <Image
              src="/images/own-bottles.jpg"
              alt={product.title}
              fill
              className="object-cover object-center"
              style={{ filter: `hue-rotate(${product.id === 'purple' ? '240deg' : product.id === 'blue' ? '200deg' : '320deg'}) saturate(0.85)` }}
              priority
            />
            {/* Tinted overlay matching the product palette */}
            <div className="absolute inset-0" style={{ background: `${product.bottleBase}30`, mixBlendMode: 'multiply' }} />
          </div>

          {/* 3D Angle Viewer */}
          <div className="w-full max-w-sm">
            <p className="text-center text-[0.6rem] tracking-[0.35em] uppercase mb-5" style={{ color: `${product.textColor}60` }}>
              Rotate Bottle
            </p>
            {/* 3D Display */}
            <div className="relative flex items-center justify-center h-72" style={{ perspective: 1200 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAngle}
                  initial={{ opacity: 0, rotateY: ANGLES[activeAngle].rotateY - 30 }}
                  animate={{ opacity: 1, rotateY: ANGLES[activeAngle].rotateY, rotateX: ANGLES[activeAngle].rotateX }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', damping: 22, stiffness: 120 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Bottle3D base={product.bottleBase} text={product.bottleText} subtitle={product.subtitle} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Angle selector row */}
            <div className="flex justify-center gap-8 mt-6">
              {ANGLES.map((ang, idx) => (
                <button key={ang.label} onClick={() => setActiveAngle(idx)}
                  className="flex flex-col items-center gap-2 outline-none group transition-all">
                  <div className="w-8 h-[2px] rounded-full transition-all duration-300"
                       style={{ background: idx === activeAngle ? product.accentColor : `${product.textColor}30`, transform: idx === activeAngle ? 'scaleX(1.4)' : 'scaleX(1)' }} />
                  <span className="text-[0.58rem] uppercase tracking-widest font-bold transition-colors"
                        style={{ color: idx === activeAngle ? product.textColor : `${product.textColor}40` }}>
                    {ang.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center" style={{ color: product.textColor }}>

          <span className="text-[0.65rem] tracking-[0.5em] uppercase font-bold mb-5 block opacity-50">
            Ritual {product.step}
          </span>

          <h1 className="font-serif italic leading-[0.9] mb-6" style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}>
            {product.title}
          </h1>

          <p className="font-sans tracking-[0.22em] uppercase text-sm mb-10 font-medium opacity-80">
            {product.desc}
          </p>

          <div className="w-20 h-px mb-10 opacity-20" style={{ background: product.textColor }} />

          <div className="flex flex-col gap-8 mb-12">
            <div>
              <h4 className="text-[0.62rem] tracking-widest uppercase font-bold mb-3 opacity-45">Fragrance Notes</h4>
              <p className="font-serif italic text-xl md:text-2xl opacity-90 leading-relaxed">{product.notes}</p>
            </div>
            <div>
              <h4 className="text-[0.62rem] tracking-widest uppercase font-bold mb-3 opacity-45">Key Benefits</h4>
              <ul className="flex flex-col gap-2">
                {product.benefits.map((b) => (
                  <li key={b} className="font-sans font-light text-base opacity-75 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: product.accentColor }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-8" style={{ borderTop: `1px solid ${product.textColor}15` }}>
            <span className="font-sans font-light opacity-90" style={{ fontSize: '3rem', lineHeight: 1 }}>
              {product.price}
            </span>
            <button
              className="px-10 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: product.accentColor,
                color: product.bg,
                boxShadow: `0 10px 40px ${product.glow}`,
              }}
            >
              Add to Bag
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
