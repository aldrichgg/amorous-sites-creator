import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`fixed w-full top-10 z-40 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <div className="h-8 w-8 mr-2">
                <svg viewBox="0 0 100 100" className="h-full w-full fill-current text-memcyan">
                  <path d="M70 30C76.0751 30 81 35.0294 81 41.25C81 44.6 79.4177 47.5706 76.9847 49.4294C79.0685 51.2118 80.375 53.9176 80.375 57C80.375 63.0706 75.4501 68 69.375 68C66.2922 68 63.5322 66.7118 61.75 64.6294C59.9678 66.7118 57.2078 68 54.125 68C51.0422 68 48.2822 66.7118 46.5 64.6294C44.7178 66.7118 41.9578 68 38.875 68C35.7922 68 33.0322 66.7118 31.25 64.6294C29.4678 66.7118 26.7078 68 23.625 68C17.5499 68 12.625 63.0706 12.625 57C12.625 53.9176 13.9315 51.2118 16.0153 49.4294C13.5823 47.5706 12 44.6 12 41.25C12 35.0294 16.9249 30 23 30C27.2187 30 30.9051 32.3588 32.7188 35.9C34.5324 35.3118 36.5875 35 38.75 35C40.9125 35 42.9676 35.3118 44.7812 35.9C46.5949 32.3588 50.2813 30 54.5 30C58.7187 30 62.4051 32.3588 64.2188 35.9C66.0324 35.3118 68.0875 35 70.25 35C70.5 35 70.75 35 71 35V30Z" />
                  <path d="M37.5 45C40.8137 45 43.5 42.3137 43.5 39C43.5 35.6863 40.8137 33 37.5 33C34.1863 33 31.5 35.6863 31.5 39C31.5 42.3137 34.1863 45 37.5 45Z" />
                  <path d="M62.5 45C65.8137 45 68.5 42.3137 68.5 39C68.5 35.6863 65.8137 33 62.5 33C59.1863 33 56.5 35.6863 56.5 39C56.5 42.3137 59.1863 45 62.5 45Z" />
                  <path d="M50 60C53.3137 60 56 57.3137 56 54C56 50.6863 53.3137 48 50 48C46.6863 48 44 50.6863 44 54C44 57.3137 46.6863 60 50 60Z" />
                </svg>
              </div>
              <span className="text-white font-bold text-xl">Loveiit</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link to="/" className={`text-white hover:text-memcyan-light transition-colors ${location.pathname === '/' ? 'font-medium' : ''}`}>Home</Link>
              <Link to="/how-it-works" className={`text-white hover:text-memcyan-light transition-colors ${location.pathname === '/how-it-works' ? 'font-medium' : ''}`}>Como Funciona</Link>
              <Link to="/pricing" className={`text-white hover:text-memcyan-light transition-colors ${location.pathname === '/pricing' ? 'font-medium' : ''}`}>Preços</Link>
              <Link to="/faq" className={`text-white hover:text-memcyan-light transition-colors ${location.pathname === '/faq' ? 'font-medium' : ''}`}>FAQ</Link>
              <button className="flex items-center text-white hover:text-memcyan-light transition-colors">
                <Globe size={16} className="mr-1" />
                <span>PT</span>
                <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="relative h-8">
                <div className="absolute inset-0 btn-gradient rounded-full blur opacity-75"></div>
                <Link to="/create" className="relative bg-gradient-to-r from-memblue to-memcyan hover:from-memblue-dark hover:to-memcyan-dark text-white font-medium rounded-full px-5 py-2 transition-all duration-300">
                  Começar
                </Link>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-memcyan-light focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-white hover:text-memcyan-light py-2 px-3 rounded-md" onClick={closeMenu}>Home</Link>
            <Link to="/how-it-works" className="block text-white hover:text-memcyan-light py-2 px-3 rounded-md" onClick={closeMenu}>Como Funciona</Link>
            <Link to="/pricing" className="block text-white hover:text-memcyan-light py-2 px-3 rounded-md" onClick={closeMenu}>Preços</Link>
            <Link to="/faq" className="block text-white hover:text-memcyan-light py-2 px-3 rounded-md" onClick={closeMenu}>FAQ</Link>
            <button className="flex items-center text-white hover:text-memcyan-light py-2 px-3 rounded-md w-full">
              <Globe size={16} className="mr-1" />
              <span>PT</span>
              <ChevronDown size={16} className="ml-1" />
            </button>
            <div className="pt-2">
              <Link to="/create" 
                className="block w-full text-center btn-gradient text-white font-medium rounded-full px-5 py-2" 
                onClick={closeMenu}
              >
                Começar
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
