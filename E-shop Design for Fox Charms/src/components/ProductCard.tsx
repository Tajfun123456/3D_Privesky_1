import { ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import type { ProductType, PageType } from '../App';

interface Product {
  id: ProductType;
  name: string;
  subtitle?: string;
  price: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onNavigate: (page: PageType, product?: ProductType) => void;
  onAddToCart: (productType: ProductType, quantity: number) => void;
}

export default function ProductCard({ product, onNavigate, onAddToCart }: ProductCardProps) {
  return (
    <div className="group cursor-pointer" onClick={() => onNavigate('product', product.id)}>
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      <div className="space-y-2">
        <div>
          <h3 className="text-lg">
            {product.name}
          </h3>
          {product.subtitle && (
            <p className="text-sm text-gray-600">{product.subtitle}</p>
          )}
        </div>
        <p className="text-xl">
          {product.price}
        </p>
        
        <Button 
          className="w-full bg-black hover:bg-black/90"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product.id, 1);
          }}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Přidat do košíku
        </Button>
      </div>
    </div>
  );
}