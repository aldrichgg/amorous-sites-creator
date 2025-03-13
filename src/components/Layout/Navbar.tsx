
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [promoVisible, setPromoVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (window.scrollY > 50) {
        setPromoVisible(false);
      } else {
        setPromoVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigation happens
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`fixed w-full ${promoVisible ? 'top-10' : 'top-0'} z-40 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <div className="h-8 w-8 mr-2">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <path id="heart-a" d="M7.64648437,1.19311523 C8.33056641,5.30135091 6.96142578,7.94555664 3.5390625,9.12573242 C0.116699219,10.3059082 -0.801757813,12.9492188 0.783691406,17.0556641 L3,19.2653809 L12.5229492,9.54785156 C13.5050456,6.41617839 12.8082682,3.82950846 10.4326172,1.7878418 C8.8577474,0.574951172 7.92903646,0.376708984 7.64648437,1.19311523 Z"></path>
                    <path id="heart-c" d="M18.6707335,10.0469949 C20.4444204,8.20475335 20.4428931,5.22154308 18.6673208,3.38125356 C16.8917484,1.54096405 14.0134482,1.53938105 12.2359925,3.37771648 L10.9702069,4.68963823 L9.74663024,3.42106257 C7.97421677,1.58443498 5.10087015,1.58474944 3.32883095,3.42176494 C1.55679174,5.25878043 1.55709514,8.23685657 3.32950861,10.0734842 L10.9750473,18 L18.6707335,10.0469949 Z M9.53555048,19.3884699 L1.89036034,11.4623154 C-0.629744037,8.85090825 -0.630172509,4.64518565 1.88938959,2.03323745 C4.37655172,-0.545122756 8.39543397,-0.61732966 10.9687169,1.81730162 C13.5445576,-0.66312694 17.60123,-0.604129239 20.1066156,1.99257419 C22.6292352,4.60713978 22.6313904,8.81686087 20.1115002,11.434147 L12.4427074,19.3824584 C12.1544685,19.6812032 11.7964701,19.8704534 11.4198481,19.9502088 C10.7609371,20.0997637 10.0408904,19.9123813 9.53555048,19.3884699 Z"></path>
                  </defs>
                  <g fill="none" fillRule="evenodd" transform="translate(1 2)">
                    <g transform="translate(8)">
                      <mask id="heart-nav-b" fill="#ffffff">
                        <use xlinkHref="#heart-a"></use>
                      </mask>
                      <use fill="#D8D8D8" xlinkHref="#heart-a"></use>
                      <g fill="#FFA0A0" mask="url(#heart-nav-b)">
                        <rect width="24" height="24" transform="translate(-9 -2)"></rect>
                      </g>
                    </g>
                    <mask id="heart-nav-d" fill="#ffffff">
                      <use xlinkHref="#heart-c"></use>
                    </mask>
                    <use fill="#000000" fillRule="nonzero" xlinkHref="#heart-c"></use>
                    <g fill="#7600FF" mask="url(#heart-nav-d)">
                      <rect width="24" height="24" transform="translate(-1 -2)"></rect>
                    </g>
                  </g>
                </svg>
              </div>
              <span className="text-white font-bold text-xl">Loveiit</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link to="/" className={`text-white hover:text-memred-light transition-colors ${location.pathname === '/' ? 'font-medium' : ''}`}>Home</Link>
              <Link to="/how-it-works" className={`text-white hover:text-memred-light transition-colors ${location.pathname === '/how-it-works' ? 'font-medium' : ''}`}>Como Funciona</Link>
              <Link to="/pricing" className={`text-white hover:text-memred-light transition-colors ${location.pathname === '/pricing' ? 'font-medium' : ''}`}>Preços</Link>
              <Link to="/faq" className={`text-white hover:text-memred-light transition-colors ${location.pathname === '/faq' ? 'font-medium' : ''}`}>FAQ</Link>
              <div className="relative h-8">
                <div className="absolute inset-0 btn-gradient rounded-full blur opacity-75"></div>
                <Link to="/create" className="relative bg-gradient-to-r from-memred to-memred-light hover:from-memred-dark hover:to-memred text-white font-medium rounded-full px-5 py-2 transition-all duration-300">
                  Começar
                </Link>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-memred-light focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-white hover:text-memred-light py-2 px-3 rounded-md" onClick={closeMenu}>Home</Link>
            <Link to="/how-it-works" className="block text-white hover:text-memred-light py-2 px-3 rounded-md" onClick={closeMenu}>Como Funciona</Link>
            <Link to="/pricing" className="block text-white hover:text-memred-light py-2 px-3 rounded-md" onClick={closeMenu}>Preços</Link>
            <Link to="/faq" className="block text-white hover:text-memred-light py-2 px-3 rounded-md" onClick={closeMenu}>FAQ</Link>
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
