'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

const productData: Record<string, {
  name: string;
  energy: string;
  price: string;
  fragrance: string[];
  benefits: string[];
  ingredients: string[];
  sensoryDesc: string;
  bg: string;
  accentColor: string;
  btnClass: string;
  textColor: string;
}> = {
  'the-main-character': {
    name: 'The Main Character',
    energy: 'Bold · Confident · Spotlight-ready',
    price: '₹849',
    fragrance: ['Vanilla', 'Amber', 'Soft Musk'],
    benefits: [
      'Deeply hydrates and plumps skin',
      'Leaves skin soft & visibly smooth',
      'Signature scent that lingers for hours',
      'Rich, silky foam with luxurious lather',
      'Safe for daily use',
    ],
    ingredients: ['Hyaluronic Acid', 'Vitamin E', 'Panthenol', 'Aloe Vera Extract', 'Glycerin'],
    sensoryDesc:
      'Warm vanilla opens on the skin, settling into a powdery amber base. The lather feels impossibly silky — like cashmere, but edible. This is a scent that demands a second glance.',
    bg: 'bg-mainCharacter',
    accentColor: '#E8538F',
    btnClass: 'bg-mainCharacter text-white hover:bg-mainCharacter/90',
    textColor: 'text-mainCharacter',
  },
  'after-dark': {
    name: 'After Dark',
    energy: 'Sensual · Magnetic · Mysterious',
    price: '₹849',
    fragrance: ['Black Grape', 'Cherry', 'Sandalwood'],
    benefits: [
      'Strengthens and restores skin barrier',
      'Locks in moisture all night long',
      'Rich dark-fruit scent profile',
      'Ceramide complex nourishes deeply',
      'Leaves skin supple and smooth',
    ],
    ingredients: ['Fruit Extracts', 'Ceramides', 'Vitamin E', 'Grape Seed Oil', 'Allantoin'],
    sensoryDesc:
      'Tart black grape and cherry burst on contact, giving way to a deep sandalwood dry-down. The gel transforms to a velvety foam — dense, luxurious, unapologetically indulgent.',
    bg: 'bg-afterDark',
    accentColor: '#4B1248',
    btnClass: 'bg-afterDark text-white hover:bg-afterDark/90',
    textColor: 'text-afterDark',
  },
  'before-the-moment': {
    name: 'Before The Moment',
    energy: 'Seductive · Elegant · Anticipatory',
    price: '₹849',
    fragrance: ['Dark Cherry', 'Plum', 'Warm Vanilla', 'Sandalwood'],
    benefits: [
      'Boosts skin\'s natural moisture barrier',
      'Visibly softens and smooths texture',
      'Rose extract soothes and calms',
      'Squalane locks in hydration',
      'A ritual that prepares you for anything',
    ],
    ingredients: ['Rose Extract', 'Squalane', 'Vitamin E', 'Plum Seed Oil', 'Glycerin'],
    sensoryDesc:
      'Dark cherry and plum unfold slowly, deepened by warm vanilla and a whisper of sandalwood. The formula coats skin in a weightless veil — skin feels like it was made of velvet.',
    bg: 'bg-beforeMoment',
    accentColor: '#2D1B5E',
    btnClass: 'bg-beforeMoment text-white hover:bg-beforeMoment/90',
    textColor: 'text-beforeMoment',
  },
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = productData[params.slug];
  if (!product) notFound();

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (d: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: d } }),
  };

  return (
    <div className="min-h-screen bg-creamWhite pt-20">
      {/* Product hero block */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">
        {/* Left — visual */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`${product.bg} flex items-center justify-center relative overflow-hidden min-h-[50vh] lg:min-h-full`}
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="w-52 h-52 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border border-white/30 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full border border-white/20 flex items-center justify-center">
                  <span className="font-serif font-bold text-white/60 text-xs tracking-widest uppercase text-center px-4 leading-relaxed">
                    {product.name}
                  </span>
                </div>
              </div>
            </div>
            <p className="font-serif italic text-white/60 text-sm tracking-wide text-center px-8">
              250ml · Body Wash
            </p>
          </div>

          {/* Decorative corner */}
          <div className="absolute top-8 left-8 text-white/10 font-serif font-black text-8xl leading-none pointer-events-none">
            OWN
          </div>
        </motion.div>

        {/* Right — details */}
        <div className="flex flex-col justify-center px-8 py-16 lg:px-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-lg"
          >
            <motion.p variants={fadeUp} custom={0} className="text-xs tracking-[0.3em] uppercase font-sans text-warmBlack/40 mb-3">
              OWN Body Care
            </motion.p>

            <motion.h1 variants={fadeUp} custom={0.1} className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-warmBlack leading-tight mb-2">
              {product.name}
            </motion.h1>

            <motion.p variants={fadeUp} custom={0.2} className={`font-serif italic ${product.textColor} text-lg mb-6`}>
              {product.energy}
            </motion.p>

            <motion.p variants={fadeUp} custom={0.3} className="font-serif text-3xl font-bold text-warmBlack mb-8">
              {product.price}
            </motion.p>

            {/* Fragrance */}
            <motion.div variants={fadeUp} custom={0.35} className="mb-8">
              <h3 className="text-xs tracking-[0.2em] uppercase font-sans text-warmBlack/40 mb-3 font-semibold">🌺 Fragrance Profile</h3>
              <div className="flex flex-wrap gap-2">
                {product.fragrance.map((f) => (
                  <span key={f} className={`font-serif italic ${product.textColor} border border-current/20 px-3 py-1 text-sm rounded-full`}>
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div variants={fadeUp} custom={0.4} className="mb-8">
              <h3 className="text-xs tracking-[0.2em] uppercase font-sans text-warmBlack/40 mb-3 font-semibold">Skin Benefits</h3>
              <ul className="flex flex-col gap-2">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm font-sans text-warmBlack/70">
                    <span className={`${product.textColor} mt-0.5 font-bold`}>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Ingredients */}
            <motion.div variants={fadeUp} custom={0.45} className="mb-8">
              <h3 className="text-xs tracking-[0.2em] uppercase font-sans text-warmBlack/40 mb-3 font-semibold">Hero Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span key={ing} className="font-sans text-xs text-warmBlack border border-warmBlack/20 px-3 py-1.5 rounded-full">
                    {ing}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Sensory experience */}
            <motion.div variants={fadeUp} custom={0.5} className="bg-warmBlack/5 p-6 mb-8">
              <h3 className="text-xs tracking-[0.2em] uppercase font-sans text-warmBlack/40 mb-3 font-semibold">What It Feels Like</h3>
              <p className="font-serif italic text-warmBlack/70 text-sm leading-relaxed">{product.sensoryDesc}</p>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} custom={0.55} className="flex gap-4">
              <button
                className={`${product.btnClass} font-sans font-semibold text-sm tracking-[0.15em] uppercase px-10 py-4 transition-all duration-200 flex-1`}
              >
                Add to Bag 🛍️
              </button>
            </motion.div>

            <motion.p variants={fadeUp} custom={0.6} className="text-warmBlack/30 text-xs font-sans mt-4 text-center">
              Free shipping on orders above ₹999 · Made in India 🇮🇳
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <Link href="/shop" className="font-sans text-sm text-warmBlack/50 hover:text-warmBlack transition-colors tracking-wide flex items-center gap-2">
          ← Back to The Rituals
        </Link>
      </div>
    </div>
  );
}
