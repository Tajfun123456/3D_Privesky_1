import { useState } from 'react';
import { ChevronRight, Minus, Plus, Star, Truck, Award, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import ProductCard from './ProductCard';
import type { ProductType } from '../App';
import foxForestImage from 'figma:asset/a1ec53a3dc22b3715e74500b1f6a844e6debbda3.png';
import foxKeysImage from 'figma:asset/f0c54bf4e7e103a1d45d38abed79cc363b2c61a9.png';
import foxCloseupImage from 'figma:asset/232414db338099b3b4ea915120ea0821dfefb71a.png';
import dogChristmasImage from 'figma:asset/0afef6041cc63a4e66a625d269b5abe1cc100092.png';
import dogBackpackImage from 'figma:asset/d78b1754e96e4bd7102fa187edb575662b246313.png';
import dogDoorImage from 'figma:asset/62968ca551d390f4a691091f361e3cefa58fc0b9.png';

interface ProductDetailPageProps {
  onNavigate: (page: 'home' | 'product' | 'contact', product?: ProductType) => void;
  productType: ProductType;
  onAddToCart: (productType: ProductType, quantity: number) => void;
}

const productData = {
  fox: {
    name: 'Přívěsek Liška (Tri-Color)',
    breadcrumb: 'Přívěsek Liška (Tri-Color)',
    description: 'Ikonický liščí design s výraznými barvami, tištěný moderní 3D technologií. Lehký a detailní přívěsek. Ideální pro klíče nebo batoh.',
    images: [foxForestImage, foxKeysImage, foxCloseupImage, foxForestImage],
    colors: 'Žlutá, červená, černá, bílá',
    reviews: [
      { name: 'Anna K.', rating: 5, text: 'Perfektní kvalita! Přívěsek je lehký, barvy jsou naprosto živé a detaily jsou neuvěřitelné. Nosím ho na batohu už měsíc a vypadá stále jako nový.', date: '15. 2. 2025' },
      { name: 'Lucie S.', rating: 4, text: 'Velmi roztomilý design a skvělé zpracování. Za 59 Kč naprosto super!', date: '5. 2. 2025' },
      { name: 'Martin V.', rating: 5, text: 'Jsem překvapený kvalitou 3D tisku. Detaily jsou precizní a materiál je opravdu odolný.', date: '1. 2. 2025' },
    ],
  },
  dog: {
    name: 'Přívěsek Pes (Německý ovčák)',
    breadcrumb: 'Přívěsek Pes (Německý ovčák)',
    description: 'Oblíbený motiv psa, tištěný na 3D tiskárně. Lehký a detailní přívěsek. Ideální pro klíče nebo batoh. Skvělý dárek pro milovníky psů.',
    images: [dogChristmasImage, dogBackpackImage, dogDoorImage, dogChristmasImage],
    colors: 'Černá, bílá',
    reviews: [
      { name: 'Petr M.', rating: 5, text: 'Koupil jsem jako dárek pro dceru a byla nadšená! Materiál je opravdu kvalitní a odolný. Rozhodně doporučuji.', date: '10. 2. 2025' },
      { name: 'Jana K.', rating: 5, text: 'Mám německého ovčáka a tento přívěsek je prostě dokonalý! Přesně zachycuje tu podobu.', date: '8. 2. 2025' },
      { name: 'Tomáš B.', rating: 5, text: 'Super cena, super kvalita. Koupil jsem si hned dva!', date: '3. 2. 2025' },
    ],
  },
};

export default function ProductDetailPage({ onNavigate, productType, onAddToCart }: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = productData[productType];
  const otherProduct: ProductType = productType === 'fox' ? 'dog' : 'fox';
  const otherProductData = productData[otherProduct];

  const relatedProducts = [
    {
      id: otherProduct,
      name: otherProductData.name,
      price: '59 Kč',
      image: otherProductData.images[0],
    },
  ];

  return (
    <div className="w-full">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button onClick={() => onNavigate('home')} className="hover:text-black">
            Domů
          </button>
          <ChevronRight className="w-4 h-4" />
          <button onClick={() => onNavigate('product', productType)} className="hover:text-black">
            Kolekce
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-black">{product.breadcrumb}</span>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Media Area */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover cursor-zoom-in"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`Detail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl mb-4">
                {product.name}
              </h1>
              <p className="text-3xl">
                59 Kč
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-black text-black" />
                ))}
              </div>
              <span className="text-sm text-gray-600">(4.9/5 · {product.reviews.length} hodnocení)</span>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                {product.description}
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Rozměry</p>
                    <p>6 × 3,5 cm</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Materiál</p>
                    <p>Vysoce odolný PLA filament</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Barvy</p>
                    <p>{product.colors}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Dostupnost</p>
                    <p className="text-green-600">Skladem</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <label className="block">Počet kusů</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-black/20 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="hover:bg-black/5"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-6">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="hover:bg-black/5"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button 
              size="lg" 
              className="w-full bg-black hover:bg-black/90"
              onClick={() => onAddToCart(productType, quantity)}
            >
              Přidat do košíku za 59 Kč
            </Button>

            {/* Guarantees */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5" />
                <span>Doprava ZDARMA nad 1000 Kč</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Award className="w-5 h-5" />
                <span>Garance 30 dní na vrácení</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-5 h-5" />
                <span>Česká výroba</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description & Reviews */}
      <div className="container mx-auto px-4 py-16 border-t">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="description">Popis</TabsTrigger>
            <TabsTrigger value="reviews">Hodnocení ({product.reviews.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-8">
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h3 className="text-2xl mb-3">O Produktu</h3>
                <p className="text-gray-600">
                  Naše 3D tištěné přívěsky kombinují moderní technologii s kreativním designem. 
                  Každý kousek je vyroben s mimořádnou péčí o detail pomocí nejmodernějších 3D tiskáren.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl mb-3">Materiál a Kvalita</h3>
                <p className="text-gray-600">
                  Tiskneme z PLA, ekologického, pevného a lehkého materiálu, který garantuje dlouhou 
                  životnost přívěsku. PLA je biologicky odbouratelný bioplast vyrobený z přírodních zdrojů. 
                  Materiál je odolný proti poškrábání a běžnému opotřebení. Přívěsek je lehký a pružný, 
                  takže nevadí ani při aktivním pohybu.
                </p>
              </div>

              <div>
                <h3 className="text-2xl mb-3">Péče o Produkt</h3>
                <p className="text-gray-600">
                  Přívěsek je možné čistit vlhkým hadříkem. Nevhodné do myčky nádobí. 
                  Materiál je vodovzdorný, ale dlouhodobému ponoření se doporučuje vyhnout.
                </p>
              </div>

              <div>
                <h3 className="text-2xl mb-3">Použití</h3>
                <p className="text-gray-600">
                  Ideální jako doplněk na batoh, tašku, klíče nebo peněženku. Díky kovové poutku 
                  je snadné připevnění kamkoliv. Perfektní jako dárek pro milovníky zvířat nebo 
                  jako originální doplněk pro každého.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-6 h-6 fill-black text-black" />
                    ))}
                  </div>
                  <span className="text-2xl">4.9/5</span>
                </div>
                <p className="text-gray-600">Na základě {product.reviews.length} hodnocení</p>
              </div>

              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-4">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-4 h-4 ${star <= review.rating ? 'fill-black text-black' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span>{review.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="container mx-auto px-4 py-16 border-t">
          <h2 className="text-3xl mb-8">
            Mohlo by se vám líbit
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard 
                key={relatedProduct.id} 
                product={relatedProduct} 
                onNavigate={onNavigate}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}