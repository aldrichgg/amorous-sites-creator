
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import Steps from '../components/Steps';
import PricingPlans from '../components/PricingPlans';
import { FlipWords } from '../components/ui/flip-words';

const Index = () => {
  const flipWords = ["seus momentos", "suas memórias", "suas experiências"];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        
        <section className="py-12 sm:py-16 md:py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                Crie uma memória <span className="text-gradient">em 4 etapas!</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto px-4">
                Surpreenda alguém especial com uma memória personalizada. É fácil, seguro e rápido!
              </p>
            </div>
            
            <Steps />
            
            <div className="mt-10 md:mt-16 text-center">
              <Link to="/create" className="btn-gradient text-white font-medium rounded-full py-2.5 sm:py-3 px-6 sm:px-8 inline-block transition-all duration-300 hover:shadow-lg">
                Criar site
              </Link>
            </div>
          </div>
        </section>
        
        <PricingPlans />
        
        <section className="py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-memred/10 to-black pointer-events-none"></div>
          
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-memred to-memred-light rounded-3xl blur opacity-50"></div>
                  <div className="relative rounded-3xl overflow-hidden">
                    {/* Content here if needed */}
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center lg:text-left">
                  Personalize <FlipWords words={flipWords} className="text-gradient ml-2" />
                </h2>
                <p className="text-gray-300 mb-6 text-center lg:text-left">
                  Preencha o formulário, receba seu site único e um QR Code para compartilhar.
                  Adicione imagens, mensagens e um contador dinâmico para tornar o presente ainda mais especial.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-memred/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-memred">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Escolha entre diferentes planos para suas necessidades</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-memred/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-memred">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Upload fácil de fotos e personalização completa</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-memred/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-memred">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Compartilhe instantaneamente via QR Code ou link</span>
                  </li>
                </ul>
                <div className="text-center lg:text-left">
                  <Link to="/pricing" className="btn-gradient text-white font-medium rounded-full py-2.5 sm:py-3 px-6 sm:px-8 inline-block transition-all duration-300 hover:shadow-lg">
                    Ver preços
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden">
          <div className="container mx-auto text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-8">
              Pronto para criar sua memória?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6 md:mb-10">
              Em apenas alguns cliques, você pode criar uma memória especial para compartilhar com quem você ama.
            </p>
            <Link to="/create" className="btn-gradient text-white font-bold rounded-full py-3 sm:py-4 px-8 sm:px-10 inline-block text-base sm:text-lg transition-all duration-300 hover:shadow-lg">
              Criar site agora
            </Link>
          </div>
          
          <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-t from-memred/20 to-transparent rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
