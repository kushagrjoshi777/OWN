'use client';

import { useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function FlowerBloom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Generate the intricate line-art paths deterministically
  const { petalPaths, innerLines, stamens, coreDots } = useMemo(() => {
    // Deterministic pseudo-random to prevent SSR hydration mismatch
    const random = (seed: number) => Math.abs(Math.sin(seed * 12.9898 + 78.233)) % 1;

    // 8 Large organic wavy petals filling the entire 360 circle
    const petals = [
      "M 15,0 C 130,-45 220,-30 260,30 C 310,110 240,160 140,150 C 70,140 25,60 15,0 Z",       // Right
      "M 10,15 C 80,70 170,120 160,210 C 150,290 50,300 -10,230 C -60,160 0,60 10,15 Z",      // Bottom Right
      "M -5,25 C -50,110 -110,210 -180,210 C -250,210 -250,120 -180,70 C -120,30 -25,20 -5,25 Z", // Bottom
      "M -15,10 C -90,70 -190,80 -250,5 C -300,-60 -230,-140 -150,-140 C -80,-140 -30,-50 -15,10 Z", // Bottom Left
      "M -25,-5 C -130,-30 -230,-70 -240,-150 C -250,-240 -160,-270 -80,-220 C -20,-170 -15,-80 -25,-5 Z", // Left 
      "M -10,-20 C -70,-100 -120,-200 -70,-270 C -30,-310 50,-290 80,-210 C 110,-140 30,-50 -10,-20 Z", // Top Left
      "M 5,-25 C 60,-100 130,-200 200,-180 C 270,-160 260,-70 180,-20 C 110,20 25,-10 5,-25 Z", // Top
      "M 15,-10 C 100,-70 200,-80 260,-10 C 310,50 250,130 160,110 C 80,90 30,30 15,-10 Z"      // Top Right
    ];

    // Detail lines extending from center onto petals
    const lines = [
      "M -25,-25 Q -60,-80 -90,-110", "M -15,-30 Q -40,-90 -50,-130", "M -35,-15 Q -100,-50 -130,-70",
      "M -10,-40 Q -20,-100 -30,-140", "M 20,-30 Q 80,-80 110,-100", "M 30,-20 Q 90,-50 130,-60", 
      "M 10,-40 Q 40,-100 50,-130", "M 40,-10 Q 110,-20 150,-30", "M 30,20 Q 80,50 120,70", 
      "M 40,30 Q 100,80 130,110", "M 20,40 Q 60,100 80,140", "M 10,50 Q 30,130 40,160",
      "M -15,40 Q -40,100 -60,140", "M -25,30 Q -80,80 -110,100", "M -35,20 Q -100,40 -140,50",
      "M -40,10 Q -120,20 -160,30", "M -40,0 Q -110,-10 -150,-20",
      "M 25,-5 Q 80,-10 120,-15", "M 15,25 Q 40,80 50,110", "M -5,35 Q -10,110 -15,140"
    ];

    // Stamens around the center
    const stmns = Array.from({ length: 50 }).map((_, i) => {
      const angle = (i * 7.2 + random(i) * 5) * (Math.PI / 180);
      const r1 = 18 + random(i+100) * 8;
      const r2 = 45 + random(i+200) * 25;
      const x1 = Math.cos(angle) * r1;
      const y1 = Math.sin(angle) * r1;
      const x2 = Math.cos(angle) * r2;
      const y2 = Math.sin(angle) * r2;
      const cx = Math.cos(angle + 0.3) * (r1 + r2) / 2;
      const cy = Math.sin(angle + 0.3) * (r1 + r2) / 2;
      return `M ${x1},${y1} Q ${cx},${cy} ${x2},${y2} m 0,-2.5 a 2.5,2.5 0 1,0 0,5 a 2.5,2.5 0 1,0 0,-5`;
    });

    // Core texture dots
    const dots = Array.from({ length: 45 }).map((_, i) => {
      const angle = random(i+300) * Math.PI * 2;
      const r = random(i+400) * 14;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      return `M ${x},${y} m -1.5,0 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0`;
    });

    return { petalPaths: petals, innerLines: lines, stamens: stmns, coreDots: dots };
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !svgRef.current || !textRef.current) return;

    let ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>(svgRef.current!.querySelectorAll('.draw-path'));
      const mainPetals = gsap.utils.toArray<SVGPathElement>(svgRef.current!.querySelectorAll('.petal-main'));
      
      // Initial hidden state for stroke drawing
      paths.forEach(path => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0,
        });
      });

      // Hide fill for main petals so strokes draw cleanly first
      gsap.set(mainPetals, { fill: 'transparent' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // 400vh total height
          scrub: 1, 
          pin: true,
        }
      });

      // 1. Draw all outlines (staggered slightly so it looks like it's being sketched)
      tl.to(paths, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.015,
        ease: 'power1.inOut',
      }, 0);

      // 2. Fade in the background cream color of the main petals so they overlap nicely (like paper)
      tl.to(mainPetals, {
        fill: 'var(--cream)',
        duration: 0.5,
        ease: 'power2.inOut',
      }, 0.6);

      // 3. Text fade in sync with bloom
      tl.fromTo(textRef.current!.children, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out' },
        0.3
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full flex flex-col md:flex-row relative bg-cream overflow-hidden">
      
      {/* LEFT SIDE: Hand-drawn Flower Line Art */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full flex items-center justify-start md:-ml-20 relative z-0 pointer-events-none">
        <svg 
          ref={svgRef}
          viewBox="0 0 600 600" 
          className="w-[130%] h-[130%] -translate-x-1/4 md:-translate-x-1/4 -rotate-12"
          style={{ willChange: 'transform' }}
        >
          <g transform="translate(300, 300)">
            {/* 1. Main Petals (drawn with thick line, filled with cream to hide lines behind them) */}
            {petalPaths.map((d, i) => (
              <path 
                key={`petal-${i}`} 
                className="draw-path petal-main" 
                stroke="var(--foreground)" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d={d} 
              />
            ))}
            
            {/* 2. Inner detail fold lines */}
            {innerLines.map((d, i) => (
              <path 
                key={`line-${i}`} 
                className="draw-path" 
                stroke="var(--foreground)" 
                fill="none" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                d={d} 
                opacity="0.8"
              />
            ))}

            {/* 3. Stamens (radiating lines with tiny anther loops at the end) */}
            {stamens.map((d, i) => (
              <path 
                key={`stamen-${i}`} 
                className="draw-path" 
                stroke="var(--foreground)" 
                fill="none" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                d={d} 
              />
            ))}
            
            {/* 4. Core texture dots */}
            {coreDots.map((d, i) => (
              <path 
                key={`core-${i}`} 
                className="draw-path" 
                stroke="var(--foreground)" 
                fill="var(--foreground)" 
                strokeWidth="0.5" 
                d={d} 
              />
            ))}
          </g>
        </svg>
      </div>

      {/* RIGHT SIDE: Text Content */}
      <div 
        className="w-full md:w-1/2 h-[50vh] md:h-full flex flex-col justify-center items-start px-8 md:pl-16 relative z-10"
      >
        <div ref={textRef} className="max-w-lg">
          <h2 className="font-serif italic text-6xl md:text-[5rem] leading-none text-foreground mb-4">
            Fragrance
          </h2>
          <p className="font-sans text-xl md:text-2xl font-light tracking-wide text-amber uppercase">
            Eternal Blossom Essence
          </p>
          <div className="mt-8 w-12 h-px bg-amber opacity-50" />
          <p className="mt-8 font-sans font-light text-foreground/70 leading-relaxed text-lg">
            Unfurl your senses with an evolving scent profile that deepens throughout the day, drawing inspiration from rare nocturnal blooms.
          </p>
        </div>
      </div>
      
    </section>
  );
}
