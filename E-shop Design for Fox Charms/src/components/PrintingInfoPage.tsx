import { Button } from './ui/button';
import { Printer, Layers, Zap, Leaf, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { ProductType, PageType } from '../App';

interface PrintingInfoPageProps {
  onNavigate: (page: PageType, product?: ProductType) => void;
}

export default function PrintingInfoPage({ onNavigate }: PrintingInfoPageProps) {
  const processSteps = [
    {
      number: '01',
      title: '3D Model',
      description: 'Vytvoříme digitální model přívěsku v softwaru (např. Fusion 360, Blender). Každý detail je pečlivě navržen.',
    },
    {
      number: '02',
      title: 'Slicování',
      description: 'Model je "nakrájen" na stovky tenkých vrstev pomocí slicovacího softwaru Bambu Studio, který generuje instrukce pro tiskárnu.',
    },
    {
      number: '03',
      title: '3D Tisk',
      description: 'Tiskárna taví PLA filament a nanáší jej vrstvu po vrstvě podle přesných instrukcí. Tryska se pohybuje v X, Y a Z osách.',
    },
    {
      number: '04',
      title: 'Chlazení a Dokončení',
      description: 'Každá vrstva okamžitě chladne a tuhne. Po dokončení je přívěsek připraven k použití!',
    },
  ];

  const features = [
    {
      icon: Layers,
      title: 'Vrstvení po vrstvách',
      description: 'Přesnost až 0,1 mm na vrstvu pro dokonalé detaily',
    },
    {
      icon: Zap,
      title: 'Rychlá výroba',
      description: 'Jeden přívěsek je hotový za 15-30 minut',
    },
    {
      icon: Leaf,
      title: 'Ekologický PLA',
      description: 'Biologicky odbouratelný bioplast z kukuřice',
    },
  ];

  const printerSpecs = [
    { label: 'Tiskárna', value: 'Bambu Lab P1S' },
    { label: 'Tiskový objem', value: '256 × 256 × 256 mm' },
    { label: 'Přesnost vrstvy', value: '0,05 - 0,35 mm' },
    { label: 'Rychlost tisku', value: 'až 500 mm/s' },
    { label: 'Materiál', value: 'PLA, PETG, TPU, ABS' },
    { label: 'Vícebarevný tisk', value: 'Ano (s AMS)' },
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
            <Printer className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl md:text-6xl mb-4">
            Jak 3D Tisk Funguje
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Moderní technologie, která vyrábí naše přívěsky s neuvěřitelnou přesností
          </p>
        </div>
      </section>

      {/* What is 3D Printing */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl mb-4">
              Co je 3D Tisk?
            </h2>
            <p className="text-lg text-gray-600">
              3D tisk (aditivní výroba) je proces vytváření trojrozměrného fyzického objektu z digitálního modelu. 
              Na rozdíl od tradičních metod, kde se materiál odebírá (např. řezání), 3D tisk materiál 
              <strong> přidává, vrstvu po vrstvě</strong>.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl mb-4">
              Proces Výroby
            </h2>
            <p className="text-lg text-gray-600">
              Od digitálního modelu k fyzickému přívěsku
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bambu Lab P1S */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl mb-4">
              Tiskárna Bambu Lab P1S
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Používáme profesionální 3D tiskárnu Bambu Lab P1S, která je známá svou vysokou rychlostí, 
              spolehlivostí a možností vícebarevného tisku díky systému AMS (Automatic Material System).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Printer Images */}
            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1758387836566-6a342434f5b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMHByaW50ZXIlMjB0ZWNobm9sb2d5JTIwbWFudWZhY3R1cmluZ3xlbnwxfHx8fDE3NjAyODI5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="3D tiskárna v práci"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-600 text-center">
                3D tiskárna během výroby
              </p>
            </div>

            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1739169169463-450148af26ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMHByaW50ZXIlMjBmaWxhbWVudCUyMHNwb29sfGVufDF8fHx8MTc2MDI4MjkzMnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="PLA filament"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-600 text-center">
                PLA filament v různých barvách
              </p>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl mb-6">
              Technické Specifikace
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {printerSpecs.map((spec, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-gray-600">{spec.label}:</span>{' '}
                    <span>{spec.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PLA Material */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
              <Leaf className="w-10 h-10 text-black" />
            </div>
            <h2 className="text-3xl md:text-5xl mb-6">
              Proč PLA Filament?
            </h2>
            <div className="text-lg opacity-90 space-y-4">
              <p>
                PLA (kyselina polymléčná) je <strong>ekologický bioplast</strong> vyrobený z přírodních 
                zdrojů jako je kukuřičný škrob nebo cukrová třtina. Je <strong>biologicky odbouratelný</strong> 
                a při výrobě produkuje nižší emise než klasty plasty.
              </p>
              <p>
                PLA je <strong>pevný, lehký a bezpečný</strong>. Díky nízkému bodu tání je ideální 
                pro přesný 3D tisk s minimálním deformacemi. Naše přívěsky z PLA vydrží běžné 
                používání a zachovají si živé barvy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-4">
            Přesvědčte se sami o kvalitě 3D tisku
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Každý přívěsek je vyroben s maximální péčí o detail
          </p>
          <Button 
            size="lg" 
            className="bg-black hover:bg-black/90"
            onClick={() => onNavigate('home')}
          >
            Prozkoumat Kolekci
          </Button>
        </div>
      </section>
    </div>
  );
}
