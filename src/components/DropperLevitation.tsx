'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

export default function DropperLevitation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropperGroupRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !bottleRef.current) return;

    let ctx = gsap.context(() => {
      const outlines = bottleRef.current!.querySelectorAll('.bottle-outline');
      const fillsGroup = bottleRef.current!.querySelector('.bottle-fills');

      // --- INITIAL STATE ---
      outlines.forEach((el) => {
        let length = 0;
        if (el instanceof SVGPathElement) {
          length = el.getTotalLength();
        } else {
          const w = parseFloat(el.getAttribute('width') || '0');
          const h = parseFloat(el.getAttribute('height') || '0');
          length = (w + h) * 2;
        }
        gsap.set(el, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 });
      });
      gsap.set(fillsGroup, { opacity: 0 });

      // --- SETUP DROPPER ---
      gsap.set(dropperGroupRef.current, { y: 155 }); // Bulb rests exactly on the bottle top collar
      gsap.set(dropRef.current, { opacity: 0, scale: 0.5, y: 0 });
      gsap.set(rippleRef.current, { opacity: 0, scale: 0.2 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%', // 400vh scroll distance
          scrub: 1, // Smooth scrub
          pin: true,
        }
      });

      // 0-40%: Draw the bottle outlines
      tl.to(outlines, { strokeDashoffset: 0, opacity: 1, duration: 1.5, stagger: 0.1, ease: 'power1.inOut' }, 0);
      // 20-50%: Fade in the bottle fills & serum liquid
      tl.to(fillsGroup, { opacity: 1, duration: 1.0, ease: 'power2.inOut' }, 0.5);

      // 0-60%: Dropper rises out from resting on the bottle to hover height
      tl.to(dropperGroupRef.current, { y: -60, duration: 2.2, ease: 'power2.inOut' }, 0);

      // 60-70%: Droplet starts forming and squeezing out
      tl.to(dropRef.current, { 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        ease: 'power2.out' 
      }, 2.2);

      // 70-80%: Droplet falls
      tl.to(dropRef.current, { 
        y: 120, // Travel down from hover point to the liquid surface
        duration: 0.8, 
        ease: 'power1.in' 
      }, 2.6);
      tl.to(dropRef.current, { opacity: 0, duration: 0.1 }, 3.3);
          
      // 80-100%: Ripple effect on surface impact
      tl.to(rippleRef.current, { scale: 3, opacity: 0.8, duration: 0.5, ease: 'power2.out' }, 3.3);
      tl.to(rippleRef.current, { opacity: 0, scale: 4, duration: 0.4 }, 3.8);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full flex flex-col-reverse md:flex-row relative bg-[#E5E0FF] overflow-hidden">
      
      {/* LEFT SIDE: Text (40vw) */}
      <div className="w-full md:w-[40vw] h-[50vh] md:h-full flex flex-col justify-center items-start px-8 md:pl-20 relative z-10">
        <div ref={textRef} className="max-w-md">
          <h2 className="font-serif italic text-5xl md:text-[4.5rem] leading-[1.1] text-foreground mb-6">
            Skin Nourishment
          </h2>
          <p className="font-sans text-xl font-light tracking-wide text-amber uppercase">
            Deep Hydration Formula
          </p>
          <div className="mt-8 w-12 h-px bg-amber opacity-50" />
          <p className="mt-8 font-sans font-light text-foreground/70 leading-relaxed text-lg">
            A potent blend of squalane, hyaluronic acid, and ceramides. Every drop is precision-engineered to restore your skin's natural barrier.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Bottle Animation (60vw) */}
      <div className="w-full md:w-[60vw] h-[50vh] md:h-full flex items-center justify-center relative z-0">
        
        <div className="relative flex flex-col items-center justify-center translate-y-20 md:translate-y-0 h-[600px] w-[300px]">
          
          {/* Dropper Component (Animated Group, starts lower z-index than bottle to be inside liquid) */}
          <div ref={dropperGroupRef} className="absolute top-[30px] z-10 flex flex-col items-center will-change-transform">
            
            {/* SVG Flat-Art Dropper */}
            <svg width="60" height="200" viewBox="0 0 60 200" className="overflow-visible">
              <path d="M 30 5 C 45 5 50 20 45 35 C 40 50 35 45 30 45 C 25 45 20 50 15 35 C 10 20 15 5 30 5 Z" fill="#2D1F16" />
              {/* Glass Pipette */}
              <rect x="26" y="40" width="8" height="130" rx="3" fill="#ffffff" fillOpacity="0.4" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.8" />
              {/* Tip taper */}
              <path d="M 26 170 C 26 185 28 190 30 195 C 32 190 34 185 34 170 Z" fill="#ffffff" fillOpacity="0.4" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.8" />
              {/* Liquid inside Pipette */}
              <rect x="27.5" y="110" width="5" height="58" fill="#E2C17D" fillOpacity="0.8" />
              <path d="M 27.5 168 C 27.5 180 28.5 185 30 190 C 31.5 185 32.5 180 32.5 168 Z" fill="#E2C17D" fillOpacity="0.8" />
            </svg>

            {/* Droplet GSAP Target (starts hidden at tip) */}
            <div 
              ref={dropRef} 
              className="w-3.5 h-5 rounded-t-[50%] rounded-b-full absolute bottom-[-10px] left-1/2 -translate-x-1/2 z-10"
              style={{ background: 'linear-gradient(135deg, #E2C17D 0%, #D4A843 100%)', boxShadow: '0 4px 10px rgba(212,168,67,0.4)' }}
            />
          </div>

          {/* Bottle Body Assembly (Higher Z-index so it overlays the dropper stem!) */}
          <div ref={bottleRef} className="relative z-20 w-[200px] h-[300px] mt-48 flex justify-center items-end mix-blend-normal">
            
            {/* SVG Flat-Art Bottle */}
            <svg width="180" height="280" viewBox="0 0 180 280" className="absolute bottom-0 drop-shadow-xl overflow-visible">
              <defs>
                <linearGradient id="serumLiquid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FAD896" />
                  <stop offset="100%" stopColor="#D4A843" />
                </linearGradient>
                <linearGradient id="goldCollar" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#C49B45" />
                  <stop offset="30%" stopColor="#ECCC7B" />
                  <stop offset="60%" stopColor="#ECCC7B" />
                  <stop offset="100%" stopColor="#9E782D" />
                </linearGradient>
              </defs>

              {/* --- OUTLINES (Drawn first) --- */}
              <path className="draw-path" d="M 30 100 Q 30 80 75 60 L 105 60 Q 150 80 150 100 L 150 220 Q 150 270 90 270 Q 30 270 30 220 Z" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeOpacity="1" />
              <path className="draw-path" d="M 36 120 Q 36 210 50 240" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="1" />
              <rect className="draw-path" x="80" y="60" width="20" height="20" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="1" />
              <rect className="draw-path" x="74" y="45" width="32" height="15" rx="2" fill="none" stroke="#C49B45" strokeWidth="1.5" />
              <rect className="draw-path" x="45" y="125" width="90" height="95" rx="8" fill="none" stroke="#D4A843" strokeWidth="1" strokeOpacity="0.8" />

              {/* --- FILLS (Faded in after) --- */}
              <g className="fade-fill">
                {/* Back edge glass thickness & liquid */}
                <path d="M 30 100 Q 30 80 75 60 L 105 60 Q 150 80 150 100 L 150 220 Q 150 270 90 270 Q 30 270 30 220 Z" fill="#ffffff" fillOpacity="0.2" />
                <path d="M 34 110 Q 34 90 75 75 L 105 75 Q 146 90 146 110 L 146 215 Q 146 260 90 260 Q 34 260 34 215 Z" fill="url(#serumLiquid)" fillOpacity="0.85" />
                
                {/* Internal Glass Stem/Neck */}
                <rect x="80" y="60" width="20" height="20" fill="#ffffff" fillOpacity="0.3" />

                {/* Gold Collar / Ring */}
                <rect x="74" y="45" width="32" height="15" rx="2" fill="url(#goldCollar)" />
                <rect x="72" y="58" width="36" height="4" rx="1" fill="#C49B45" />

                {/* Cream Label & Text */}
                <rect x="45" y="125" width="90" height="95" rx="8" fill="#FFFBF1" />
                <text x="90" y="160" textAnchor="middle" fill="#3A2C22" fontSize="22" letterSpacing="0.05em" className="font-serif italic">OWN</text>
                <text x="90" y="180" textAnchor="middle" fill="#A48650" fontSize="11" letterSpacing="0.05em" className="font-serif italic uppercase tracking-wider">Nourishment</text>
                <text x="90" y="200" textAnchor="middle" fill="#7d6a5c" fontSize="7" letterSpacing="0.2em" className="font-sans uppercase">30 ML</text>
              </g>
            </svg>

            {/* Ripple Plane (GSAP Target) */}
            <div 
              ref={rippleRef}
              className="absolute top-[85px] w-24 h-4 border border-white/80 rounded-[100%] absolute pointer-events-none z-20 mix-blend-overlay fade-fill"
              style={{ transformStyle: 'preserve-3d', transform: 'rotateX(75deg)' }}
            />
          </div>

        </div>
      </div>

      
    </section>
  );
}
