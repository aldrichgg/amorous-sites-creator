
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextLabel?: string;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
  nextLabel = 'Próxima etapa'
}) => {
  return (
    <div className="flex justify-between w-full max-w-lg mx-auto pt-4">
      {!isFirstStep ? (
        <motion.button
          onClick={onPrevious}
          className="flex items-center justify-center px-4 py-2 rounded-lg border border-gray-700 bg-black/50 text-white hover:bg-gray-900 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Voltar etapa
        </motion.button>
      ) : (
        <div></div>
      )}
      
      <motion.button
        onClick={onNext}
        className="flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-memblue to-memcyan text-white hover:shadow-lg hover:from-memblue-dark hover:to-memcyan-dark transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isLastStep ? 'Finalizar' : nextLabel}
        {!isLastStep && <ChevronRight className="w-5 h-5 ml-1" />}
      </motion.button>
    </div>
  );
};

export default NavigationButtons;
