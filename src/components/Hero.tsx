import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    // Parallax effect for background
    gsap.to(bgRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: '30%',
      ease: 'none',
    });

    // Content animations
    const tl = gsap.timeline({ delay: 1 });
    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.8,
      ease: 'power4.out',
    })
    .from(subRef.current, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    }, '-=1.2');

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] flex items-center justify-center pt-32 pb-16 px-12 overflow-hidden bg-obsidian"
      id="hero"
    >
      <div className="w-full max-w-7xl h-full grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-12 relative overflow-hidden rounded-lg border border-gold/20 bg-charcoal aspect-[16/7]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
          
          <div
            ref={bgRef}
            className="absolute inset-x-0 -top-20 -bottom-20 bg-cover bg-center opacity-40 grayscale-[0.5]"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000")',
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-80 border border-gold/30 rotate-3 opacity-20"></div>
            <div className="w-64 h-80 border border-gold/30 -rotate-3 opacity-20 absolute"></div>
            <div className="z-20 text-center">
              <span className="text-gold italic font-serif text-xl tracking-widest">The Signature Pour</span>
            </div>
          </div>

          <div className="absolute bottom-12 left-12 z-20">
            <h1
              ref={titleRef}
              className="text-5xl md:text-6xl font-serif text-white leading-tight mb-4"
            >
              Rooted in Intimacy <br />
              <span className="text-gold italic font-light italic">and Prestige.</span>
            </h1>
            <p
              ref={subRef}
              className="max-w-md text-sm text-gray-400 leading-relaxed font-display"
            >
              An immersive dining experience where culinary precision meets architectural elegance. Every plate tells a story of origin and craft.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
