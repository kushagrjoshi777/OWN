'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

function AnimIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} variants={fadeUp} custom={delay} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

const pillars = [
  {
    title: 'Sensory Reward',
    desc: 'The brain\'s reward centres respond powerfully to scent and texture. OWN is engineered to trigger a genuine sensory response — a moment of indulgence your mind wants to repeat.',
    icon: '🌺',
  },
  {
    title: 'Identity Expression',
    desc: 'What we use on our bodies is an extension of who we are. OWN lets consumers choose a scent that matches their energy — not just a product, but a personality.',
    icon: '✨',
  },
  {
    title: 'Ritual & Habit Formation',
    desc: 'Ritualised behaviour creates habit. A product that turns a routine into a ritual builds loyalty — and loyalty builds a brand.',
    icon: '🔁',
  },
];

export default function OurStoryPage() {
  return (
    <div className="bg-creamWhite min-h-screen pt-24">
      {/* Hero */}
      <section className="bg-warmBlack min-h-[50vh] flex flex-col items-center justify-center text-center px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(90deg, #C9A96E 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-warmGold text-xs tracking-[0.3em] uppercase font-sans mb-4 relative z-10">
          Our Story
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-[clamp(3rem,8vw,7rem)] text-creamWhite leading-none tracking-wide relative z-10">
          Made for<br /><span className="text-mainCharacter italic">You</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-creamWhite/50 text-sm font-sans mt-6 max-w-xl tracking-wide relative z-10">
          A brand born from the belief that self-care is an act of self-expression.
        </motion.p>
      </section>

      {/* The Vision */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <AnimIn>
            <div className="bg-mainCharacter/10 h-80 flex items-center justify-center">
              <span className="font-serif font-black text-mainCharacter/20 text-[8rem] leading-none">V</span>
            </div>
          </AnimIn>
          <div>
            <AnimIn>
              <p className="text-mainCharacter text-xs tracking-[0.3em] uppercase font-sans mb-4">The Vision</p>
            </AnimIn>
            <AnimIn delay={0.1}>
              <h2 className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] text-warmBlack mb-6 leading-tight">
                From Hygiene to Ritual
              </h2>
            </AnimIn>
            <AnimIn delay={0.2}>
              <p className="text-warmBlack/70 font-sans leading-relaxed text-sm mb-4">
                Consumers today are moving from basic hygiene to intentional self-care rituals. The modern Indian woman doesn't just want a body wash — she wants an <em>experience</em>.
              </p>
              <p className="text-warmBlack/70 font-sans leading-relaxed text-sm">
                OWN was born to meet that desire. A premium body wash line that treats the shower not as a chore, but as the focal point of a daily self-care ritual.
              </p>
            </AnimIn>
          </div>
        </div>
      </section>

      {/* Gold divider */}
      <div className="gold-divider mx-6" />

      {/* Brand Philosophy */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="md:order-2">
            <AnimIn>
              <div className="bg-afterDark/10 h-80 flex items-center justify-center">
                <span className="font-serif font-black text-afterDark/20 text-[8rem] leading-none">P</span>
              </div>
            </AnimIn>
          </div>
          <div className="md:order-1">
            <AnimIn>
              <p className="text-afterDark text-xs tracking-[0.3em] uppercase font-sans mb-4">Brand Philosophy</p>
            </AnimIn>
            <AnimIn delay={0.1}>
              <h2 className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] text-warmBlack mb-6 leading-tight">
                More Than Hygiene
              </h2>
            </AnimIn>
            <AnimIn delay={0.2}>
              <p className="text-warmBlack/70 font-sans leading-relaxed text-sm mb-4">
                OWN is built on the belief that personal care is more than hygiene. It is a way people express how they feel and who they want to be.
              </p>
              <p className="text-warmBlack/70 font-sans leading-relaxed text-sm">
                Every product in the OWN line is built around a distinct mood and identity — allowing consumers to choose a ritual that matches who they are, or who they want to become today.
              </p>
            </AnimIn>
          </div>
        </div>
      </section>

      {/* Consumer Psychology — 3 pillars */}
      <section className="bg-warmBlack py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimIn>
            <p className="text-warmGold text-xs tracking-[0.3em] uppercase font-sans mb-4 text-center">Consumer Psychology</p>
          </AnimIn>
          <AnimIn delay={0.1}>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-creamWhite text-center mb-4">Why OWN Works</h2>
          </AnimIn>
          <AnimIn delay={0.15}>
            <div className="gold-divider max-w-[100px] mx-auto mb-16" />
          </AnimIn>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <AnimIn key={p.title} delay={i * 0.15}>
                <div className="border border-warmGold/15 p-8 hover:border-warmGold/40 transition-colors duration-300 h-full">
                  <span className="text-3xl mb-4 block">{p.icon}</span>
                  <h3 className="font-serif text-xl text-warmGold mb-4">{p.title}</h3>
                  <p className="font-sans text-creamWhite/50 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </AnimIn>
            ))}
          </div>
        </div>
      </section>

      {/* Long-Term Vision */}
      <section className="bg-mainCharacter py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-serif font-black text-white/5 text-[20vw] leading-none">OWN</span>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <AnimIn>
            <p className="text-white/60 text-xs tracking-[0.3em] uppercase font-sans mb-6">The Long-Term Vision</p>
          </AnimIn>
          <AnimIn delay={0.1}>
            <blockquote className="font-serif italic text-white text-[clamp(1.4rem,3vw,2.2rem)] leading-relaxed">
              "OWN aims to build a ₹1000 crore Indian beauty brand — by making every shower an experience worth looking forward to."
            </blockquote>
          </AnimIn>
          <AnimIn delay={0.3}>
            <p className="text-white/60 font-sans text-sm mt-6 tracking-wide">Made in India 🇮🇳 · For India · For the World</p>
          </AnimIn>
        </div>
      </section>
    </div>
  );
}
