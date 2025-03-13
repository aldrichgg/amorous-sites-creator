
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronRight } from 'lucide-react';
import { FlipWords } from '@/components/ui/flip-words';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const flipWords = ["suas memórias", "seus momentos", "suas experiências"];

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
    <section className="min-h-[calc(100vh-40px)] bg-black bg-mesh relative flex flex-col justify-center items-center overflow-hidden pt-24 md:pt-24 px-4 sm:px-0">
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-20">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 mb-4 md:mb-6">
            <div className="flex items-center">
              <button className="bg-memred/20 backdrop-blur-sm rounded-full text-white px-3 py-1 text-xs sm:text-sm">
                Buscar memórias
              </button>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 text-white leading-tight">
            Personalize <br className="sm:hidden" />
            <span>
              <FlipWords words={flipWords} className="text-3xl sm:text-4xl md:text-5xl" />
            </span>
          </h1>
          
          <p className="text-gray-300 text-base md:text-lg lg:text-xl mb-6 md:mb-8">
            Preencha o formulário, receba seu site único e um QR Code para compartilhar.
            Adicione imagens, mensagens e um contador dinâmico para tornar o presente ainda mais especial. ✨
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative group w-full sm:w-auto">
              <div className="absolute inset-0 btn-gradient rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <Link to="/create" className="relative w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-memred to-memred-light hover:from-memred-dark hover:to-memred-light text-white font-medium rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg transition-all duration-300">
                Começar <ChevronRight size={18} className="ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="mt-8 md:mt-10 flex flex-col items-center">
            <div className="flex items-center justify-center mb-4">
              <AnimatedTooltip items={couples} />
            </div>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map(id => <Star key={id} size={14} className="text-memred-light fill-memred-light" />)}
              <span className="ml-2 text-white text-sm font-medium">1730 memórias eternizadas</span>
            </div>
          </div>
        </div>
        
        <div className="relative mx-auto max-w-4xl mt-8 md:mt-0 mb-12">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-memred to-memred-light rounded-2xl blur opacity-75 animate-pulse-soft"></div>
          <div className="relative bg-black rounded-2xl overflow-hidden">
            <div className="flex justify-center items-center py-12">
              <div className="w-24 h-24 md:w-32 md:h-32">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <path id="hero-heart-a" d="M7.64648437,1.19311523 C8.33056641,5.30135091 6.96142578,7.94555664 3.5390625,9.12573242 C0.116699219,10.3059082 -0.801757813,12.9492188 0.783691406,17.0556641 L3,19.2653809 L12.5229492,9.54785156 C13.5050456,6.41617839 12.8082682,3.82950846 10.4326172,1.7878418 C8.8577474,0.574951172 7.92903646,0.376708984 7.64648437,1.19311523 Z"></path>
                    <path id="hero-heart-c" d="M18.6707335,10.0469949 C20.4444204,8.20475335 20.4428931,5.22154308 18.6673208,3.38125356 C16.8917484,1.54096405 14.0134482,1.53938105 12.2359925,3.37771648 L10.9702069,4.68963823 L9.74663024,3.42106257 C7.97421677,1.58443498 5.10087015,1.58474944 3.32883095,3.42176494 C1.55679174,5.25878043 1.55709514,8.23685657 3.32950861,10.0734842 L10.9750473,18 L18.6707335,10.0469949 Z M9.53555048,19.3884699 L1.89036034,11.4623154 C-0.629744037,8.85090825 -0.630172509,4.64518565 1.88938959,2.03323745 C4.37655172,-0.545122756 8.39543397,-0.61732966 10.9687169,1.81730162 C13.5445576,-0.66312694 17.60123,-0.604129239 20.1066156,1.99257419 C22.6292352,4.60713978 22.6313904,8.81686087 20.1115002,11.434147 L12.4427074,19.3824584 C12.1544685,19.6812032 11.7964701,19.8704534 11.4198481,19.9502088 C10.7609371,20.0997637 10.0408904,19.9123813 9.53555048,19.3884699 Z"></path>
                  </defs>
                  <g fill="none" fillRule="evenodd" transform="translate(1 2)">
                    <g transform="translate(8)">
                      <mask id="hero-heart-b" fill="#ffffff">
                        <use xlinkHref="#heart-a"></use>
                      </mask>
                      <use fill="#D8D8D8" xlinkHref="#heart-a"></use>
                      <g fill="#FF3A3A" mask="url(#hero-heart-b)">
                        <rect width="24" height="24" transform="translate(-9 -2)"></rect>
                      </g>
                    </g>
                    <mask id="hero-heart-d" fill="#ffffff">
                      <use xlinkHref="#hero-heart-c"></use>
                    </mask>
                    <use fill="#000000" fillRule="nonzero" xlinkHref="#hero-heart-c"></use>
                    <g fill="#FF0000" mask="url(#hero-heart-d)">
                      <rect width="24" height="24" transform="translate(-1 -2)"></rect>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <div className="relative bottom-0 left-0 right-0 text-center pb-8 sm:pb-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Crie uma memória <br />em 4 etapas!</h2>
              <p className="text-gray-300 mx-auto max-w-md px-4 text-sm sm:text-base">
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
