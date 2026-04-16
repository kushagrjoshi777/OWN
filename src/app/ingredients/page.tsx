'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INGREDIENTS = [
  {
    id: 'cherry',
    name: 'Dark Cherry',
    profile: 'Before the Moment',
    description: 'A seductive, juicy top note that cascades into warmth. Hand-harvested for an intoxicatingly primal sweetness.',
    color: '#311B92',
    bgLight: '#D1C4E9'
  },
  {
    id: 'lotus',
    name: 'Water Lotus',
    profile: 'After Dark',
    description: 'Crisp, aquatic, and deeply calming. Extracted at dawn to capture the pure essence of quiet midnight waters.',
    color: '#0277BD',
    bgLight: '#E1F5FE'
  },
  {
    id: 'amber',
    name: 'Liquid Amber',
    profile: 'The Main Character',
    description: 'A golden resinous core that demands the room. It lingers on the skin, leaving an unapologetic trail of confidence.',
    color: '#C20054',
    bgLight: '#FFB6C1'
  },
  {
    id: 'salt',
    name: 'Sea Salt',
    profile: 'After Dark',
    description: 'Raw, mineral intimacy. Sea salt opens the fragrance profile, grounding the floral notes with an earthy, skin-like texture.',
    color: '#1A0B2E',
    bgLight: '#E5E0FF'
  },
  {
    id: 'vanilla',
    name: 'Warm Vanilla',
    profile: 'Before the Moment',
    description: 'Not overly sweet, but complex and woody. Madagascar vanilla beans wrap the senses in an elegant, comforting veil.',
    color: '#4A0024',
    bgLight: '#FFD1DC'
  }
];

export default function IngredientsPage() {
  const [activeId, setActiveId] = useState<string>(INGREDIENTS[0].id);

  return (
    <div className="min-h-screen bg-[#1E1B4B] pt-32 pb-16 px-0 flex flex-col font-sans overflow-hidden">
      
      {/* Header */}
      <div className="w-full text-center px-6 mb-16 relative z-10">
        <h4 className="text-[#8EA7E9] text-sm tracking-[0.3em] uppercase mb-4">The Formulation</h4>
        <h1 className="font-serif italic text-5xl md:text-7xl lg:text-[8rem] text-[#E5E0FF] leading-[0.85] tracking-tighter">
          Naked Truth.
        </h1>
        <p className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-[#8EA7E9] max-w-xl mx-auto mt-6">
          Explore the sensory building blocks of the OWN rituals. Pure, potent, and unapologetically bold.
        </p>
      </div>

      {/* Horizontal Accordion Gallery */}
      <div className="flex-1 w-full max-w-[1800px] mx-auto flex flex-col md:flex-row h-[60vh] md:h-[70vh] px-4 md:px-12 gap-2 md:gap-4 pb-12">
        {INGREDIENTS.map((item) => {
          const isActive = activeId === item.id;

          return (
            <motion.div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`relative cursor-pointer rounded-2xl md:rounded-[40px] overflow-hidden transition-all duration-700 ease-[0.16,1,0.3,1] ${
                isActive ? 'flex-[3] md:flex-[4]' : 'flex-[1] md:flex-[1]'
              }`}
              style={{ backgroundColor: item.bgLight }}
            >
              {/* Inner Content Wrapper */}
              <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end">
                
                {/* Always visible vertical text when inactive (on desktop) */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                  <h3 className="hidden md:block font-serif italic text-3xl lg:text-4xl text-black/80 whitespace-nowrap -rotate-90 tracking-widest origin-center min-w-[300px] text-center">
                    {item.name}
                  </h3>
                  <h3 className="block md:hidden font-serif italic text-xl text-black/80 whitespace-nowrap tracking-wide">
                    {item.name}
                  </h3>
                </div>

                {/* Active Expanded Details */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="relative z-10 w-full max-w-xl flex flex-col"
                    >
                      <span 
                        className="text-xs tracking-[0.3em] font-bold uppercase mb-2 md:mb-4"
                        style={{ color: item.color }}
                      >
                        Feature / {item.profile}
                      </span>
                      
                      <h2 
                        className="font-serif italic text-5xl md:text-7xl lg:text-[6rem] leading-[0.8] tracking-tighter mb-4 md:mb-8"
                        style={{ color: item.color }}
                      >
                        {item.name}
                      </h2>
                      
                      <p 
                        className="font-sans text-sm md:text-lg lg:text-xl font-light leading-relaxed max-w-md mix-blend-color-burn"
                        style={{ color: item.color }}
                      >
                        {item.description}
                      </p>

                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Ambient Color Glow inside the active card */}
                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full filter blur-[80px]"
                    style={{ backgroundColor: item.color }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
    </div>
  );
}
