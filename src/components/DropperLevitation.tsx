'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

export default function DropperLevitation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropperGroupRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !dropperGroupRef.current || !dropRef.current || !rippleRef.current || !textRef.current) return;

    // Reset initial states
    gsap.set(dropperGroupRef.current, { y: 20 }); // Start deep in the neck
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

    // 0-50%: Dropper rises from the neck
    tl.to(dropperGroupRef.current, {
      y: -110, // MAX_LIFT: 110px
      duration: 2,
      ease: 'power2.inOut'
    }, 0);

    // Text fade in during the rise
    tl.fromTo(textRef.current.children,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power2.out' },
      0.5
    );

    // 50-80%: Droplet forms and falls
    tl.to(dropRef.current, { opacity: 1, scale: 1, duration: 0.5 }, 2);
    tl.to(dropRef.current, { 
      y: 130, // Drop down towards bottle
      duration: 1, 
      ease: 'power1.in' 
    }, 2.5);
    tl.to(dropRef.current, { opacity: 0, duration: 0.1 }, 3.4);

    // 80-100%: Ripple effect on surface
    tl.to(rippleRef.current, {
      scale: 3,
      opacity: 0.8,
      duration: 0.5,
      ease: 'power2.out'
    }, 3.4);
    tl.to(rippleRef.current, { opacity: 0, scale: 4, duration: 0.4 }, 3.9);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full flex flex-col-reverse md:flex-row relative bg-glass overflow-hidden">
      
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
        
        <div className="relative flex flex-col items-center justify-center translate-y-20 md:translate-y-0 h-[600px]">
          
          {/* Dropper Component */}
          <div ref={dropperGroupRef} className="absolute top-[80px] z-20 flex flex-col items-center will-change-transform">
            {/* Rubber Bulb */}
            <div className="w-12 h-16 rounded-t-full bg-cream border-2 border-sand shadow-inner" />
            {/* Glass pipette */}
            <div className="w-3 h-32 bg-white/40 backdrop-blur-sm border-x border-b border-white/60 rounded-b-full relative flex items-end justify-center pb-1">
              {/* Droplet (starts hidden inside pipette tip) */}
              <div 
                ref={dropRef} 
                className="w-4 h-5 rounded-b-full rounded-t-[50%] absolute -bottom-2"
                style={{ background: 'linear-gradient(135deg, var(--serum) 0%, rgba(212,168,67,0.4) 100%)', boxShadow: '0 4px 12px rgba(212,168,67,0.3)' }}
              />
            </div>
          </div>

          {/* Bottle Body */}
          <div className="relative z-10 w-48 h-64 mt-36 rounded-3xl backdrop-blur-xl border border-white/40 flex flex-col items-center justify-end overflow-hidden shadow-2xl" 
               style={{ background: 'linear-gradient(145deg, rgba(240,237,228,0.7) 0%, rgba(245,240,232,0.3) 100%)' }}>
            
            {/* Liquid inside the bottle */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-serum/20 rounded-b-3xl" />
            
            {/* Ripple Plane (at liquid surface) */}
            <div 
              ref={rippleRef}
              className="absolute top-[3.5rem] w-32 h-6 border-2 border-amber/60 rounded-[100%] absolute pointer-events-none"
              style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg)' }}
            />

            {/* Label */}
            <div className="relative z-20 mb-16 text-center flex flex-col items-center">
              <span className="font-serif font-bold text-3xl tracking-[0.2em] text-foreground">OWN</span>
              <div className="w-8 h-px bg-amber/30 mt-3" />
            </div>

            {/* Bottle Neck overlay to hide dropper base when inside */}
            <div className="absolute top-0 w-16 h-12 bg-glass border-x border-white/50 backdrop-blur-md z-30 flex justify-center">
              {/* Inner hole depth */}
              <div className="w-10 h-8 bg-black/5 rounded-[100%] mt-[-4px]" />
            </div>
          </div>

        </div>
      </div>
      
    </section>
  );
}
