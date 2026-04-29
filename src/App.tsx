import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WineCellarPage from './pages/WineCellarPage';
import PageTransition from './components/PageTransition';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.5, // "Heavy" premium feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Synchronize ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(() => {});
    };
  }, []);

  // Handle anchor scrolling on route change or initial load
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  useGSAP(() => {
    // Global reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        y: 80,
        opacity: 0,
        duration: 1.4,
        ease: 'power4.out',
      });
    });
  }, { scope: scrollRef, dependencies: [location] });

  return (
    <div ref={scrollRef} className="relative w-full overflow-hidden bg-[#080808]">
      <Navbar />
      <PageTransition>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/wine" element={<WineCellarPage />} />
          </Routes>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
}
