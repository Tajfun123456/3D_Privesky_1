import { useState } from 'react';
import { MapPin, Search, Package, Home, Check, TruckIcon, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { CartItem, ProductType, PageType } from '../App';


interface CheckoutPageProps {
  onNavigate: (page: PageType, product?: ProductType) => void;
  cart: CartItem[];
}

const PRODUCT_PRICE = 59;

// KONEČNÁ OPRAVA: Používá cesty ke složce public a koncovku .png (dle Vaší struktury souborů)
const productData = {
  fox: {
    name: 'Přívěsek Liška',
    // Cesta do složky /public/Liška_v_lese_1.png
    image: '/Liška_v_lese_1.png',  
  },
  dog: {
    name: 'Přívěsek Pes',
    // Cesta do složky /public/Pes_Batoh.png
    image: '/Pes_Batoh.png',  
  },
};

type ShippingType = 'balikovna-address' | 'balikovna-box' | 'zasilkovna-address' | 'zasilkovna-box' | 'alza-box';

interface PickupPoint {
  id: string;
  name: string;
  address: string;
  distance: string;
  position: { top: string; left: string };
}

const mockPickupPoints: PickupPoint[] = [
  { 
    id: '1', 
    name: 'P10 - Vinohrady - Slovenská (TJ Bohemians)', 
    address: 'Slovenská 222/5, 10100 Praha 10', 
    distance: '0.5 km',
    position: { top: '25%', left: '35%' }
  },
  { 
    id: '2', 
    name: 'P1 - Václavské náměstí - Metro Muzeum', 
    address: 'Václavské náměstí 56, 11000 Praha 1', 
    distance: '1.2 km',
    position: { top: '50%', left: '50%' }
  },
  { 
    id: '3', 
    name: 'P2 - Karlovo náměstí - Novoměstská radnice', 
    address: 'Karlovo náměstí 23, 12000 Praha 2', 
    distance: '1.8 km',
    position: { top: '65%', left: '65%' }
  },
];

export default function CheckoutPage({ onNavigate, cart }: CheckoutPageProps) {
  const [shippingType, setShippingType] = useState<ShippingType>('balikovna-box');
  const [selectedPickupPoint, setSelectedPickupPoint] = useState<string>('');
  const [hoveredMapPoint, setHoveredMapPoint] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPickupPoints, setShowPickupPoints] = useState(false);
  const [sortBy, setSortBy] = useState<'nearest' | 'list'>('nearest');

  const [addressData, setAddressData] = useState({
    street: '',
    city: '',
    postalCode: '',
    houseNumber: '',
  });

  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * PRODUCT_PRICE, 0);
  
  const shippingOptions = [
    { id: 'balikovna-address' as ShippingType, name: 'Balíkovna na adresu', price: 105, icon: Home, serviceIcon: '📦' },
    { id: 'balikovna-box' as ShippingType, name: 'Balíkovna do Balíkovny', price: 50, icon: Package, serviceIcon: '📦' },
    { id: 'zasilkovna-address' as ShippingType, name: 'Zásilkovna na adresu', price: 129, icon: Home, serviceIcon: '📮' },
    { id: 'zasilkovna-box' as ShippingType, name: 'Zásilkovna do Z-Boxu', price: 89, icon: Package, serviceIcon: '📮' },
    { id: 'alza-box' as ShippingType, name: 'Alza do AlzaBoxu', price: 50, icon: Package, serviceIcon: '🟢' },
  ];

  const selectedOption = shippingOptions.find(opt => opt.id === shippingType);
  const isBoxDelivery = shippingType.includes('box');
  const isAddressDelivery = shippingType.includes('address');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowPickupPoints(true);
    }
  };

  const handlePickupPointSelect = (pointId: string) => {
    setSelectedPickupPoint(pointId);
  };

  const handleContinue = () => {
    if (isBoxDelivery && !selectedPickupPoint) {
      alert('Prosím vyberte výdejní místo');
      return;
    }
    if (isAddressDelivery && (!addressData.street || !addressData.city || !addressData.postalCode)) {
      alert('Prosím vyplňte všechny adresní údaje');
      return;
    }
    alert('Pokračování k platbě...');
  };

  const sortedPickupPoints = sortBy === 'nearest' 
    ? [...mockPickupPoints].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    : mockPickupPoints;

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl text-center">
            Doprava a Platba
          </h1>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Shipping Options */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl mb-6">Vyberte způsob dopravy</h2>
              
              <RadioGroup value={shippingType} onValueChange={(value) => {
                setShippingType(value as ShippingType);
                setShowPickupPoints(false);
                setSelectedPickupPoint('');
              }}>
                <div className="space-y-3">
                  {shippingOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <div
                        key={option.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          shippingType === option.id ? 'border-black bg-gray-50' : 'border-black/20 hover:border-black/40'
                        }`}
                        onClick={() => {
                          setShippingType(option.id);
                          setShowPickupPoints(false);
                          setSelectedPickupPoint('');
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <Icon className="w-5 h-5" />
                          <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <span>{option.name}</span>
                              <span>{option.price} Kč</span>
                            </div>
                          </Label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </RadioGroup>
            </div>

            {/* Address Form (for address delivery) */}
            {isAddressDelivery && (
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="text-xl mb-4">Doručovací adresa</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Město</Label>
                    <Input
                      id="city"
                      placeholder="Praha"
                      value={addressData.city}
                      onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">PSČ</Label>
                    <Input
                      id="postalCode"
                      placeholder="110 00"
                      value={addressData.postalCode}
                      onChange={(e) => setAddressData({ ...addressData, postalCode: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="street">Ulice</Label>
                    <Input
                      id="street"
                      placeholder="Václavské náměstí"
                      value={addressData.street}
                      onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="houseNumber">Číslo popisné</Label>
                    <Input
                      id="houseNumber"
                      placeholder="123"
                      value={addressData.houseNumber}
                      onChange={(e) => setAddressData({ ...addressData, houseNumber: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Box Selection - NEW LAYOUT (for box delivery) */}
            {isBoxDelivery && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl mb-6">Vyberte výdejní místo</h3>
                
                {/* 2 Column Layout: Left 40% / Right 60% */}
                <div className="grid grid-cols-5 gap-6">
                  {/* LEFT COLUMN (2/5) - Search & List */}
                  <div className="col-span-2 space-y-4">
                    {/* Search Input */}
                    <div>
                      <p className="text-sm mb-2">Vyhledat adresu nebo místo</p>
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            placeholder="Zadejte adresu nebo název boxu..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="pl-10 text-sm"
                          />
                        </div>
                        <Button onClick={handleSearch} className="bg-black hover:bg-black/90 px-4">
                          <Search className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Active Filters */}
                    {showPickupPoints && (
                      <>
                        <div className="bg-white rounded-lg p-4 border">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="text-3xl">{selectedOption?.serviceIcon}</div>
                            <div>
                              <p className="text-sm">Vybraná služba</p>
                              <p className="text-xs text-gray-600">{selectedOption?.name}</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 pt-3 border-t">
                            <Button
                              variant={sortBy === 'nearest' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setSortBy('nearest')}
                              className={sortBy === 'nearest' ? 'bg-black' : 'border-black/20'}
                            >
                              <Filter className="w-3 h-3 mr-1" />
                              Od nejbližšího
                            </Button>
                            <Button
                              variant={sortBy === 'list' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setSortBy('list')}
                              className={sortBy === 'list' ? 'bg-black' : 'border-black/20'}
                            >
                              Seznam boxů
                            </Button>
                          </div>
                        </div>

                        {/* List Results */}
                        <div className="space-y-2 max-h-[500px] overflow-y-auto">
                          <p className="text-sm text-gray-600">Nalezená výdejní místa ({sortedPickupPoints.length})</p>
                          {sortedPickupPoints.map((point) => (
                            <button
                              key={point.id}
                              onClick={() => handlePickupPointSelect(point.id)}
                              onMouseEnter={() => setHoveredMapPoint(point.id)}
                              onMouseLeave={() => setHoveredMapPoint('')}
                              className={`w-full text-left border rounded-lg p-3 transition-all ${
                                selectedPickupPoint === point.id
                                  ? 'border-black bg-black text-white'
                                  : hoveredMapPoint === point.id
                                  ? 'border-black/60 bg-gray-100'
                                  : 'border-black/20 hover:border-black/40 bg-white'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <div className="flex items-start gap-2 mb-1">
                                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                    <div>
                                      <p className="text-sm font-medium leading-tight">{point.name}</p>
                                      <p className={`text-xs mt-1 ${selectedPickupPoint === point.id ? 'text-white/80' : 'text-gray-600'}`}>
                                        {point.address}
                                      </p>
                                      <p className={`text-xs mt-1 flex items-center gap-1 ${selectedPickupPoint === point.id ? 'text-white/60' : 'text-gray-500'}`}>
                                        📍 {point.distance}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {selectedPickupPoint === point.id ? (
                                  <span className="text-xs bg-white text-black px-2 py-1 rounded">VYBRÁNO</span>
                                ) : (
                                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">ZDARMA</span>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* RIGHT COLUMN (3/5) - Interactive Map */}
                  <div className="col-span-3">
                    <p className="text-sm mb-2">Mapa výdejních míst</p>
                    {showPickupPoints ? (
                      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-200 border-2 border-black/10">
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                          alt="Mapa výdejních míst"
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Interactive Map Markers */}
                        {sortedPickupPoints.map((point, index) => (
                          <div
                            key={point.id}
                            style={{ top: point.position.top, left: point.position.left }}
                            className="absolute -translate-x-1/2 -translate-y-1/2"
                          >
                            {/* Marker Pin */}
                            <button
                              onClick={() => handlePickupPointSelect(point.id)}
                              onMouseEnter={() => setHoveredMapPoint(point.id)}
                              onMouseLeave={() => setHoveredMapPoint('')}
                              className={`relative transition-transform ${
                                selectedPickupPoint === point.id || hoveredMapPoint === point.id
                                  ? 'scale-125 z-20'
                                  : 'scale-100 z-10'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                                selectedPickupPoint === point.id
                                  ? 'bg-green-600 text-white ring-4 ring-green-600/30'
                                  : hoveredMapPoint === point.id
                                  ? 'bg-black text-white'
                                  : 'bg-red-600 text-white'
                              }`}>
                                {index + 1}
                              </div>
                            </button>

                            {/* Hover/Click Bubble */}
                            {(hoveredMapPoint === point.id || selectedPickupPoint === point.id) && (
                              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-xl border-2 border-black p-3 z-30">
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t-2 border-l-2 border-black rotate-45"></div>
                                <p className="font-medium text-sm mb-1">{point.name}</p>
                                <p className="text-xs text-gray-600 mb-2">{point.address}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">📍 {point.distance}</span>
                                  {selectedPickupPoint === point.id ? (
                                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded flex items-center gap-1">
                                      <Check className="w-3 h-3" />
                                      Vybráno
                                    </span>
                                  ) : (
                                    <Button
                                      size="sm"
                                      className="bg-black hover:bg-black/90 text-xs h-7"
                                      onClick={() => handlePickupPointSelect(point.id)}
                                    >
                                      Vybrat
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="aspect-square rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Zadejte adresu pro zobrazení mapy</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-2xl mb-6">Souhrn objednávky</h2>
              
              {/* Products */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                {cart.map((item) => {
                  const product = productData[item.productType];
                  return (
                    <div key={item.productType} className="flex gap-3">
                      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{product.name}</p>
                        <p className="text-sm text-gray-600">{item.quantity}× {PRODUCT_PRICE} Kč</p>
                      </div>
                      <p className="font-medium">{item.quantity * PRODUCT_PRICE} Kč</p>
                    </div>
                  );
                })}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mezisoučet</span>
                  <span>{totalPrice} Kč</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Doprava</span>
                  <span>{selectedOption?.price} Kč</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between mb-6">
                <span className="text-xl">Celkem</span>
                <span className="text-2xl">
                  {totalPrice + (selectedOption?.price || 0)} Kč
                </span>
              </div>

              {/* Continue Button */}
              <Button 
                size="lg" 
                className="w-full bg-black hover:bg-black/90"
                onClick={handleContinue}
              >
                Pokračovat k platbě
              </Button>

              <Button 
                size="lg" 
                variant="outline" 
                className="w-full border-black hover:bg-black hover:text-white mt-3"
                onClick={() => onNavigate('cart')}
              >
                Zpět do košíku
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}