import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

const MENU_ITEMS = [
  {
    id: '01',
    title: 'Obsidian Scallop',
    altTitle: '32',
    description: 'Hokkaido diver scallop, oscietra caviar, smoked dashi emulsion.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800',
    tags: ['GF', 'SF']
  },
  {
    id: '02',
    title: 'A5 Canvas',
    altTitle: '85',
    description: 'Miyazaki wagyu, charcoal ash, fermented black garlic, wild onion.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    tags: ['GF']
  },
  {
    id: '03',
    title: 'Eclipse',
    altTitle: '24',
    description: 'Valrhona 80%, black truffle ice cream, gold leaf, midnight espresso.',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800',
    tags: []
  }
];

export default function Offerings() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gridRef.current?.children;
    if (!cards) return;

    gsap.from(cards, {
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 80%',
      },
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1.5,
      ease: 'power4.out',
    });

    // Parallax for card images
    if (cards) {
      Array.from(cards).forEach((card) => {
        const el = card as HTMLElement;
        const img = el.querySelector('.card-image');
        if (img) {
          gsap.to(img, {
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
            y: -40,
            ease: 'none',
          });
        }
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-16 px-12 md:px-24 bg-obsidian"
      id="menu"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4">
        {/* Featured Card */}
        <div className="col-span-12 md:col-span-7 bento-card relative overflow-hidden group aspect-[4/3] md:aspect-auto">
          <div className="absolute inset-x-0 -top-10 -bottom-10 bg-cover bg-center transition-transform duration-[3s] group-hover:scale-110 opacity-60"
               style={{ backgroundImage: `url(${MENU_ITEMS[1].image})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-12 flex flex-col justify-end">
            <h3 className="text-4xl font-serif text-white mb-2 reveal">Masterwork Selection</h3>
            <p className="text-sm text-gray-400 font-display max-w-sm reveal">Our seasonal tasting journey, curated nightly by the executive chef.</p>
          </div>
        </div>

        {/* List Card */}
        <div className="col-span-12 md:col-span-5 bento-card bg-zinc-dark p-10 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-gold font-display reveal">Curated Offerings</h3>
            <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all cursor-pointer">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <div ref={gridRef} className="space-y-8">
            {MENU_ITEMS.map((item) => (
              <div key={item.id} className="group cursor-pointer border-b border-white/5 pb-4">
                <div className="flex justify-between items-end">
                  <h4 className="font-serif text-xl text-white group-hover:text-gold transition-colors">{item.title}</h4>
                  <span className="text-gold font-display text-sm tracking-widest">${item.altTitle}</span>
                </div>
                <p className="text-[10px] text-gray-500 uppercase mt-2 tracking-[0.2em] font-display">
                  {item.description.split(',')[0]} / {item.description.split(',')[1]}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4 reveal">
            <div className="h-px flex-grow bg-white/10"></div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-gray-600 font-display">Full Tasting Menu Available</span>
            <div className="h-px flex-grow bg-white/10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
