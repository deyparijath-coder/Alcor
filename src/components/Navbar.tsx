import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out',
      delay: 0.5,
    });
  }, { scope: navRef });

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 px-12 py-8 flex justify-between items-center bg-transparent backdrop-blur-[2px]"
      id="main-nav"
    >
      <div className="flex gap-10 text-[11px] uppercase tracking-[0.2em] font-display font-medium text-gold">
        <NavLink to="/#about" className={({isActive}) => `hover:text-white transition-colors duration-300 ${isActive ? 'text-white' : ''}`}>About</NavLink>
        <NavLink to="/about" className={({isActive}) => `hover:text-white transition-colors duration-300 ${isActive ? 'text-white' : ''}`}>Story</NavLink>
      </div>

      <NavLink to="/" className="flex flex-col items-center group">
        <h1 className="text-4xl font-serif tracking-[0.4em] text-gold leading-none group-hover:scale-105 transition-transform">ALCOR</h1>
        <span className="text-[9px] uppercase tracking-[0.5em] mt-1 opacity-60 text-cream">Restaurant & Bar</span>
      </NavLink>

      <div className="flex gap-10 text-[11px] uppercase tracking-[0.2em] font-display font-medium text-gold items-center">
        <NavLink to="/wine" className={({isActive}) => `hover:text-white transition-colors duration-300 ${isActive ? 'text-white' : ''}`}>Wine</NavLink>
        <NavLink to="/#contact" className="hover:text-white transition-colors duration-300">Contact</NavLink>
      </div>
    </nav>
  );
}
