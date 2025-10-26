import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import type { ProductType, PageType } from '../App';

interface ContactPageProps {
  onNavigate: (page: PageType, product?: ProductType) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Prosím vyplňte všechna pole');
      return;
    }
    
    toast.success('Děkujeme! Váš dotaz byl odeslán. Odpovíme co nejdříve.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl mb-4">
            Kontaktujte Nás
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Máte dotaz nebo speciální požadavek? Rádi vám pomůžeme!
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <div>
            <h2 className="text-3xl mb-6">
              Napište nám
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2">
                  Jméno
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Vaše jméno"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2">
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vas@email.cz"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2">
                  Zpráva
                </label>
                <Textarea
                  id="message"
                  placeholder="Váš dotaz nebo zpráva..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full"
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-black hover:bg-black/90">
                <Send className="w-4 h-4 mr-2" />
                Odeslat Dotaz
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl mb-6">
                Přímé Kontakty
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1">E-mail</h3>
                    <a 
                      href="mailto:sf.simonflorian@gmail.com" 
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      sf.simonflorian@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="text-xl">Často kladené dotazy</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium mb-1">Jak dlouho trvá dodání?</p>
                  <p className="text-gray-600">Standardní dodací lhůta je 1-3 pracovní dny.</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Mohu vrátit zboží?</p>
                  <p className="text-gray-600">Ano, máte garance 30 dní na vrácení.</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Vyrábíte i jiné motivy?</p>
                  <p className="text-gray-600">Ano! Napište nám svůj nápad a rádi připravíme cenovou nabídku.</p>
                </div>
              </div>
            </div>

            <div className="bg-black text-white p-6 rounded-lg">
              <h3 className="text-xl mb-3">Česká výroba</h3>
              <p className="text-sm opacity-90">
                Všechny naše přívěsky vyrábíme přímo v České republice s použitím 
                nejmodernější 3D tiskové technologie a ekologických PLA materiálů.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">
            Máte zájem o naše produkty?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Prohlédněte si naši kolekci 3D tištěných přívěsků
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