
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";

const PromoBar = () => {
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div 
      className={`fixed top-0 left-0 w-full bg-memred text-white py-2 px-4 text-center text-xs sm:text-sm flex items-center justify-center z-50 h-10 transition-all duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 -translate-y-full'
      }`}
    >
      <span className="mr-1">♥</span> 
      {isMobile ? (
        <span>Dia das mulheres! 50% de desconto!</span>
      ) : (
        <span>Dia internacional das mulheres! Memórias temáticas - Todos os planos com 50% de desconto!</span>
      )}
    </div>
  );
};

export default PromoBar;
