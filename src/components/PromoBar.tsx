
import { useIsMobile } from "@/hooks/use-mobile";

const PromoBar = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="fixed top-0 left-0 w-full bg-memred text-white py-2 px-4 text-center text-xs sm:text-sm flex items-center justify-center relative z-50 h-auto min-h-10">
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
