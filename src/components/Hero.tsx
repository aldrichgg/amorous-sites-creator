
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronRight } from 'lucide-react';
import { FlipWords } from '@/components/ui/flip-words';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const flipWords = ["suas memórias", "seus momentos", "suas experiências"];

  // Sample couple data for the tooltip
  const couples = [
    {
      id: 1,
      name: "João & Maria",
      designation: "Casamento",
      image: "https://images.unsplash.com/photo-1587721865940-a8c58e27526d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      id: 2,
      name: "Ricardo & Ana",
      designation: "Noivado",
      image: "https://images.unsplash.com/photo-1591553160972-2ea1fddce0fc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      id: 3,
      name: "Paulo & Carla",
      designation: "Aniversário",
      image: "https://images.unsplash.com/photo-1617551307578-7d5c5f9270e4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      id: 4,
      name: "Marcos & Júlia",
      designation: "Bodas de Prata",
      image: "https://images.unsplash.com/photo-1590030699878-a5f1d6a2a2dc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      id: 5,
      name: "Lucas & Fernanda",
      designation: "Namoro",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      id: 6,
      name: "Eduardo & Beatriz",
      designation: "Celebração",
      image: "https://images.unsplash.com/photo-1522435229388-6f7a422e3f3b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="min-h-[calc(100vh-40px)] bg-black bg-mesh relative flex flex-col justify-center items-center overflow-hidden pt-20 md:pt-24">
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
            <span>
              <FlipWords words={flipWords} className="text-4xl md:text-5xl" />
            </span>
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
            <div className="flex items-center justify-center mb-4">
              <AnimatedTooltip items={couples} />
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
