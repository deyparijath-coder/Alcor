export default function Footer() {
  return (
    <footer className="mt-6 flex flex-col px-12 md:px-24 py-12 border-t border-white/5 opacity-50 bg-obsidian">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-8">
        <div className="flex flex-col gap-2">
          <div className="text-[10px] uppercase tracking-[0.4em] font-display font-medium text-gold font-bold">ALCOR</div>
          <div className="text-[10px] uppercase tracking-widest font-display text-gray-500">© 2024 Alcor Culinary Group</div>
        </div>
        
        <div className="flex gap-8 text-[10px] uppercase tracking-widest font-display">
          <a href="#" className="hover:text-gold transition-colors">Private Events</a>
          <a href="#" className="hover:text-gold transition-colors">Gift Cards</a>
          <a href="#" className="hover:text-gold transition-colors">Press Kit</a>
        </div>

        <div className="flex gap-4">
          <div className="w-5 h-5 border border-white/30 rounded-full flex items-center justify-center hover:border-gold transition-colors cursor-pointer">
            <span className="text-[8px]">IG</span>
          </div>
          <div className="w-5 h-5 border border-white/30 rounded-full flex items-center justify-center hover:border-gold transition-colors cursor-pointer">
            <span className="text-[8px]">FB</span>
          </div>
        </div>
      </div>
      
      <div className="w-full h-px bg-white/5 mb-8" />
      
      <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.3em] font-display text-gray-600">
        <div className="flex gap-6">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Careers</a>
        </div>
        <div>Crafted for the Celestial</div>
      </div>
    </footer>
  );
}
