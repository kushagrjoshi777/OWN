'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const RITUALS = [
  {
    id: "purple", color: "purple" as const, step: "01",
    subtitle: "BEFORE THE MOMENT",
    title: "Before The Moment",
    desc: "Seductive · Elegant · Anticipatory",
    notes: "Dark Cherry · Plum · Warm Vanilla · Sandalwood",
    bg: "#1A0B2E",
    bottleGradients: { base: 'linear-gradient(145deg, #D1C4E9 0%, #7E57C2 40%, #311B92 100%)', text: '#1A004F' }
  },
  {
    id: "pink", color: "pink" as const, step: "02",
    subtitle: "MAIN CHARACTER",
    title: "The Main Character",
    desc: "Bold · Confident · Spotlight-ready",
    notes: "Vanilla · Amber · Soft Musk",
    bg: "#4A0024",
    bottleGradients: { base: 'linear-gradient(145deg, #FFB6C1 0%, #FF2A85 40%, #C20054 100%)', text: '#590026' }
  },
  {
    id: "blue", color: "blue" as const, step: "03",
    subtitle: "AFTER DARK",
    title: "After Dark",
    desc: "Sensual · Magnetic · Mysterious",
    notes: "Sea Salt · Lotus · White Tea",
    bg: "#001B2E",
    bottleGradients: { base: 'linear-gradient(145deg, #E1F5FE 0%, #29B6F6 40%, #0277BD 100%)', text: '#003359' }
  }
];

const RitualBottle = ({ styleObj, subtitle, step }: { styleObj: any, subtitle: string, step: string }) => {
  const { base, text } = styleObj;

  return (
    <div className="relative flex flex-col items-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-transform duration-700 hover:scale-105">
      
      {/* CAP (Two Stacked Donut Rings) */}
      <div className="relative z-10 flex flex-col items-center -mb-5">
        <div className="w-[110px] h-[55px] relative overflow-hidden shadow-xl z-20" style={{ background: base, borderRadius: '50px' }}>
          <div className="absolute top-1 left-[15%] right-[15%] h-3 bg-white/60 rounded-full blur-[2px]" />
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-black/30 blur-[4px]" />
          <div className="absolute top-2 left-6 w-3 h-8 bg-white/80 rotate-[35deg] blur-[1px] rounded-full" />
        </div>
        
        <div className="w-[130px] h-[55px] relative overflow-hidden shadow-xl z-10 -mt-3" style={{ background: base, borderRadius: '50px' }}>
          <div className="absolute top-1 left-[15%] right-[15%] h-3 bg-white/60 rounded-full blur-[2px]" />
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-black/30 blur-[4px]" />
          <div className="absolute top-2 left-8 w-3 h-8 bg-white/80 rotate-[35deg] blur-[1px] rounded-full" />
        </div>
      </div>

      {/* MAIN BOTTLE BODY */}
      <div className="w-[240px] h-[300px] relative overflow-hidden shadow-2xl z-0 border border-white/20" 
           style={{ 
             background: base, 
             borderRadius: '45% 45% 40% 40% / 30% 30% 60% 60%',
             boxShadow: 'inset -25px -25px 50px rgba(0,0,0,0.4), inset 20px 0 50px rgba(255,255,255,0.7)'
           }}>
        
        {/* 3D Glossy Highlights */}
        <div className="absolute top-12 bottom-16 left-3 w-6 bg-white/50 rounded-full blur-[5px] transform -rotate-1" />
        <div className="absolute top-20 bottom-24 left-6 w-2 bg-white/90 rounded-full blur-[1px]" />
        <div className="absolute top-16 bottom-16 right-3 w-10 bg-white/10 rounded-full blur-[8px]" />
        <div className="absolute top-2 left-12 right-12 h-8 bg-white/40 rounded-full blur-[6px]" />

        {/* BOTTLE LABEL GRAPHICS */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-[40%] flex flex-col items-center justify-center pointer-events-none">
           <div className="text-center leading-[0.7] mb-8 mt-6 relative w-full">
             <h3 className="font-serif font-black text-[6rem] tracking-tighter" style={{ color: text, transform: 'scaleY(1.15)' }}>OWN</h3>
           </div>
           
           <div className="flex flex-col items-center px-4 w-full">
             <div className="w-16 h-px bg-current opacity-40 mb-3" style={{ color: text }} />
             <span className="font-serif italic text-[1.15rem] font-bold tracking-widest text-center leading-snug w-full px-2" style={{ color: text }}>{subtitle}</span>
           </div>
        </div>

      </div>
    </div>
  )
};

export default function AntigravitySuite() {
  const parallaxContainerRef = useRef<HTMLDivElement>(null);
  const textTitleRef = useRef<HTMLDivElement>(null);
  const bgTextureRef = useRef<HTMLDivElement>(null);
  const bottlePurpleRef = useRef<HTMLDivElement>(null);
  const bottlePinkRef = useRef<HTMLDivElement>(null);
  const bottleBlueRef = useRef<HTMLDivElement>(null);

  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!parallaxContainerRef.current || !sliderContainerRef.current || !sliderRef.current) return;

    let ctx = gsap.context(() => {
      // --- 1. PARALLAX TIMELINE ---
      const tlParallax = gsap.timeline({
        scrollTrigger: {
          trigger: parallaxContainerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      // Background slow parallax
      tlParallax.to(bgTextureRef.current, { y: -150, ease: 'none'}, 0);

      // Purple Bottle (Left)
      tlParallax.fromTo(bottlePurpleRef.current,
        { y: 300, rotation: -12, x: -100 },
        { y: -350, rotation: 8, x: -40, ease: 'none' },
        0
      );

      // Pink Bottle (Center / Main Character - Floats highest and biggest)
      tlParallax.fromTo(bottlePinkRef.current,
        { y: 450, rotation: 5, scale: 1.1 },
        { y: -550, rotation: -10, scale: 1.1, ease: 'none' },
        0
      );

      // Blue Bottle (Right)
      tlParallax.fromTo(bottleBlueRef.current,
        { y: 350, rotation: 20, x: 100 },
        { y: -300, rotation: -5, x: 30, ease: 'none' },
        0
      );

      // --- 2. HORIZONTAL SLIDER TIMELINE ---
      const tlSlider = gsap.timeline({
        scrollTrigger: {
          trigger: sliderContainerRef.current,
          pin: true,
          scrub: 1, // Smooth scrolling transition
          end: '+=300%', // 3 panels = 300% scroll distance
        }
      });

      // Horizontal slide (move container left by 2 slide widths)
      tlSlider.to(sliderRef.current, {
        xPercent: -66.666,
        ease: 'none',
        duration: 1
      }, 0);

      // Background color shifts (sync perfectly with the slider movement)
      // Slide 1 starts at 0, Slide 2 centers at 0.5, Slide 3 centers at 1.0.
      tlSlider.to(sliderContainerRef.current, { backgroundColor: RITUALS[1].bg, duration: 0.25, ease: 'power1.inOut' }, 0.2);
      tlSlider.to(sliderContainerRef.current, { backgroundColor: RITUALS[2].bg, duration: 0.25, ease: 'power1.inOut' }, 0.7);
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* =========================================
          SECTION 1: THE PARALLAX FLOATING BOTTLES
          ========================================= */}
      <section 
        ref={parallaxContainerRef} 
        className="relative min-h-[150vh] w-full overflow-hidden flex items-center justify-center"
        style={{ background: 'linear-gradient(to bottom, #1a1a4e 0%, #cac4e4 100%)' }}
      >

        {/* BACKGROUND TEXTURE */}
        <div 
          ref={bgTextureRef} 
          className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, var(--serum) 0%, transparent 60%)',
            backgroundSize: '120% 120%',
            backgroundPosition: 'center',
            height: '130%'
          }}
        />

        {/* FLOATING BOTTLES CONTAINER */}
        <div className="absolute inset-0 z-10 pointer-events-none w-full max-w-[1400px] mx-auto">
          
          <div ref={bottlePurpleRef} className="absolute left-[5%] md:left-[15%] top-[20%] scale-75 origin-center">
            <RitualBottle styleObj={RITUALS[0].bottleGradients} subtitle="BEFORE THE MOMENT" step="01" />
          </div>

          <div ref={bottlePinkRef} className="absolute left-[30%] md:left-[40%] top-[40%] z-20 scale-90 origin-center">
            <RitualBottle styleObj={RITUALS[1].bottleGradients} subtitle="MAIN CHARACTER" step="02" />
          </div>

          <div ref={bottleBlueRef} className="absolute right-[5%] md:right-[15%] top-[30%] scale-[0.65] origin-center">
            <RitualBottle styleObj={RITUALS[2].bottleGradients} subtitle="AFTER DARK" step="03" />
          </div>

        </div>

        {/* CENTER TEXT OVERLAY */}
        <div ref={textTitleRef} className="relative z-30 text-center max-w-3xl px-6 pointer-events-none overflow-visible mix-blend-difference">
          <h2 className="font-serif italic text-6xl md:text-[9rem] tracking-tight leading-[1] text-white py-10 opacity-100">
            The Rituals
          </h2>
        </div>

      </section>

      {/* Seamless transition gradient bridging the light lavender end of parallax into the dark purple start of horizontal slider */}
      <div 
        className="h-[30vh] w-full" 
        style={{ background: 'linear-gradient(to bottom, #cac4e4 0%, #1A0B2E 100%)' }} 
      />

      {/* =========================================
          SECTION 2: HORIZONTAL SLIDING DETAILS
          ========================================= */}
      <section ref={sliderContainerRef} className="h-screen w-full overflow-hidden relative" style={{ backgroundColor: RITUALS[0].bg }}>
        
        {/* Background subtle noise/texture */}
        <div 
          className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)',
            backgroundSize: '120% 120%',
            backgroundPosition: 'center',
          }}
        />

        {/* The horizontal slider track */}
        <div ref={sliderRef} className="flex h-full w-[300vw] relative z-20">
          {RITUALS.map((ritual, idx) => (
            <div key={ritual.id} className="ritual-slide w-screen h-full flex flex-col md:flex-row items-center justify-center px-10 md:px-20 relative">
              
              {/* LEFT SIDE: 3D Bottle */}
              <div className="w-full md:w-1/2 flex justify-center items-center h-[50vh] md:h-full">
                <RitualBottle styleObj={ritual.bottleGradients} subtitle={ritual.subtitle} step={ritual.step} />
              </div>

              {/* RIGHT SIDE: Description */}
              <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left text-white mt-10 md:mt-0">
                <h2 className="font-serif italic text-6xl md:text-[5.5rem] mb-4 leading-none" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                  {ritual.title}
                </h2>
                <p className="font-sans text-lg md:text-xl uppercase tracking-widest text-white/70 mb-10">
                  {ritual.desc}
                </p>
                
                <div className="h-px w-24 bg-white/30 mb-8" />
                
                <h4 className="font-sans text-xs md:text-sm tracking-[0.25em] text-white/50 mb-3 uppercase">
                  Key Fragrance Notes
                </h4>
                <p className="font-serif text-2xl md:text-3xl text-white/90">
                  {ritual.notes}
                </p>
              </div>
              
            </div>
          ))}
        </div>
        
        {/* Ambient Overlay Text */}
        <div className="absolute top-10 left-0 w-full text-center pointer-events-none mix-blend-overlay opacity-20 z-10">
            <h2 className="font-serif italic text-[15vw] text-white leading-none tracking-tighter">The Rituals</h2>
        </div>

      </section>
    </>
  );
}
