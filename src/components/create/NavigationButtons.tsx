
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextLabel?: string;
  isDisabled?: boolean;
  memoryData?: any; // This would contain the full memory data
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
  nextLabel = 'Próxima etapa',
  isDisabled = false,
  memoryData
}) => {
  const navigate = useNavigate();

  const handleNext = () => {
    if (isLastStep) {
      // In a real app, you would save memoryData to your database first
      // Then redirect to payment page with the memory ID
      
      // Mock the memory slug for our example
      let memorySlug = "gabriel-clara";
      if (memoryData && memoryData.pageName) {
        // Create a slug from the pageName
        memorySlug = memoryData.pageName
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '');
      }
      
      // Simulate payment page redirection
      // In a real app, you'd redirect to a payment gateway
      // After payment, the gateway would redirect to your memory page
      
      // For the demo, we'll navigate to the payment directly
      // and have a button there to proceed to the memory page
      navigate('/payment', { 
        state: { 
          memorySlug,
          memoryData
        } 
      });
    } else {
      onNext();
    }
  };

  return (
    <div className="flex justify-between w-full max-w-lg mx-auto pt-4">
      {!isFirstStep ? (
        <motion.button
          onClick={onPrevious}
          className="flex items-center justify-center px-2 sm:px-4 py-2 rounded-lg border border-gray-700 bg-black/50 text-white hover:bg-gray-900 transition-all duration-300 text-sm sm:text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
          <span className="hidden sm:inline">Voltar etapa</span>
          <span className="sm:hidden">Voltar</span>
        </motion.button>
      ) : (
        <div></div>
      )}
      
      <motion.button
        onClick={handleNext}
        disabled={isDisabled}
        className={`flex items-center justify-center px-2 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-memblue to-memcyan text-white transition-all duration-300 text-sm sm:text-base ${
          isDisabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:shadow-lg hover:from-memblue-dark hover:to-memcyan-dark hover:scale-105'
        }`}
        whileHover={!isDisabled ? { scale: 1.05 } : undefined}
        whileTap={!isDisabled ? { scale: 0.95 } : undefined}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isLastStep ? (
          <>
            <span>Finalizar</span>
            <CheckCircle2 className="w-5 h-5 ml-1 text-green-400" />
          </>
        ) : (
          <>
            <span className="hidden sm:inline">{nextLabel}</span>
            <span className="sm:hidden">Próxima</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
          </>
        )}
      </motion.button>
    </div>
  );
};

export default NavigationButtons;
