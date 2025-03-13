
import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isCreatePage = location.pathname.includes('/create');

  return (
    <footer className={`${isCreatePage ? 'bg-gray-900' : 'bg-gray-900 backdrop-blur-lg'} py-8 px-4 border-t border-gray-800 relative z-10`}>
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center mb-3">
            <div className="h-8 w-8 mr-2">
              <svg viewBox="0 0 100 100" className="h-full w-full fill-current text-memcyan">
                <path d="M70 30C76.0751 30 81 35.0294 81 41.25C81 44.6 79.4177 47.5706 76.9847 49.4294C79.0685 51.2118 80.375 53.9176 80.375 57C80.375 63.0706 75.4501 68 69.375 68C66.2922 68 63.5322 66.7118 61.75 64.6294C59.9678 66.7118 57.2078 68 54.125 68C51.0422 68 48.2822 66.7118 46.5 64.6294C44.7178 66.7118 41.9578 68 38.875 68C35.7922 68 33.0322 66.7118 31.25 64.6294C29.4678 66.7118 26.7078 68 23.625 68C17.5499 68 12.625 63.0706 12.625 57C12.625 53.9176 13.9315 51.2118 16.0153 49.4294C13.5823 47.5706 12 44.6 12 41.25C12 35.0294 16.9249 30 23 30C27.2187 30 30.9051 32.3588 32.7188 35.9C34.5324 35.3118 36.5875 35 38.75 35C40.9125 35 42.9676 35.3118 44.7812 35.9C46.5949 32.3588 50.2813 30 54.5 30C58.7187 30 62.4051 32.3588 64.2188 35.9C66.0324 35.3118 68.0875 35 70.25 35C70.5 35 70.75 35 71 35V30Z" />
                <path d="M37.5 45C40.8137 45 43.5 42.3137 43.5 39C43.5 35.6863 40.8137 33 37.5 33C34.1863 33 31.5 35.6863 31.5 39C31.5 42.3137 34.1863 45 37.5 45Z" />
                <path d="M62.5 45C65.8137 45 68.5 42.3137 68.5 39C68.5 35.6863 65.8137 33 62.5 33C59.1863 33 56.5 35.6863 56.5 39C56.5 42.3137 59.1863 45 62.5 45Z" />
                <path d="M50 60C53.3137 60 56 57.3137 56 54C56 50.6863 53.3137 48 50 48C46.6863 48 44 50.6863 44 54C44 57.3137 46.6863 60 50 60Z" />
              </svg>
            </div>
            <span className="text-white font-bold text-xl">Loveiit</span>
          </div>
          <p className="text-gray-300 text-sm mb-6">
            Copyright © {currentYear} - Todos os direitos reservados
          </p>
          <p className="text-gray-300 text-sm flex items-center mb-6">
            Feito com <Heart size={14} className="mx-1 text-red-500 fill-red-500" /> por IMPULSEGRAM
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Link to="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">
              Termos de uso
            </Link>
            <Link to="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">
              Política de privacidade
            </Link>
            <a 
              href="https://casadosdados.com.br/solucao/cnpj/50195991-aldrich-larchert-azevedo-carvalho-da-gama-50195991000183" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              CNPJ: 50.195.991/0001-83
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
