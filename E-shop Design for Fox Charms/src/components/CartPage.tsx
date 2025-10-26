import { Minus, Plus, Trash2, ShoppingBag, Truck } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import type { CartItem, ProductType, PageType } from '../App';
import foxForestImage from 'figma:asset/a1ec53a3dc22b3715e74500b1f6a844e6debbda3.png';
import dogChristmasImage from 'figma:asset/0afef6041cc63a4e66a625d269b5abe1cc100092.png';

interface CartPageProps {
  onNavigate: (page: PageType, product?: ProductType) => void;
  cart: CartItem[];
  onUpdateQuantity: (productType: ProductType, quantity: number) => void;
  onRemove: (productType: ProductType) => void;
}

const PRODUCT_PRICE = 59;
const FREE_SHIPPING_THRESHOLD = 1000;

const productData = {
  fox: {
    name: 'Přívěsek Liška',
    subtitle: 'Tri-Color',
    image: foxForestImage,
  },
  dog: {
    name: 'Přívěsek Pes',
    subtitle: 'Německý ovčák',
    image: dogChristmasImage,
  },
};

export default function CartPage({ onNavigate, cart, onUpdateQuantity, onRemove }: CartPageProps) {
  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * PRODUCT_PRICE, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const progressPercentage = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);
  const hasFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl text-center">
            Nákupní Košík
          </h1>
        </div>
      </section>

      {/* Cart Content */}
      <section className="container mx-auto px-4 py-12">
        {cart.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-16">
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h2 className="text-3xl mb-4">Váš košík je prázdný</h2>
            <p className="text-gray-600 mb-8">
              Přidejte si nějaké krásné 3D tištěné přívěsky do košíku!
            </p>
            <Button 
              size="lg" 
              className="bg-black hover:bg-black/90"
              onClick={() => onNavigate('home')}
            >
              Prozkoumat Kolekci
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl mb-6">Produkty v košíku ({cart.length})</h2>
              
              {cart.map((item) => {
                const product = productData[item.productType];
                const itemTotal = item.quantity * PRODUCT_PRICE;
                
                return (
                  <div key={item.productType} className="bg-white border border-black/10 rounded-lg p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <button
                        onClick={() => onNavigate('product', item.productType)}
                        className="flex-shrink-0"
                      >
                        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </button>
                      
                      {/* Product Info */}
                      <div className="flex-1">
                        <button
                          onClick={() => onNavigate('product', item.productType)}
                          className="text-left"
                        >
                          <h3 className="text-lg mb-1 hover:opacity-60 transition-opacity">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600">{product.subtitle}</p>
                        </button>
                        
                        <div className="mt-4 flex items-center gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-black/20 rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onUpdateQuantity(item.productType, item.quantity - 1)}
                              className="hover:bg-black/5"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-4">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onUpdateQuantity(item.productType, item.quantity + 1)}
                              className="hover:bg-black/5"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          {/* Price */}
                          <div className="flex-1 text-right">
                            <p className="text-sm text-gray-600">
                              {item.quantity} × {PRODUCT_PRICE} Kč
                            </p>
                            <p className="text-xl">
                              {itemTotal} Kč
                            </p>
                          </div>
                          
                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onRemove(item.productType)}
                            className="hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl mb-6">Souhrn objednávky</h2>
                
                {/* Free Shipping Progress */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="w-5 h-5" />
                    {hasFreeShipping ? (
                      <span className="text-green-600">
                        Gratulujeme! Doprava zdarma!
                      </span>
                    ) : remainingForFreeShipping > 150 ? (
                      <span className="text-sm">
                        Zbývá {remainingForFreeShipping} Kč do dopravy zdarma!
                      </span>
                    ) : (
                      <span className="text-sm">
                        Zbývá jen {remainingForFreeShipping} Kč do dopravy zdarma!
                      </span>
                    )}
                  </div>
                  
                  <Progress 
                    value={progressPercentage} 
                    className={`h-3 ${hasFreeShipping ? '[&>div]:bg-green-600' : ''}`}
                  />
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mezisoučet</span>
                    <span>{totalPrice} Kč</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doprava</span>
                    <span>
                      {hasFreeShipping ? (
                        <span className="text-green-600">ZDARMA</span>
                      ) : (
                        '50 Kč'
                      )}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between mb-6">
                  <span className="text-xl">Celkem</span>
                  <span className="text-2xl">
                    {totalPrice + (hasFreeShipping ? 0 : 50)} Kč
                  </span>
                </div>

                {/* Checkout Button */}
                <Button 
                  size="lg" 
                  className="w-full bg-black hover:bg-black/90 mb-4"
                  onClick={() => onNavigate('checkout')}
                >
                  Pokračovat k dopravě a platbě
                </Button>

                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full border-black hover:bg-black hover:text-white"
                  onClick={() => onNavigate('home')}
                >
                  Pokračovat v nákupu
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}