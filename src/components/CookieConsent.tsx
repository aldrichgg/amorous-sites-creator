
import { useState, useEffect } from 'react';
import { X, Cookie, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const CookieConsent = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookiesAccepted');
    if (!hasAccepted) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setOpen(false);
    toast({
      title: "Cookies aceitos",
      description: "Obrigado por aceitar nossos cookies!",
      duration: 3000,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 mx-auto w-full max-w-md px-4">
      <div className="relative rounded-lg bg-gray-900 border border-gray-800 p-4 shadow-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0 text-memcyan mr-3">
            <Cookie size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-300 mb-3">
              Utilizamos cookies para garantir a melhor experiência em nosso site. Ao continuar navegando, você concorda com nossa Política de Privacidade.
            </p>
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setOpen(false)} 
                className="text-xs border-gray-700 hover:bg-gray-800 text-gray-300"
              >
                Recusar
              </Button>
              <Button 
                size="sm" 
                onClick={acceptCookies} 
                className="text-xs bg-green-500 hover:bg-green-600 text-white flex items-center gap-1"
              >
                <Check size={14} />
                Aceitar
              </Button>
            </div>
          </div>
          <button 
            onClick={() => setOpen(false)} 
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-300"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
