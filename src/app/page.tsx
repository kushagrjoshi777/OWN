'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// New Scrollytelling Components
import FlowerBloom from '@/components/FlowerBloom';
import DropperLevitation from '@/components/DropperLevitation';
import BodyWashStatic from '@/components/BodyWashStatic';
import AntigravitySuite from '@/components/AntigravitySuite';
import AboutUs from '@/components/AboutUs';
import Navbar from '@/components/Navbar';

const Ballpit = dynamic(() => import('@/components/Ballpit'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0" style={{ background: '#1E1B4B' }} />,
});
const C = {
  deep:    '#7286D3',   // periwinkle – dark sections, headings
  mid:     '#8EA7E9',   // blue – borders, secondary text
  light:   '#E5E0FF',   // lavender – alternate section bgs
  blush:   '#FFF2F2',   // near-white – main body bg
  ink:     '#1E1B4B',   // deep indigo – body text, dark bgs
  white:   '#FFFFFF',
};

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Product data ─────────────────────────────────────────────────────────────
const products = [
  {
    id: 'the-main-character',
    name: 'The Main Character',
    energy: 'Bold · Confident · Spotlight-ready',
    fragrance: 'Vanilla · Amber · Soft Musk',
    ingredients: ['Hyaluronic Acid', 'Vitamin E', 'Panthenol'],
    cardBg: '#7286D3',
    price: '₹849',
  },
  {
    id: 'after-dark',
    name: 'After Dark',
    energy: 'Sensual · Magnetic · Mysterious',
    fragrance: 'Black Grape · Cherry · Sandalwood',
    ingredients: ['Fruit Extracts', 'Ceramides', 'Vitamin E'],
    cardBg: '#5a6bb8',
    price: '₹849',
  },
  {
    id: 'before-the-moment',
    name: 'Before The Moment',
    energy: 'Seductive · Elegant · Anticipatory',
    fragrance: 'Dark Cherry · Plum · Warm Vanilla · Sandalwood',
    ingredients: ['Rose Extract', 'Squalane', 'Vitamin E'],
    cardBg: '#8EA7E9',
    price: '₹849',
  },
];

const pillars = [
  { icon: '🌸', title: 'Fragrance', desc: 'Signature scent profiles that linger on skin all day long.' },
  { icon: '💧', title: 'Skin Nourishment', desc: 'Hyaluronic Acid, Ceramides, Squalane — because you deserve both.' },
  { icon: '📦', title: 'Visual Design', desc: 'Bold sculptural bottles designed for your shelf and your feed.' },
  { icon: '✨', title: 'Texture', desc: 'Rich, silky gels with luxurious foam that feel premium on skin.' },
];

const testimonials = [
  { quote: 'Finally a body wash that smells like a vibe, not a pharmacy.', name: 'Riya', city: 'Mumbai' },
  { quote: 'After Dark is my evening ritual. The scent lasts for hours.', name: 'Priya', city: 'Bangalore' },
  { quote: 'The packaging alone makes my bathroom look aesthetic.', name: 'Ananya', city: 'Delhi' },
];

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [stage, setStage] = useState<'bubble' | 'popping' | 'open'>('bubble');

  function handleClick() {
    if (stage !== 'bubble') return;
    setStage('popping');
    setTimeout(() => setStage('open'), 700);
  }

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: C.ink }}
    >
      <style>{`
        @keyframes bubbleFloat {
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-14px) scale(1.05); }
        }
        @keyframes bubbleGlow {
          0%,100% { box-shadow: 0 0 50px 15px rgba(114,134,211,0.22), 0 0 100px 35px rgba(142,167,233,0.12); }
          50%      { box-shadow: 0 0 80px 28px rgba(114,134,211,0.42), 0 0 160px 55px rgba(142,167,233,0.24); }
        }
        @keyframes popRing {
          0%   { transform: scale(1);  opacity: 0.8; }
          100% { transform: scale(9);  opacity: 0; }
        }
        @keyframes popShrink {
          0%   { transform: scale(1);    opacity: 1; }
          50%  { transform: scale(1.3);  opacity: 0.6; }
          100% { transform: scale(0.01); opacity: 0; }
        }
      `}</style>

      {/* ── Ballpit ── */}
      <AnimatePresence>
        {stage === 'open' && (
          <motion.div key="ballpit" className="absolute inset-0 z-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <Ballpit
              count={120}
              gravity={0.007}
              friction={0.9975}
              wallBounce={0.95}
              followCursor={true}
              colors={['#7286D3', '#8EA7E9', '#E5E0FF', '#FFF2F2']}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Glassmorphism Bubble ── */}
      <AnimatePresence>
        {stage !== 'open' && (
          <motion.div key="bubble-wrapper"
            className="absolute inset-0 flex items-center justify-center z-20"
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            {/* Expanding ring on pop */}
            {stage === 'popping' && (
              <div style={{
                position: 'absolute', width: 190, height: 190, borderRadius: '50%',
                border: '1.5px solid rgba(142,167,233,0.65)',
                animation: 'popRing 0.7s ease-out forwards', pointerEvents: 'none',
              }} />
            )}

            {/* Bubble */}
            <button
              onClick={handleClick}
              aria-label="Enter the OWN experience"
              style={{
                width: 190, height: 190, borderRadius: '50%',
                border: '1px solid rgba(229,224,255,0.3)',
                cursor: stage === 'bubble' ? 'pointer' : 'default',
                background: [
                  'radial-gradient(circle at 30% 28%,',
                  ' rgba(229,224,255,0.28) 0%,',
                  ' rgba(142,167,233,0.14) 45%,',
                  ' rgba(114,134,211,0.10) 100%)',
                ].join(''),
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.22)',
                animation: stage === 'bubble'
                  ? 'bubbleFloat 4s ease-in-out infinite, bubbleGlow 4s ease-in-out infinite'
                  : 'popShrink 0.7s ease-out forwards',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                outline: 'none', position: 'relative',
              }}
            >
              {/* Specular highlight – top-left */}
              <div style={{
                position: 'absolute', top: '16%', left: '20%',
                width: 60, height: 38, borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)',
                transform: 'rotate(-20deg)', pointerEvents: 'none',
              }} />
              {/* Subtle reflection – bottom-right */}
              <div style={{
                position: 'absolute', bottom: '17%', right: '20%',
                width: 28, height: 16, borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(142,167,233,0.38) 0%, rgba(255,255,255,0) 100%)',
                transform: 'rotate(12deg)', pointerEvents: 'none',
              }} />

              {/* Label */}
              {stage === 'bubble' && (
                <span style={{
                  position: 'absolute', bottom: -38, left: '50%',
                  transform: 'translateX(-50%)', whiteSpace: 'nowrap',
                  fontSize: 10, letterSpacing: '0.28em',
                  color: 'rgba(142,167,233,0.6)',
                  fontFamily: 'Inter, sans-serif', textTransform: 'uppercase',
                  userSelect: 'none',
                }}>
                  touch to begin
                </span>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero Content (post-click) ── */}
      <AnimatePresence>
        {stage === 'open' && (
          <motion.div key="hero-content"
            className="relative z-10 text-center px-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <h1
              className="font-serif font-black leading-none tracking-[0.18em] mb-3"
              style={{
                fontSize: 'clamp(5rem, 15vw, 13rem)',
                color: '#FFF2F2',
                textShadow: '0 2px 50px rgba(114,134,211,0.5)',
              }}
            >
              OWN
            </h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="font-serif italic tracking-wide mb-4"
              style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: 'rgba(229,224,255,0.85)' }}
            >
              Elevating Body Care
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="font-sans tracking-wider max-w-lg mx-auto mb-10 text-sm md:text-base"
              style={{ color: 'rgba(142,167,233,0.7)' }}
            >
              A sensory shower ritual designed for skin, scent, and self-expression.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.7 }}>
              <Link
                href="/shop"
                className="inline-block font-sans text-sm tracking-[0.2em] uppercase px-10 py-4 font-medium transition-all duration-300"
                style={{ border: `1px solid ${C.mid}`, color: C.mid, background: 'transparent' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = C.mid;
                  e.currentTarget.style.color = C.ink;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = C.mid;
                }}
              >
                Discover the Ritual
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scroll Indicator ── */}
      <AnimatePresence>
        {stage === 'open' && (
          <motion.div key="scroll"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
          >
            <span className="text-xs tracking-widest uppercase font-sans" style={{ color: 'rgba(142,167,233,0.45)' }}>Scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-px h-8" style={{ background: 'rgba(114,134,211,0.5)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── HOMEPAGE ─────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />
      {/* Seamless transition gradient from Ink Hero to Cream Scroll sections traversing user's requested colors */}
      <div 
        className="h-[30vh] w-full" 
        style={{ background: 'linear-gradient(to bottom, #1E1B4B 0%, #1a1a4e 30%, #cac4e4 70%, #e5e0ff 100%)' }} 
      />
      <FlowerBloom />
      
      <div className="h-[200px] w-full bg-cream" />
      <DropperLevitation />
      
      <div className="h-[200px] w-full bg-cream" />
      <BodyWashStatic />
      
      <div className="h-[100px] w-full bg-cream" />
      
      {/* Seamless transition gradient bridging the light cream layout explicitly into the dark blue start of The Rituals */}
      <div 
        className="h-[30vh] w-full" 
        style={{ background: 'linear-gradient(to bottom, #e5e0ff 0%, #1a1a4e 100%)' }} 
      />
      <AntigravitySuite />

      {/* Seamless transition gradient bridging out of The Rituals final Blue Section back to the AboutUs Lavender */}
      <div 
        className="h-[30vh] w-full" 
        style={{ background: 'linear-gradient(to bottom, #001B2E 0%, #0D1A63 100%)' }} 
      />
      
      <AboutUs />
    </>
  );
}
