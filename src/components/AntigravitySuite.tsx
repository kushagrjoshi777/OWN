'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function AntigravitySuite() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Parallax Element Refs
  const bgTextureRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);
  const dropperRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    // Timeline for the text fade in
    gsap.fromTo(textRef.current?.children || [],
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.5, 
        stagger: 0.2, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        }
      }
    );

    // Timeline for the Antigravity effects (Parallax scrubbed to scroll)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5, // 1.5 for a very smooth, floaty parallax delay
      }
    });

    // 1. Background slow parallax (moves slightly Up)
    tl.to(bgTextureRef.current, { y: -150, ease: 'none'}, 0);

    // 2. Flower floats aggressively Up and rotates
    tl.fromTo(flowerRef.current,
      { y: 200, rotation: -15 },
      { y: -300, rotation: 25, ease: 'none' },
      0
    );

    // 3. Dropper floats Up fast and rotates slightly
    tl.fromTo(dropperRef.current,
      { y: 150, rotation: 10 },
      { y: -250, rotation: -20, ease: 'none' },
      0
    );

    // 4. Bottle floats Up steadily
    tl.fromTo(bottleRef.current,
      { y: 100, rotation: -5 },
      { y: -200, rotation: 15, ease: 'none' },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] w-full bg-cream overflow-hidden flex items-center justify-center">
      
      {/* BACKGROUND TEXTURE (moves slower) */}
      <div 
        ref={bgTextureRef} 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, var(--serum) 0%, transparent 60%)',
          backgroundSize: '120% 120%',
          backgroundPosition: 'center',
          height: '130%' // Extra height for parallax travel
        }}
      />

      {/* FLOATING ELEMENTS CONTAINER */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        
        {/* Abstract Flower */}
        <div ref={flowerRef} className="absolute left-[10%] top-[40%] w-64 h-64 drop-shadow-2xl opacity-60">
          <svg viewBox="0 0 200 200">
            <path d="M100 10 C150 10 190 50 190 100 C190 150 150 190 100 190 C50 190 10 150 10 100 C10 50 50 10 100 10 Z" fill="var(--glass)" stroke="var(--amber)" strokeWidth="1"/>
            <path d="M100 30 C130 30 170 80 170 100 C170 120 130 170 100 170 C70 170 30 120 30 100 C30 80 70 30 100 30 Z" fill="var(--sand)" />
          </svg>
        </div>

        {/* Abstract Dropper */}
        <div ref={dropperRef} className="absolute right-[15%] top-[60%] w-24 h-56 drop-shadow-2xl">
          <div className="w-full h-full relative flex flex-col items-center">
            <div className="w-12 h-16 rounded-t-full bg-white border border-sand shadow-inner" />
            <div className="w-4 flex-1 bg-white/40 backdrop-blur-sm border-x border-b border-white/60 rounded-b-full shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
          </div>
        </div>

        {/* Abstract Bottle Silhouette */}
        <div ref={bottleRef} className="absolute left-[25%] top-[70%] w-40 h-64 drop-shadow-2xl">
           <svg viewBox="0 0 100 200" className="w-full h-full">
            <path d="M30 0 L70 0 L70 20 C90 30 100 50 100 80 L100 180 C100 190 90 200 50 200 C10 200 0 190 0 180 L0 80 C0 50 10 30 30 20 Z" fill="var(--glass)" stroke="white" strokeWidth="2" />
           </svg>
        </div>

      </div>

      {/* CENTER TEXT OVERLAY */}
      <div ref={textRef} className="relative z-20 text-center max-w-3xl px-6 leading-tight select-none pointer-events-none">
        <h2 className="font-serif italic text-6xl md:text-[6rem] text-foreground mb-6" style={{ textShadow: '0 4px 30px rgba(255,255,255,0.8)' }}>
          Antigravity
        </h2>
        <p className="font-sans text-xl md:text-3xl font-light tracking-wide text-amber uppercase bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full inline-block border border-white/60">
          Beauty Experience
        </p>
      </div>

    </section>
  );
}
