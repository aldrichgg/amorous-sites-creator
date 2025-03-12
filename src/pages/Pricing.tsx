
import { useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import PricingTabs from '../components/PricingCard';

const Pricing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nossos Preços
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Escolha o plano para criar sua memória.
              Você pode escolher entre os planos abaixo.
            </p>
          </div>
          
          <PricingTabs />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
