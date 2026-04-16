'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function OurStoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPinRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !leftPinRef.current || !rightScrollRef.current) return;

    // Pin the left side while the right side scrolls
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: leftPinRef.current,
        pinSpacing: false,
      });

      // Simple stagger fade ins for paragraphs
      const paragraphs = rightScrollRef.current!.querySelectorAll('p, h2, h3, .divider');
      paragraphs.forEach((p) => {
        gsap.fromTo(p, 
          { opacity: 0, y: 40 },
          {
            opacity: 1, 
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: p,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="bg-[#E5E0FF] min-h-screen text-[#1E1B4B] font-sans pb-32">
      
      {/* Massive Hero Header */}
      <div className="w-full h-[80vh] flex flex-col justify-end px-8 md:px-16 pb-16 relative">
        <h4 className="text-xs md:text-sm tracking-[0.4em] uppercase opacity-50 mb-6">The Genesis</h4>
        <h1 className="font-serif italic text-6xl md:text-[8rem] lg:text-[11rem] leading-[0.8] tracking-tighter">
          Own 
          <br className="block md:hidden"/> The Energy.
        </h1>
      </div>

      {/* Split Screen Container */}
      <div ref={containerRef} className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row relative px-8 md:px-16">
        
        {/* Left Side (Pinned on Desktop) */}
        <div 
          ref={leftPinRef} 
          className="w-full lg:w-[45%] lg:h-screen flex flex-col justify-center items-start lg:pr-16 relative"
        >
          {/* Abstract Floating CSS Blob Graphic */}
          <div className="w-full max-w-[400px] aspect-square relative mb-12 lg:mb-0 lg:ml-8 mx-auto lg:mx-0 mix-blend-multiply opacity-80 pointer-events-none drop-shadow-[0_30px_50px_rgba(0,0,0,0.15)]">
            <div 
              className="absolute inset-0 bg-gradient-to-br from-[#1E1B4B] to-[#7286D3] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-spin-slow rotate-45"
            />
            <div 
              className="absolute inset-[10%] bg-gradient-to-tl from-[#C20054] to-[#FFB6C1] mix-blend-overlay rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-spin-slow-reverse"
            />
          </div>

          <p className="hidden lg:block absolute bottom-12 left-8 text-xs tracking-[0.2em] font-medium uppercase opacity-40 max-w-[250px] leading-relaxed">
            The intersection of high fashion and absolute nourishment.
          </p>
        </div>

        {/* Right Side (Scrolling Editorial Content) */}
        <div ref={rightScrollRef} className="w-full lg:w-[55%] flex flex-col lg:pt-32 lg:pb-[50vh]">
          
          <div className="max-w-xl flex flex-col pb-32">
            <h2 className="font-serif italic text-5xl md:text-6xl mb-12">More than a ritual. A reclaiming of space.</h2>
            
            <p className="text-lg md:text-2xl font-light leading-relaxed mb-8 opacity-90">
              OWN was born not from a desire to create another body wash, but to engineer an experience. We looked at the clinical starkness of modern skincare and asked: Where is the romance? Where is the friction, the fashion, and the sheer audacity of bathing?
            </p>
            
            <p className="text-lg md:text-2xl font-light leading-relaxed mb-16 opacity-75 mix-blend-color-burn">
              The shower is the only place left where the digital world cannot reach you. It is your sanctuary. We formulated our products to ensure that when you step out of the steam, you step into exactly who you are meant to be.
            </p>

            <div className="divider w-full h-px bg-[#1E1B4B]/20 mb-16" />

            <h3 className="font-sans text-sm tracking-[0.3em] font-bold uppercase mb-8">Sensory Architecture</h3>
            <h2 className="font-serif italic text-5xl md:text-6xl mb-12">The science of the lingering note.</h2>
            
            <p className="text-lg md:text-2xl font-light leading-relaxed mb-8 opacity-90">
              Scent is deeply tied to memory and presence. We utilized advanced fragrance encapsulation techniques alongside skin-mimicking lipids. This means our bold, unapologetic notes of Dark Cherry and Liquid Amber don't wash down the drain—they anchor themselves to your skin barrier.
            </p>

            <p className="text-lg md:text-2xl font-light leading-relaxed mb-16 opacity-75 mix-blend-color-burn">
              You are not just washing away the day; you are layering a sophisticated, complex parfum profile tailored for the intimate radius of the skin.
            </p>

            <div className="divider w-full h-px bg-[#1E1B4B]/20 mb-16" />
            
            <h2 className="font-serif italic text-[5rem] md:text-[7rem] leading-[0.8] mb-12 tracking-tighter">You are the <br/> Main Character.</h2>
            <p className="text-lg md:text-2xl font-light leading-relaxed opacity-90">
              Whether you are preparing for a night that belongs entirely to you, soaking in the afterglow of midnight conversations, or simply standing under hot water reclaiming your mind—OWN is the scent of your defining moments.
            </p>

          </div>

        </div>
      </div>

    </div>
  );
}
