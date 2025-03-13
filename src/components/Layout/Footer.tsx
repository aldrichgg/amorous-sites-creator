
import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isCreatePage = location.pathname.includes('/create');

  return (
    <footer className={`${isCreatePage ? 'bg-gray-900' : 'bg-gray-900 backdrop-blur-lg'} py-8 md:py-10 px-4 border-t border-gray-800 relative z-10`}>
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          {/* Logo and brand */}
          <div className="flex items-center mb-6">
            <div className="h-10 w-10 mr-2">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <path id="heart-a" d="M7.64648437,1.19311523 C8.33056641,5.30135091 6.96142578,7.94555664 3.5390625,9.12573242 C0.116699219,10.3059082 -0.801757813,12.9492188 0.783691406,17.0556641 L3,19.2653809 L12.5229492,9.54785156 C13.5050456,6.41617839 12.8082682,3.82950846 10.4326172,1.7878418 C8.8577474,0.574951172 7.92903646,0.376708984 7.64648437,1.19311523 Z"></path>
                  <path id="heart-c" d="M18.6707335,10.0469949 C20.4444204,8.20475335 20.4428931,5.22154308 18.6673208,3.38125356 C16.8917484,1.54096405 14.0134482,1.53938105 12.2359925,3.37771648 L10.9702069,4.68963823 L9.74663024,3.42106257 C7.97421677,1.58443498 5.10087015,1.58474944 3.32883095,3.42176494 C1.55679174,5.25878043 1.55709514,8.23685657 3.32950861,10.0734842 L10.9750473,18 L18.6707335,10.0469949 Z M9.53555048,19.3884699 L1.89036034,11.4623154 C-0.629744037,8.85090825 -0.630172509,4.64518565 1.88938959,2.03323745 C4.37655172,-0.545122756 8.39543397,-0.61732966 10.9687169,1.81730162 C13.5445576,-0.66312694 17.60123,-0.604129239 20.1066156,1.99257419 C22.6292352,4.60713978 22.6313904,8.81686087 20.1115002,11.434147 L12.4427074,19.3824584 C12.1544685,19.6812032 11.7964701,19.8704534 11.4198481,19.9502088 C10.7609371,20.0997637 10.0408904,19.9123813 9.53555048,19.3884699 Z"></path>
                </defs>
                <g fill="none" fillRule="evenodd" transform="translate(1 2)">
                  <g transform="translate(8)">
                    <mask id="heart-footer-b" fill="#ffffff">
                      <use xlinkHref="#heart-a"></use>
                    </mask>
                    <use fill="#D8D8D8" xlinkHref="#heart-a"></use>
                    <g fill="#FFA0A0" mask="url(#heart-footer-b)">
                      <rect width="24" height="24" transform="translate(-9 -2)"></rect>
                    </g>
                  </g>
                  <mask id="heart-footer-d" fill="#ffffff">
                    <use xlinkHref="#heart-c"></use>
                  </mask>
                  <use fill="#000000" fillRule="nonzero" xlinkHref="#heart-c"></use>
                  <g fill="#7600FF" mask="url(#heart-footer-d)">
                    <rect width="24" height="24" transform="translate(-1 -2)"></rect>
                  </g>
                </g>
              </svg>
            </div>
            <span className="text-white font-bold text-xl">Loveiit</span>
          </div>
          
          {/* Navigation sections */}
          <div className="w-full max-w-4xl mb-6">
            <div className="h-px bg-gray-800 w-full mb-6"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 text-left md:text-center">
              <div>
                <h3 className="text-white font-semibold text-lg mb-3">Loveiit</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/how-it-works" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Como Funciona
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Preços
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold text-lg mb-3">Ajuda</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/faq" className="text-gray-400 hover:text-white text-sm transition-colors">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Termos de uso
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Política de privacidade
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <h3 className="text-white font-semibold text-lg mb-3">Contato</h3>
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="mailto:contato@loveiit.com.br" 
                      className="text-gray-400 hover:text-white text-sm transition-colors flex items-center md:justify-center"
                    >
                      contato@loveiit.com.br
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://casadosdados.com.br/solucao/cnpj/50195991-aldrich-larchert-azevedo-carvalho-da-gama-50195991000183" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-white text-sm transition-colors flex items-center md:justify-center"
                    >
                      CNPJ: 50.195.991/0001-83
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Copyright and credits */}
          <div className="w-full max-w-4xl">
            <div className="h-px bg-gray-800 w-full my-4"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-400 text-sm mb-3 md:mb-0">
                Copyright © {currentYear} - Todos os direitos reservados
              </p>
              <p className="text-gray-400 text-sm flex items-center">
                Feito com <Heart size={14} className="mx-1 text-red-500 fill-red-500" /> por IMPULSEGRAM
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
