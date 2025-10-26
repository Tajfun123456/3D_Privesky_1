import { Instagram, Facebook, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import type { ProductType, PageType } from '../App';

interface FooterProps {
  onNavigate: (page: PageType, product?: ProductType) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span>🦊</span>
              </div>
              <span className="text-xl">3D PŘÍVĚSKY</span>
            </div>
            <p className="text-gray-400">
              Originální 3D tištěné přívěsky. Precizní design, česká výroba, jednotná cena 59 Kč.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg">Rychlé Odkazy</h3>
            <nav className="flex flex-col gap-2">
              <button 
                onClick={() => onNavigate('home')}
                className="text-gray-400 hover:text-white transition-colors text-left"
              >
                Domů
              </button>
              <button 
                onClick={() => onNavigate('product', 'fox')}
                className="text-gray-400 hover:text-white transition-colors text-left"
              >
                Kolekce
              </button>
              <button 
                onClick={() => onNavigate('printing')}
                className="text-gray-400 hover:text-white transition-colors text-left"
              >
                3D Tisk & Kvalita
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="text-gray-400 hover:text-white transition-colors text-left"
              >
                Kontakt
              </button>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg">Zákaznický Servis</h3>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Často kladené dotazy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Doprava a platba
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Reklamace a vrácení zboží
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Obchodní podmínky
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg">Kontaktujte Nás</h3>
            <p className="text-gray-400 text-sm">
              Email:{' '}
              <a 
                href="mailto:sf.simonflorian@gmail.com"
                className="hover:text-white transition-colors"
              >
                sf.simonflorian@gmail.com
              </a>
            </p>
            
            <div className="flex gap-3 pt-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© 2025 3D Přívěsky. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
}