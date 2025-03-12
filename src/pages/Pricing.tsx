
import { useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import PricingTabs from '../components/PricingCard';
import PromoBar from '../components/PromoBar';

const Pricing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <PromoBar />
      <Navbar />
      
      <main className="pt-40 pb-20 px-4">
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
          
          <div className="mt-16 max-w-3xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">Todos os planos incluem:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-memblue/20 flex items-center justify-center mr-3 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-memcyan">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">Página personalizada</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-memblue/20 flex items-center justify-center mr-3 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-memcyan">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">QR Code exclusivo</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-memblue/20 flex items-center justify-center mr-3 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-memcyan">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">Link compartilhável</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-memblue/20 flex items-center justify-center mr-3 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-memcyan">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">Hospedagem incluída</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
