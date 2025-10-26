import { Button } from './ui/button';
import ProductCard from './ProductCard';
import { Package, Award, Printer } from 'lucide-react';
import type { ProductType } from '../App';
import foxForestImage from 'figma:asset/a1ec53a3dc22b3715e74500b1f6a844e6debbda3.png';
import foxKeysImage from 'figma:asset/f0c54bf4e7e103a1d45d38abed79cc363b2c61a9.png';
import foxCloseupImage from 'figma:asset/232414db338099b3b4ea915120ea0821dfefb71a.png';
import dogChristmasImage from 'figma:asset/0afef6041cc63a4e66a625d269b5abe1cc100092.png';
import dogBackpackImage from 'figma:asset/d78b1754e96e4bd7102fa187edb575662b246313.png';
import dogDoorImage from 'figma:asset/62968ca551d390f4a691091f361e3cefa58fc0b9.png';

interface HomePageProps {
  onNavigate: (page: 'home' | 'product' | 'contact', product?: ProductType) => void;
  onAddToCart: (productType: ProductType, quantity: number) => void;
}

export default function HomePage({ onNavigate, onAddToCart }: HomePageProps) {
  const products = [
    {
      id: 'fox' as ProductType,
      name: 'Přívěsek Liška',
      subtitle: 'Tri-Color',
      price: '59 Kč',
      image: foxForestImage,
    },
    {
      id: 'dog' as ProductType,
      name: 'Přívěsek Pes',
      subtitle: 'Německý ovčák',
      price: '59 Kč',
      image: dogChristmasImage,
    },
  ];

  const techFeatures = [
    {
      icon: Package,
      title: 'Materiál PLA',
      description: 'Ekologický a pevný bioplast',
    },
    {
      icon: Award,
      title: 'Odolný a Lehký',
      description: 'Dlouhá životnost přívěsku',
    },
    {
      icon: Printer,
      title: 'Český Design',
      description: 'Vyrobeno s precizností v ČR',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl">
                Precizní design. Cena, co potěší.
              </h1>
              <p className="text-xl opacity-90">
                Objevte 3D tištěné přívěsky s propracovanými detaily. Jednotná cena 59 Kč.
              </p>
              <Button 
                onClick={() => onNavigate('product', 'dog')}
                size="lg" 
                className="bg-white text-black hover:bg-white/90"
              >
                Koupit za 59 Kč
              </Button>
            </div>
            <div className="relative h-[400px] md:h-[500px]">
              <img 
                src={dogChristmasImage} 
                alt="3D tištěný přívěsek pes" 
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Collection */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl mb-4">
            Naše stálá nabídka a novinky
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Každý přívěsek je vyroben s maximální péčí o detail pomocí pokročilé technologie 3D tisku.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onNavigate={onNavigate}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>

      {/* 3D Technology Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl mb-4">
              Kvalita z PLA filamentu
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tiskneme z PLA, ekologického, pevného a lehkého materiálu, který garantuje 
              dlouhou životnost přívěsku. PLA je biologicky odbouratelný bioplast vyrobený 
              z přírodních zdrojů.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              className="border-black hover:bg-black hover:text-white"
              onClick={() => onNavigate('printing')}
            >
              Více o Výrobě
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl mb-4">
            Doporučují Zákazníci
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-6 h-6 fill-black" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-xl">4.9/5</span>
          </div>
          <p className="text-gray-600 italic max-w-2xl mx-auto">
            "Za tuhle cenu naprostá bomba! Kvalita 3D tisku je skvělá, materiál je příjemný a odolný. 
            Koupila jsem lišku i psa a oba vypadají úžasně na batohu."
          </p>
          <p className="text-sm text-gray-500 mt-2">– Tereza N., Ověřený zákazník</p>
        </div>

        <div className="text-center mt-8 mb-8">
          <p className="text-lg mb-2">Sdílejte s námi!</p>
          <p className="text-gray-600">#3DPrivesky #LiskaDesign</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[foxForestImage, dogBackpackImage, foxKeysImage, dogDoorImage, foxCloseupImage, dogChristmasImage].map((img, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg">
              <img 
                src={img} 
                alt={`Fotka zákazníka ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl mb-4">
              Sledujte Novinky a Akce
            </h2>
            <p className="text-gray-600 mb-6">
              Přihlaste se k odběru a buďte první, kdo se dozví o nových produktech a speciálních nabídkách.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Váš email"
                className="flex-1 px-4 py-3 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <Button className="bg-black hover:bg-black/90 px-8">
                Odebírat
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}