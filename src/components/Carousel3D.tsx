'use client';

import { useState, useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop", // factory
  "https://images.unsplash.com/photo-1490750967868-88cb44cb2722?q=80&w=800&auto=format&fit=crop", // flowers
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format&fit=crop", // botanical tree
  "https://images.unsplash.com/photo-1605235904828-984dd863e46c?q=80&w=800&auto=format&fit=crop", // manufacturing/process
  "https://images.unsplash.com/photo-1460500063983-994d4c27756c?q=80&w=800&auto=format&fit=crop", // nature
  "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop", // lab / factory
];

export default function Carousel3D() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeBgUrl, setActiveBgUrl] = useState<string | null>(null);
  const rotation = useMotionValue(0);
  
  // Keep track of continuous rotation
  useAnimationFrame((time, delta) => {
    if (!isHovered) {
      // Adjust speed by changing the multiplier
      rotation.set(rotation.get() - delta * 0.03);
    }
  });

  const radius = 200; // Smaller distance of cards from center

  const handleMouseEnter = () => {
    const currentRot = rotation.get();
    const normalizedR = ((currentRot % 360) + 360) % 360;
    const targetAngle = 360 - normalizedR;
    const idx = Math.round(targetAngle / (360 / images.length)) % images.length;
    setActiveBgUrl(images[idx]);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className="relative w-full h-[500px] flex items-center justify-center overflow-hidden"
      style={{ perspective: 1200 }}
    >
      {/* Blurred Background corresponding to front slide */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-700 ease-out pointer-events-none"
        style={{ opacity: isHovered && activeBgUrl ? 0.4 : 0 }}
      >
        {activeBgUrl && (
          <img src={activeBgUrl} className="w-full h-full object-cover blur-[60px] scale-125 opacity-70 mix-blend-screen" alt="" />
        )}
      </div>

      {/* 3D Wrapper - Hover events placed here instead of the outer shell! */}
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY: rotation,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-[200px] h-[300px] cursor-pointer z-10"
      >
        {images.map((img, i) => {
          const angle = (360 / images.length) * i;
          return (
            <div
              key={i}
              className="absolute inset-0 bg-[#1E1B4B]/20 rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500"
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                backfaceVisibility: 'hidden',
                // Slight lighting effect based on hover
                filter: isHovered ? 'brightness(1.05) contrast(1.1)' : 'brightness(0.9)',
              }}
            >
              <img 
                src={img} 
                alt={`Slide ${i}`}
                className="w-full h-full object-cover pointer-events-none"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            </div>
          );
        })}
      </motion.div>

      {/* Surrounding Text overlay triggered by hover */}
      <div 
        className={`absolute inset-0 z-50 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      >
        <div className="absolute top-4 md:top-8 text-center px-4 max-w-2xl bg-[#050505]/60 backdrop-blur-md border border-white/10 rounded-full py-3 text-white uppercase tracking-[0.3em] text-xs shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-transform duration-700 ease-out translate-y-0"
             style={{ transform: isHovered ? 'translateY(0)' : 'translateY(-20px)' }}>
          Absorb the Narrative
        </div>
        
        <div className="absolute font-serif italic text-white/90 text-4xl left-[10%] md:left-[20%] rotate-[-90deg] origin-center tracking-widest whitespace-nowrap opacity-80"
             style={{ transform: `rotate(-90deg) ${isHovered ? 'translateX(0)' : 'translateX(-20px)'}` }}>
          The Origin
        </div>
        
        <div className="absolute font-serif italic text-white/90 text-4xl right-[10%] md:right-[20%] rotate-[90deg] origin-center tracking-widest whitespace-nowrap opacity-80"
             style={{ transform: `rotate(90deg) ${isHovered ? 'translateX(0)' : 'translateX(-20px)'}` }}>
          The Future
        </div>

        <div className="absolute bottom-4 md:bottom-8 text-center px-4 max-w-lg bg-[#050505]/60 backdrop-blur-md border border-white/10 rounded-full py-3 text-white uppercase tracking-[0.2em] text-xs shadow-[0_0_40px_rgba(255,255,255,0.1)]"
             style={{ transform: isHovered ? 'translateY(0)' : 'translateY(20px)' }}>
          Stop. Breathe. Experience.
        </div>
      </div>
    </div>
  );
}
