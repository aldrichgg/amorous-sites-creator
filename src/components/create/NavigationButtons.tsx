
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextLabel?: string;
  isDisabled?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
  nextLabel = 'Próxima etapa',
  isDisabled = false
}) => {
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
        onClick={onNext}
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
        {isLastStep ? 'Finalizar' : (
          <>
            <span className="hidden sm:inline">{nextLabel}</span>
            <span className="sm:hidden">Próxima</span>
          </>
        )}
        {!isLastStep && <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />}
      </motion.button>
    </div>
  );
};

export default NavigationButtons;
