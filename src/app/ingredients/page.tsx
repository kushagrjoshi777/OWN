'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ingredients = [
  {
    name: 'Hyaluronic Acid',
    source: 'Biotechnology',
    benefit: 'Binds up to 1000x its weight in water — deep hydration that plumps and firms skin.',
    color: 'text-mainCharacter',
    borderColor: 'border-mainCharacter/20',
  },
  {
    name: 'Ceramides',
    source: 'Plant-derived',
    benefit: 'Restores the skin barrier. Prevents moisture loss and improves resilience.',
    color: 'text-afterDark',
    borderColor: 'border-afterDark/20',
  },
  {
    name: 'Squalane',
    source: 'Sugarcane (plant-derived)',
    benefit: 'Lightweight emollient that mimics skin\'s natural oils. Locks in moisture without grease.',
    color: 'text-beforeMoment',
    borderColor: 'border-beforeMoment/20',
  },
  {
    name: 'Vitamin E',
    source: 'Tocopherol — plant oils',
    benefit: 'Antioxidant that protects skin from oxidative stress and supports a healthy barrier.',
    color: 'text-warmGold',
    borderColor: 'border-warmGold/30',
  },
  {
    name: 'Panthenol',
    source: 'Provitamin B5',
    benefit: 'Attracts and retains moisture. Reduces redness and leaves skin silky smooth.',
    color: 'text-mainCharacter',
    borderColor: 'border-mainCharacter/20',
  },
  {
    name: 'Rose Extract',
    source: 'Rosa damascena — Bulgaria',
    benefit: 'Soothing and mildly anti-inflammatory. Leaves skin calm, soft, and subtly scented.',
    color: 'text-afterDark',
    borderColor: 'border-afterDark/20',
  },
  {
    name: 'Fruit Extracts',
    source: 'Black Grape, Cherry, Plum',
    benefit: 'Rich in antioxidants and natural AHAs. Brightens skin tone and supports cell renewal.',
    color: 'text-beforeMoment',
    borderColor: 'border-beforeMoment/20',
  },
];

function AnimIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function IngredientsPage() {
  return (
    <div className="bg-creamWhite min-h-screen pt-24">
      {/* Hero */}
      <section className="bg-warmBlack py-24 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(90deg, #C9A96E 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-warmGold text-xs tracking-[0.3em] uppercase font-sans mb-4 relative z-10">
          Formulation
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-[clamp(2.5rem,7vw,6rem)] text-creamWhite relative z-10 leading-tight">
          What Goes Into<br />
          <span className="text-mainCharacter italic">Your Ritual</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-creamWhite/50 font-sans text-sm max-w-xl mx-auto mt-6 leading-relaxed relative z-10">
          Every ingredient is chosen to make your skin feel as good as the scent makes you feel.
        </motion.p>
      </section>

      {/* Ingredient grid */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimIn>
            <p className="text-warmBlack/40 text-xs tracking-[0.3em] uppercase font-sans mb-12 text-center">
              Active Ingredients · Transparently Listed
            </p>
          </AnimIn>

          {/* Header row */}
          <div className="hidden md:grid grid-cols-3 gap-4 mb-4 px-6">
            {['Ingredient', 'Source', 'Skin Benefit'].map((h) => (
              <span key={h} className="text-xs tracking-[0.2em] uppercase font-sans text-warmBlack/30 font-semibold">
                {h}
              </span>
            ))}
          </div>
          <div className="h-px bg-warmBlack/10 mb-2" />

          <div className="flex flex-col">
            {ingredients.map((ing, i) => (
              <AnimIn key={ing.name} delay={i * 0.08}>
                <div className={`grid md:grid-cols-3 gap-4 px-6 py-6 border-b border-warmBlack/8 hover:bg-warmBlack/[0.02] transition-colors group`}>
                  <div>
                    <h3 className={`font-serif font-semibold text-lg ${ing.color}`}>{ing.name}</h3>
                    <span className="md:hidden text-warmBlack/40 text-xs font-sans">{ing.source}</span>
                  </div>
                  <div className="hidden md:block">
                    <span className={`font-sans text-sm text-warmBlack/50 border ${ing.borderColor} px-3 py-1 rounded-full`}>
                      {ing.source}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-warmBlack/60 leading-relaxed">{ing.benefit}</p>
                </div>
              </AnimIn>
            ))}
          </div>

          {/* Philosophy note */}
          <AnimIn delay={0.3}>
            <div className="mt-16 bg-mainCharacter/5 border-l-4 border-mainCharacter p-8">
              <p className="font-serif italic text-warmBlack/70 text-lg leading-relaxed">
                "Every ingredient is chosen to make your skin feel as good as the scent makes you feel."
              </p>
              <p className="font-sans text-xs text-warmBlack/40 mt-4 tracking-widest uppercase">— The OWN Formulation Philosophy</p>
            </div>
          </AnimIn>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24 px-6 text-center">
        <AnimIn>
          <p className="font-serif italic text-warmBlack/50 text-lg mb-8">
            Ready to experience these ingredients on your skin?
          </p>
          <a
            href="/shop"
            className="inline-block bg-warmBlack text-creamWhite font-sans text-sm tracking-[0.2em] uppercase px-10 py-4 hover:bg-warmBlack/80 transition-colors duration-200 font-medium"
          >
            Shop The Rituals
          </a>
        </AnimIn>
      </section>
    </div>
  );
}
