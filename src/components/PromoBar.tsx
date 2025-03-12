
import { X } from 'lucide-react';
import { useState } from 'react';

const PromoBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-pink-400 text-white py-2 px-4 text-center text-sm flex items-center justify-center relative animate-pulse-soft">
      <span className="mr-1">♥</span> Dia internacional das mulheres! Memórias temáticas - Todos os planos com 50% de desconto!
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-2 text-white hover:text-pink-100 transition-colors"
        aria-label="Close promotion banner"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default PromoBar;
