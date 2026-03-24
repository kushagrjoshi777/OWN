'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const products = [
  {
    id: 'the-main-character',
    name: 'The Main Character',
    energy: 'Bold · Confident · Spotlight-ready',
    fragrance: 'Vanilla · Amber · Soft Musk',
    price: '₹849',
    bg: 'bg-mainCharacter',
    btnBg: 'bg-warmBlack text-white hover:bg-warmBlack/80',
  },
  {
    id: 'after-dark',
    name: 'After Dark',
    energy: 'Sensual · Magnetic · Mysterious',
    fragrance: 'Black Grape · Cherry · Sandalwood',
    price: '₹849',
    bg: 'bg-afterDark',
    btnBg: 'bg-white text-afterDark hover:bg-creamWhite',
  },
  {
    id: 'before-the-moment',
    name: 'Before The Moment',
    energy: 'Seductive · Elegant · Anticipatory',
    fragrance: 'Dark Cherry · Plum · Warm Vanilla · Sandalwood',
    price: '₹849',
    bg: 'bg-beforeMoment',
    btnBg: 'bg-warmGold text-warmBlack hover:bg-warmGold/80',
  },
];

export default function ShopPage() {
  return (
    <div className="bg-creamWhite min-h-screen pt-28 pb-24">
      {/* Header */}
      <div className="text-center px-6 mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-mainCharacter text-xs tracking-[0.3em] uppercase font-sans mb-3"
        >
          The Collection
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-serif text-[clamp(2.5rem,6vw,5rem)] text-warmBlack tracking-wide"
        >
          The Rituals
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.3 }}
          className="h-px bg-warmGold max-w-[120px] mx-auto mt-6"
        />
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 + 0.3 }}
            className={`${product.bg} group overflow-hidden product-card-shadow`}
          >
            {/* Product visual */}
            <div className="h-72 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10" />
              <div className="w-36 h-36 rounded-full border border-white/20 flex items-center justify-center z-10">
                <div className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center">
                  <span className="font-serif font-bold text-white/60 text-[10px] tracking-widest uppercase text-center px-2">
                    {product.name}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 flex flex-col gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-white mb-1">{product.name}</h2>
                <p className="font-serif italic text-white/70 text-sm">{product.energy}</p>
              </div>
              <p className="text-white/60 text-xs font-sans">{product.fragrance}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-serif text-xl font-bold text-white">{product.price}</span>
                <Link
                  href={`/shop/${product.id}`}
                  className={`${product.btnBg} font-sans text-xs font-semibold tracking-[0.15em] uppercase px-6 py-3 transition-all duration-200`}
                >
                  View Ritual
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
