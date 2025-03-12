
import { useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import FAQAccordion from '../components/FAQAccordion';
import PromoBar from '../components/PromoBar';

const FAQ = () => {
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
              Perguntas Frequentes (FAQ)
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Encontre respostas para as perguntas mais comuns sobre o Loveiit
            </p>
          </div>
          
          <FAQAccordion />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
