
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import Steps from '../components/Steps';

const HowItWorks = () => {
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
              Como Funciona
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Criar e compartilhar memórias nunca foi tão fácil
            </p>
          </div>
          
          <Steps />
          
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-memblue to-memcyan rounded-3xl blur opacity-50"></div>
              <div className="relative glass-card rounded-3xl p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <img 
                      src="/lovable-uploads/015a78b5-c0a0-435b-b89d-a831f5d038e0.png" 
                      alt="Memory example" 
                      className="w-full h-auto rounded-xl neon-glow"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                      Crie uma memória <span className="text-gradient">em 4 etapas!</span>
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Surpreenda alguém especial com uma memória personalizada. É fácil, seguro e rápido!
                    </p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-memblue/20 flex items-center justify-center mr-3 mt-1">
                          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-memcyan">
                            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="text-gray-300">Após o pagamento, receba imediatamente seu link e QR Code</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-memblue/20 flex items-center justify-center mr-3 mt-1">
                          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-memcyan">
                            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="text-gray-300">Personalize com fotos, mensagens e um contador dinâmico</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-memblue/20 flex items-center justify-center mr-3 mt-1">
                          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-memcyan">
                            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="text-gray-300">Compartilhe facilmente com quem você ama</span>
                      </li>
                    </ul>
                    <Link
                      to="/create"
                      className="btn-gradient text-white font-medium rounded-full py-3 px-8 inline-block transition-all duration-300 hover:shadow-lg"
                    >
                      Começar agora
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
