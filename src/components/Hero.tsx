
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronRight } from 'lucide-react';
import { FlipWords } from '@/components/ui/flip-words';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const flipWords = ["suas memórias", "seus momentos", "suas experiências"];

  // Updated couple data with the new images
  const couples = [
    {
      id: 1,
      name: "João & Maria",
      designation: "Casamento",
      image: "https://i.pinimg.com/736x/c6/e6/64/c6e6648f850b1c9db9c21cda36a47fe2.jpg",
    },
    {
      id: 2,
      name: "Ricardo & Ana",
      designation: "Noivado",
      image: "https://i.pinimg.com/736x/9d/9a/fc/9d9afcfdceed0174063d48705e7da943.jpg",
    },
    {
      id: 3,
      name: "Paulo & Carla",
      designation: "Aniversário",
      image: "https://i.pinimg.com/736x/ad/b1/90/adb1902601fe7a7fe2ca68c27c7ea7d5.jpg",
    },
    {
      id: 4,
      name: "Marcos & Júlia",
      designation: "Bodas de Prata",
      image: "https://i.pinimg.com/736x/52/00/6a/52006a2bb83f89f998975b8e0458cbb2.jpg",
    },
    {
      id: 5,
      name: "Lucas & Fernanda",
      designation: "Namoro",
      image: "https://i.pinimg.com/736x/0d/c4/83/0dc483669e85ee8bf59b6a8e27ae5769.jpg",
    },
    {
      id: 6,
      name: "Eduardo & Beatriz",
      designation: "Celebração",
      image: "https://i.pinimg.com/736x/42/f1/7f/42f17fd237eca1d633bf7f6eaa30ff1b.jpg",
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
              <button className="bg-memred/20 backdrop-blur-sm rounded-full text-white px-4 py-1 text-sm">
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
              <Link to="/create" className="relative w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-memred to-memred-light hover:from-memred-dark hover:to-memred-light text-white font-medium rounded-full px-8 py-3 text-lg transition-all duration-300">
                Começar <ChevronRight size={20} className="ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="mt-10 flex flex-col items-center">
            <div className="flex items-center justify-center mb-4">
              <AnimatedTooltip items={couples} />
            </div>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map(id => <Star key={id} size={16} className="text-memred-light fill-memred-light" />)}
              <span className="ml-2 text-white font-medium">1730 memórias eternizadas</span>
            </div>
          </div>
        </div>
        
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-memred to-memred-light rounded-2xl blur opacity-75 animate-pulse-soft"></div>
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
      
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-memred/20 rounded-full blur-3xl animate-float" style={{
      animationDelay: '0s'
    }}></div>
      <div className="absolute bottom-1/3 right-10 w-32 h-32 bg-memred-light/20 rounded-full blur-3xl animate-float" style={{
      animationDelay: '1s'
    }}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-memred-dark/10 rounded-full blur-3xl animate-float" style={{
      animationDelay: '2s'
    }}></div>
    </section>
  );
};

export default Hero;
