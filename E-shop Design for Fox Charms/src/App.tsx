import { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProductDetailPage from './components/ProductDetailPage';
import ContactPage from './components/ContactPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import PrintingInfoPage from './components/PrintingInfoPage';
import Footer from './components/Footer';
import { toast } from 'sonner';

export type ProductType = 'fox' | 'dog';
export type PageType = 'home' | 'product' | 'contact' | 'cart' | 'checkout' | 'printing';

export interface CartItem {
  productType: ProductType;
  quantity: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProduct, setSelectedProduct] = useState<ProductType>('fox');
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleNavigate = (page: PageType, product?: ProductType) => {
    setCurrentPage(page);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const addToCart = (productType: ProductType, quantity: number) => {
    const existingItemIndex = cart.findIndex(item => item.productType === productType);
    
    if (existingItemIndex >= 0) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += quantity;
      setCart(newCart);
    } else {
      setCart([...cart, { productType, quantity }]);
    }
    
    const productName = productType === 'fox' ? 'Přívěsek Liška' : 'Přívěsek Pes';
    toast.success(`${productName} (${quantity}× 59 Kč) přidán do košíku!`);
  };

  const updateCartItemQuantity = (productType: ProductType, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.productType !== productType));
      return;
    }
    
    const existingItemIndex = cart.findIndex(item => item.productType === productType);
    if (existingItemIndex >= 0) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity = quantity;
      setCart(newCart);
    }
  };

  const removeFromCart = (productType: ProductType) => {
    setCart(cart.filter(item => item.productType !== productType));
    toast.success('Produkt odebrán z košíku');
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onNavigate={handleNavigate} cartItemCount={totalItems} />
      
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} onAddToCart={addToCart} />}
        {currentPage === 'product' && <ProductDetailPage onNavigate={handleNavigate} productType={selectedProduct} onAddToCart={addToCart} />}
        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
        {currentPage === 'cart' && <CartPage onNavigate={handleNavigate} cart={cart} onUpdateQuantity={updateCartItemQuantity} onRemove={removeFromCart} />}
        {currentPage === 'checkout' && <CheckoutPage onNavigate={handleNavigate} cart={cart} />}
        {currentPage === 'printing' && <PrintingInfoPage onNavigate={handleNavigate} />}
      </main>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}