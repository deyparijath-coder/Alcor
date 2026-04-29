import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Left column image parallax
    gsap.to(imgRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
      y: -100,
      ease: 'none',
    });

    // Right column text parallax
    gsap.to(textRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
      y: -50,
      ease: 'none',
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative py-16 px-12 md:px-24 bg-obsidian"
      id="about"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4">
        {/* Review Card */}
        <div className="col-span-12 md:col-span-8 bento-card p-12 flex flex-col justify-center text-center">
          <p className="font-serif italic text-gray-400 text-2xl mb-6 reveal">
            "A sanctuary for those who appreciate the theater of fine dining."
          </p>
          <div className="text-[10px] uppercase tracking-[0.4em] text-gold font-display reveal">
            — MICHELIN GUIDE 2024
          </div>
        </div>

        {/* Location Card */}
        <div className="col-span-12 md:col-span-4 bento-card bg-zinc-dark flex items-center justify-center p-8">
          <div className="w-full h-full border border-dashed border-white/10 rounded flex flex-col items-center justify-center gap-4 reveal">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-display">Location</span>
            <span className="text-sm text-center font-display leading-loose">
              72nd Floor, Obsidian Plaza<br />
              Manhattan, NY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
