import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Calendar, Users, Clock } from 'lucide-react';

export default function Reservation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '19:00',
    guests: '2'
  });

  useGSAP(() => {
    gsap.from('.reservation-content', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
      y: 80,
      opacity: 0,
      duration: 1.8,
      ease: 'power4.out',
    });
  }, { scope: sectionRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reservation Submitted:', formData);
    alert('Thank you for your interest. A specialist will contact you shortly.');
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 px-12 md:px-24 bg-obsidian"
      id="reservations"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4">
        {/* Reservation Bento Card */}
        <div className="col-span-12 md:col-span-8 bg-gold text-black rounded-lg p-12 flex flex-col justify-between shadow-2xl reveal">
          <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold font-display mb-12">Secure a Terrace</h3>
          
          <div>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-8">Experience the Alcor Atmosphere.</h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8 mb-8">
              <div className="col-span-2 border-b border-black/20 py-2 group">
                <label className="block text-[9px] uppercase font-bold font-display mb-1">Guest Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent outline-none text-xl placeholder-black/30 font-serif"
                  placeholder="Enter Name"
                />
              </div>

              <div className="border-b border-black/20 py-2">
                <label className="block text-[9px] uppercase font-bold font-display mb-1">Date</label>
                <input 
                  type="date" 
                  className="w-full bg-transparent outline-none text-sm font-display text-black"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div className="border-b border-black/20 py-2">
                <label className="block text-[9px] uppercase font-bold font-display mb-1">Guests</label>
                <select 
                  className="w-full bg-transparent outline-none text-sm font-display"
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                >
                  <option value="1">01</option>
                  <option value="2">02</option>
                  <option value="4">04</option>
                  <option value="6">06+</option>
                </select>
              </div>
            </form>
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-black text-gold text-xs uppercase tracking-[0.4em] font-bold hover:bg-zinc-900 transition-all font-display mt-8 shadow-xl"
          >
            Confirm Booking
          </button>
        </div>

        {/* Decorative Grid Cell */}
        <div className="hidden md:flex col-span-4 bento-card items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gold/10 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #C5A059 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
          <div className="z-10 text-center p-8">
            <span className="text-[9px] uppercase tracking-[0.5em] text-gold/60 font-display block mb-4">Availability</span>
            <div className="text-3xl font-serif text-white">4 Seats Remaining</div>
            <p className="text-[10px] text-gray-500 uppercase mt-4 tracking-widest font-display">Tonight at 20:30</p>
          </div>
        </div>
      </div>
    </section>
  );
}
