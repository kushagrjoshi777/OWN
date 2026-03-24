'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function BodyWashStatic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !textRef.current || !bottleRef.current) return;

    // A simple fade up for both sides when scrolling into view (not scrubbed, just a trigger)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      }
    });

    tl.fromTo(textRef.current.children,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power2.out' },
      0
    );

    tl.fromTo(bottleRef.current,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out' },
      0.3
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen w-full flex flex-col md:flex-row relative bg-cream">
      
      {/* LEFT SIDE: Text */}
      <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen flex flex-col justify-center items-start px-8 md:pl-20 relative z-10">
        <div ref={textRef} className="max-w-md">
          <h2 className="font-serif italic text-5xl md:text-[4.5rem] leading-[1.1] text-foreground mb-6">
            Visual Design
          </h2>
          <p className="font-sans text-xl font-light tracking-wide text-amber uppercase">
            Silk Body Wash
          </p>
          <div className="mt-8 w-12 h-px bg-amber opacity-50" />
          <p className="mt-8 font-sans font-light text-foreground/70 leading-relaxed text-lg">
            Sculptural objects that elevate your daily space. A soft curves bottle holding rich, aromatic foam, inspired by modern monolithic architecture.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Static SVG Bottle drawing */}
      <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen flex items-center justify-center relative z-0">
        <div ref={bottleRef} className="relative w-full max-w-sm flex justify-center">
          
          <svg 
            width="140" 
            height="320" 
            viewBox="0 0 140 320" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-2xl"
          >
            {/* Liquid Gradient Definition */}
            <defs>
              <linearGradient id="bodyWashLiquid" x1="0" y1="320" x2="0" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#a8d5e2" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#c5e6f3" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#e6f3ff" stopOpacity="0.5" />
              </linearGradient>
              
              <linearGradient id="glassReflection" x1="0" y1="0" x2="140" y2="320" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                <stop offset="30%" stopColor="white" stopOpacity="0.05" />
                <stop offset="70%" stopColor="black" stopOpacity="0.05" />
                <stop offset="100%" stopColor="white" stopOpacity="0.1" />
              </linearGradient>

              {/* Clip path for liquid slosh */}
              <clipPath id="bottleClip">
                <path d="M15 60 C5 60 5 70 5 180 C5 290 15 315 70 315 C125 315 135 290 135 180 C135 70 125 60 115 60 Z" />
              </clipPath>
            </defs>

            {/* Static Cap (Flip Top) */}
            <rect x="45" y="10" width="50" height="25" rx="4" fill="var(--sand)" stroke="var(--amber)" strokeWidth="0.5" />
            <path d="M48 20 L92 20" stroke="rgba(200, 146, 42, 0.4)" strokeWidth="1" />
            <rect x="55" y="5" width="30" height="5" rx="2" fill="var(--sand)" />
            
            {/* Bottle Neck outline */}
            <rect x="50" y="35" width="40" height="25" fill="var(--glass)" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />

            {/* Bottle Main Body / Glass Boundary */}
            <path d="M15 60 C5 60 5 70 5 180 C5 290 15 315 70 315 C125 315 135 290 135 180 C135 70 125 60 115 60 Z" 
                  fill="var(--glass)" 
                  stroke="white" 
                  strokeWidth="2" />
            
            {/* Liquid Fill Inside */}
            <path d="M0 110 Q70 100 140 110 L140 320 L0 320 Z" 
                  fill="url(#bodyWashLiquid)" 
                  clipPath="url(#bottleClip)" />

            {/* Glass Highlights / Glare */}
            <path d="M15 60 C5 60 5 70 5 180 C5 290 15 315 70 315 C125 315 135 290 135 180 C135 70 125 60 115 60 Z" 
                  fill="url(#glassReflection)" 
                  pointerEvents="none" />
            
            {/* Sharp side highlight (left rim) */}
            <path d="M10 80 C8 150 8 250 15 290" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />

            {/* Label Block */}
            <rect x="30" y="160" width="80" height="60" rx="2" fill="var(--cream)" opacity="0.9" />
            <text x="70" y="186" textAnchor="middle" fill="var(--foreground)" className="font-serif font-black" fontSize="11" letterSpacing="0.2em">OWN</text>
            <text x="70" y="202" textAnchor="middle" fill="var(--amber)" className="font-sans" fontSize="6" letterSpacing="0.1em" opacity="0.8">BODY WASH</text>

          </svg>

        </div>
      </div>
      
    </section>
  );
}
