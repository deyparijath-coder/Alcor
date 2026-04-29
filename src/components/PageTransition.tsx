import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const location = useLocation();
  const transitionRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setDisplayChildren(children);
        window.scrollTo(0, 0);
        // Reveal animation
        gsap.to(transitionRef.current, {
           opacity: 0,
           duration: 0.8,
           ease: 'power4.inOut',
           onComplete: () => {
             gsap.set(transitionRef.current, { display: 'none' });
             ScrollTrigger.refresh();
           }
        });
      }
    });

    // Page Exit Animation (Cover)
    gsap.set(transitionRef.current, { display: 'block', opacity: 0, y: '100%' });
    tl.to(transitionRef.current, {
      opacity: 1,
      y: '0%',
      duration: 1.0,
      ease: 'power4.inOut'
    });

  }, [location, children]);

  return (
    <>
      <div 
        ref={transitionRef} 
        className="fixed inset-0 z-[100] bg-[#C5A059] pointer-events-none hidden"
        style={{ transform: 'translateY(100%)' }}
      >
        <div className="flex h-full w-full items-center justify-center">
            <span className="text-black font-serif text-4xl tracking-widest uppercase">Alcor</span>
        </div>
      </div>
      {displayChildren}
    </>
  );
}
