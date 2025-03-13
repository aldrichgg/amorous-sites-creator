
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationButtons from './NavigationButtons';

interface StepContentProps {
  currentStep: number;
  children: React.ReactNode;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isStepValid: boolean;
}

const StepContent: React.FC<StepContentProps> = ({
  currentStep,
  children,
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
  isStepValid
}) => {
  return (
    <div className="max-w-4xl mx-auto bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 mb-8 shadow-xl shadow-black/30">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="pb-6"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      
      <NavigationButtons 
        onPrevious={onPrevious}
        onNext={onNext}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        isDisabled={!isStepValid}
      />
    </div>
  );
};

export default StepContent;
