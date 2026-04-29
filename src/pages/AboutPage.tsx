import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Page entry transition
    gsap.from('.about-hero-title', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out',
      delay: 0.2
    });

    // Reveal animations for sections
    const reveals = gsap.utils.toArray<HTMLElement>('.about-reveal');
    reveals.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
      });
    });

    // Parallax for Heritage section
    gsap.to('.heritage-image', {
      scrollTrigger: {
        trigger: '.heritage-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      y: -100,
      ease: 'none'
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#080808] text-cream pt-24 min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1550966842-2b270743b27b?auto=format&fit=crop&q=80&w=2000" 
            alt="Alcor Dining Room" 
            className="w-full h-full object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/50 via-transparent to-[#080808]" />
        </div>
        <h1 className="about-hero-title relative z-10 text-5xl md:text-8xl font-serif text-[#C5A059] tracking-widest text-center px-4">
          The Soul of <br /> Obsidian Dining.
        </h1>
      </section>

      {/* 2. The Heritage Section */}
      <section className="heritage-section py-32 px-12 md:px-24 grid md:grid-cols-2 gap-20 items-center">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bento-card">
          <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200" 
            alt="Chef's Hands" 
            className="heritage-image absolute inset-0 w-full h-[120%] object-cover opacity-60"
          />
        </div>
        <div className="about-reveal flex flex-col gap-8">
          <h2 className="text-4xl md:text-6xl font-serif text-[#C5A059] leading-tight">
            Intimacy <br /> & Prestige.
          </h2>
          <div className="flex flex-col gap-6 text-gray-400 font-display text-lg leading-relaxed max-w-lg">
            <p>
              Born from the shadows of the culinary avant-garde, Alcor represents a departure from the traditional fine-dining theater. Founded on the principles of sensory isolation, we focus on the raw resonance of taste.
            </p>
            <p>
              Every dish is an extraction—a concentrated essence of season and source, presented with a minimalist precision that demands undivided attention.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The Atmosphere (Grid of Excellence) */}
      <section className="py-32 px-12 md:px-24 bg-[#050505]">
        <div className="text-center mb-20">
          <h2 className="about-reveal text-3xl md:text-5xl font-serif text-[#C5A059] tracking-widest uppercase">The Atmosphere</h2>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="about-reveal col-span-12 md:col-span-12 bento-card h-80 relative overflow-hidden">
             <img src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover opacity-40 hover:scale-105 transition-transform duration-700" alt="Interior texture" />
             <div className="absolute bottom-6 left-6 text-gold font-serif text-xl">Tactile Elegance</div>
          </div>
          <div className="about-reveal col-span-12 md:col-span-4 bento-card h-96">
            <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-40 hover:scale-105 transition-transform duration-700" alt="Cocktail texture" />
          </div>
          <div className="about-reveal col-span-12 md:col-span-8 bento-card h-96">
             <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-40 hover:scale-105 transition-transform duration-700" alt="Plating texture" />
          </div>
        </div>
      </section>

      {/* 4. Location/Contact Cards */}
      <section className="py-32 px-12 md:px-24">
         <div className="grid grid-cols-12 gap-8">
            <div className="about-reveal col-span-12 md:col-span-6 bento-card p-12 flex flex-col justify-between min-h-[400px]">
               <div>
                  <h3 className="text-[#C5A059] font-serif text-3xl mb-8">Visit the Observatory</h3>
                  <div className="text-gray-400 space-y-4 font-display">
                     <p>72nd Floor, Obsidian Plaza</p>
                     <p>Manhattan, NY 10001</p>
                  </div>
               </div>
               <div className="pt-12 border-t border-white/5">
                  <span className="text-gold text-[10px] tracking-[0.4em] uppercase">Private Entrance</span>
               </div>
            </div>
            <div className="about-reveal col-span-12 md:col-span-6 bg-[#C5A059] text-black rounded-lg p-12 flex flex-col justify-between min-h-[400px]">
               <div>
                  <h3 className="font-serif text-3xl mb-8">Dialogue</h3>
                  <div className="space-y-4 font-display font-medium">
                     <p>concierge@alcor-culinary.com</p>
                     <p>+1 (555) ALC-0R00</p>
                  </div>
               </div>
               <button className="w-full py-4 bg-black text-[#C5A059] uppercase tracking-widest font-bold text-sm hover:bg-zinc-900 transition-colors">
                  Inquire Now
               </button>
            </div>
         </div>
      </section>
    </div>
  );
}
