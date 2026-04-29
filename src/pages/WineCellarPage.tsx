import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const WINE_CATEGORIES = [
  { id: 'vintage-reds', label: 'Vintage Reds' },
  { id: 'estate-whites', label: 'Estate Whites' },
  { id: 'champagne', label: 'Champagne' },
];

const WINE_DATA = {
  'vintage-reds': [
    {
      name: 'Château Margaux',
      vintage: '2015',
      region: 'Bordeaux, France',
      note: 'A masterpiece of balance and aromatic complexity, featuring deep notes of blackcurrant and violets.',
      image: 'https://i.postimg.cc/t4rt9K7p/Chateau-Margaux-wine.jpg',
    },
    {
      name: 'Screaming Eagle',
      vintage: '2018',
      region: 'Napa Valley, USA',
      note: 'Extraordinary depth with silky tannins. A rare expression of Oakville terroir.',
      image: 'https://i.postimg.cc/Kjxw610r/5-Standout-Alternatives-to-Screaming-Eagle-One-of-Napa-s-Most-Coveted-Cult-Wines.jpg',
    }
  ],
  'estate-whites': [
    {
      name: 'Domaine de la Romanée-Conti',
      vintage: '2014',
      region: 'Montrachet, France',
      note: 'The pinnacle of Chardonnay. Opulent yet structured with an eternal finish.',
      image: 'https://i.postimg.cc/DZrYP1rK/1990-Domaine-de-la-Romanee-Conti-Romanee-Conti-France-Burgundy-Cote-de-Nuits-Romanee-Conti-Grand.jpg',
    }
  ],
  'champagne': [
    {
      name: 'Krug Clos d\'Ambonnay',
      vintage: '2002',
      region: 'Champagne, France',
      note: 'A singular Pinot Noir expression. Intense, vibrant, and incredibly precise.',
      image: 'https://i.postimg.cc/SsbmK7Sc/on-Instagram-Krug-1996-the-last-wine-I-had-right-before-the-Covid-lockdown-which.jpg',
    }
  ]
};

export default function WineCellarPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Entry Curtain Effect
    const tl = gsap.timeline();
    tl.to(leftCurtainRef.current, {
      xPercent: -100,
      duration: 1.5,
      ease: 'power4.inOut'
    })
    .to(rightCurtainRef.current, {
      xPercent: 100,
      duration: 1.5,
      ease: 'power4.inOut'
    }, 0)
    .from('.wine-item', {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power4.out'
    }, '-=0.5');

    // 2. Parallax Bottle Effect
    const items = gsap.utils.toArray<HTMLElement>('.wine-item');
    items.forEach((item) => {
      const bottle = item.querySelector('.bottle-img');
      const text = item.querySelector('.wine-text');
      
      if (bottle && text) {
        gsap.to(bottle, {
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          y: -80,
          ease: 'none'
        });

        gsap.to(text, {
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          y: 40,
          ease: 'none'
        });
      }
    });

  }, { scope: containerRef });

  const scrollToSection = (id: string) => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: `#${id}`, offsetY: 100 },
      ease: 'power4.inOut'
    });
  };

  return (
    <div ref={containerRef} className="bg-obsidian min-h-screen relative font-sans">
      {/* Curtain Overlays */}
      <div ref={leftCurtainRef} className="fixed inset-y-0 left-0 w-1/2 bg-black z-[60] border-r border-gold/10" />
      <div ref={rightCurtainRef} className="fixed inset-y-0 right-0 w-1/2 bg-black z-[60] border-l border-gold/10" />

      {/* Sub Navigation */}
      <nav className="fixed top-28 left-0 w-full z-40 bg-obsidian/80 backdrop-blur-md py-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 flex justify-center gap-12">
          {WINE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToSection(cat.id)}
              className="text-[10px] uppercase tracking-[0.3em] font-display text-gold/60 hover:text-gold transition-colors"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div className="pt-48 pb-32 px-12 md:px-24">
        {Object.entries(WINE_DATA).map(([category, wines]) => (
          <section key={category} id={category} className="mb-32">
            <div className="mb-16 border-b border-gold/20 pb-4">
              <h2 className="text-3xl font-serif text-gold tracking-widest uppercase italic">
                {category.replace('-', ' ')}
              </h2>
            </div>

            <div className="space-y-48">
              {wines.map((wine, idx) => (
                <div 
                  key={wine.name} 
                  className={`wine-item grid md:grid-cols-2 gap-20 items-center ${idx % 2 !== 0 ? 'md:grid-flow-dense' : ''}`}
                >
                  {/* Bottle Side */}
                  <div className="relative group aspect-[2/3] md:aspect-[3/4] flex items-center justify-center overflow-hidden bento-card border-none bg-charcoal">
                    {/* Hover Aura */}
                    <div className="absolute inset-0 bg-gold/5 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 scale-150" />
                    
                    <img 
                      src={wine.image}
                      alt={wine.name}
                      className="bottle-img relative z-10 h-full w-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Text Side */}
                  <div className={`wine-text flex flex-col gap-8 ${idx % 2 !== 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="space-y-2">
                      <span className="text-gold font-display text-xs tracking-[0.4em] uppercase">{wine.vintage}</span>
                      <h3 className="text-5xl md:text-6xl font-serif text-white tracking-tight">{wine.name}</h3>
                      <p className="text-[#C5A059] font-display text-sm tracking-widest uppercase opacity-70">{wine.region}</p>
                    </div>

                    <p className="text-cream/60 italic font-serif text-lg leading-relaxed max-w-lg">
                      "{wine.note}"
                    </p>

                    <button className="group self-start flex items-center gap-4 px-8 py-4 border border-gold/30 rounded-full hover:bg-gold hover:text-obsidian transition-all duration-700">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-display font-medium">Add to Reservation</span>
                      <div className="p-2 bg-gold/10 group-hover:bg-obsidian/20 rounded-full transition-colors">
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
