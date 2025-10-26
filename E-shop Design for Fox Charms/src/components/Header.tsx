import { Search, User, ShoppingBag, Truck } from 'lucide-react';
import { Button } from './ui/button';
import type { ProductType, PageType } from '../App';

interface HeaderProps {
  onNavigate: (page: PageType, product?: ProductType) => void;
  cartItemCount: number;
}

export default function Header({ onNavigate, cartItemCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Top Banner */}
      <div className="bg-black text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Truck className="w-4 h-4" />
            <span>Doprava ZDARMA nad 1000 Kč!</span>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="border-b border-black/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <span className="text-white">🦊</span>
              </div>
              <span className="text-xl">3D PŘÍVĚSKY</span>
            </button>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => onNavigate('home')}
                className="hover:opacity-60 transition-opacity"
              >
                Domů
              </button>
              <button 
                onClick={() => onNavigate('product', 'fox')}
                className="hover:opacity-60 transition-opacity"
              >
                Kolekce
              </button>
              <button 
                onClick={() => onNavigate('printing')}
                className="hover:opacity-60 transition-opacity"
              >
                3D Tisk & Kvalita
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="hover:opacity-60 transition-opacity"
              >
                Kontakt
              </button>
            </nav>
            
            {/* Icons */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hover:bg-black/5">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-black/5">
                <User className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-black/5 relative"
                onClick={() => onNavigate('cart')}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}