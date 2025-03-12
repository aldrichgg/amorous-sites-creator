import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="min-h-[calc(100vh-40px)] bg-black bg-mesh relative flex flex-col justify-center items-center overflow-hidden">
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <div className="flex items-center">
              <button className="bg-memblue/20 backdrop-blur-sm rounded-full text-white px-4 py-1 text-sm">
                Buscar memórias
              </button>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Personalize <br />
            <span className="text-gradient animate-text-shimmer bg-[length:200%_auto]">suas memórias</span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl mb-8">
            Preencha o formulário, receba seu site único e um QR Code para compartilhar.
            Adicione imagens, mensagens e um contador dinâmico para tornar o presente ainda mais especial. ✨
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative group w-full sm:w-auto">
              <div className="absolute inset-0 btn-gradient rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <Link to="/create" className="relative w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-memblue to-memcyan hover:from-memblue-dark hover:to-memcyan-dark text-white font-medium rounded-full px-8 py-3 text-lg transition-all duration-300">
                Começar <ChevronRight size={20} className="ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="mt-10 flex flex-col items-center">
            <div className="flex -space-x-2 mb-2">
              {[1, 2, 3, 4, 5, 6].map(id => <div key={id} className="w-8 h-8 rounded-full border-2 border-black overflow-hidden">
                  <img src={`https://randomuser.me/api/portraits/men/${20 + id}.jpg`} alt="User avatar" className="w-full h-full object-cover" />
                </div>)}
            </div>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map(id => <Star key={id} size={16} className="text-yellow-400 fill-yellow-400" />)}
              <span className="ml-2 text-white font-medium">1730 memórias eternizadas</span>
            </div>
          </div>
        </div>
        
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-memblue to-memcyan rounded-2xl blur opacity-75 animate-pulse-soft"></div>
          <div className="relative bg-black rounded-2xl overflow-hidden">
            
            
            <div className="absolute bottom-0 left-0 right-0 text-center pb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Crie uma memória <br />em 4 etapas!</h2>
              <p className="text-gray-300 mx-auto max-w-md px-4">
                Surpreenda alguém especial com uma memória personalizada. É fácil, seguro e rápido!
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-80 pointer-events-none"></div>
      
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-memblue/20 rounded-full blur-3xl animate-float" style={{
      animationDelay: '0s'
    }}></div>
      <div className="absolute bottom-1/3 right-10 w-32 h-32 bg-memcyan/20 rounded-full blur-3xl animate-float" style={{
      animationDelay: '1s'
    }}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{
      animationDelay: '2s'
    }}></div>
    </section>
  );
};

export default Hero;
